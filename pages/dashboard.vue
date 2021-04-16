<template>
  <div class="container max-w-7xl">
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
    const title = 'Dashboard'
    const description = 'An overview of all your activities on Bookshelves.'
    const image = `${process.env.BASE_URL}/open-graph.jpg`
    const url = `${process.env.BASE_URL}/dashboard`
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
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
