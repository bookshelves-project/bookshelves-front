<template>
  <div class="main-content">
    <section-heading
      v-if="$auth.$state.loggedIn"
      title="Dashboard"
      :subtitle="`Welcome ${$auth.user.data.name}`"
      :image="$auth.$state.user.data.profile_photo_url"
    />
    <!-- Main 2 column grid -->
    <div class="grid items-start grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
      <!-- Left column -->
      <div class="grid grid-cols-1 gap-4 lg:col-span-1">
        <data-list-template
          :data-list="favorites"
          title="Favorites list"
          subtitle="All your favorites books will be here."
          empty-list="Your favorite list is empty, try to favorite any book."
          @deleted="deleted"
        >
          <template #icon>
            <svg-icon
              name="heart"
              class="w-6 h-6 text-gray-400 dark:text-gray-300"
            />
          </template>
        </data-list-template>
      </div>

      <!-- Right column -->
      <div class="grid grid-cols-1 gap-4 lg:col-span-1">
        <data-list-template
          :data-list="comments"
          :with-image="false"
          title="Comments list"
          subtitle="All your comments will be here."
          empty-list="Your comments list is empty, try to comment any book."
          @deleted="deleted"
        >
          <template #icon>
            <svg-icon
              name="comment"
              class="w-6 h-6 text-gray-400 dark:text-gray-300"
            />
          </template>
        </data-list-template>
      </div>
    </div>
  </div>
</template>

<script>
import DataListTemplate from '~/components/blocks/dashboard/data-list-template.vue'
import sectionHeading from '~/components/blocks/section-heading.vue'

import favorites from '~/mixins/favorites'
import comments from '~/mixins/comments'
export default {
  name: 'Dashboard',
  components: {
    sectionHeading,
    DataListTemplate,
  },
  mixins: [favorites, comments],
  middleware: 'auth',
  async asyncData({ app, query, error, params, $content, $auth, store }) {
    try {
      const [favorites, comments] = await Promise.all([
        app.$axios.$get(`/favorites/by-user/${$auth.$state.user.data.id}`),
        app.$axios.$get(`/comments/by-user/${$auth.$state.user.data.id}`),
      ])

      return {
        favorites: favorites.data,
        comments: comments.data,
      }
    } catch (error) {
      console.error(error)
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/metadata/metadata-dynamic')
    const title = 'Dashboard'
    const description = 'An overview of all your activities.'
    return {
      title,
      meta: [
        ...dynamicMetadata({
          title,
          description,
          url: this.$nuxt.$route.path,
        }),
      ],
    }
  },
  methods: {
    deleted(data) {
      data = data.data
      switch (data.meta.type) {
        case 'favorite':
          this.deleteFavorite(data.meta.for, data.meta.slug)
          break

        case 'comment':
          this.deleteComment(data.id)
          break

        default:
          console.error('no type entity')
          break
      }
    },
  },
}
</script>
