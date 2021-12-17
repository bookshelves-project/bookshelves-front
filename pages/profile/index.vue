<template>
  <div class="main-content">
    <app-header
      v-if="$auth.$state.loggedIn"
      :title="`${title}`"
      :subtitle="`Welcome ${$auth.user.data.name}`"
      :text="$auth.user.data.about"
      :image="$auth.$state.user.data.avatar"
    >
      <app-button
        :to="
          localePath({
            name: 'users-slug',
            params: { slug: $auth.user.data.meta.slug },
          })
        "
      >See my public profile</app-button>
    </app-header>
    <!-- Main 2 column grid -->
    <div class="grid items-start grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8">
      <!-- Left column -->
      <div class="grid grid-cols-1 gap-4 xl:col-span-1">
        <blocks-data-list-template
          :data-list="favorites"
          title="Favorites list"
          subtitle="All your favorites will be here."
          empty-list="Your favorite list is empty, try to favorite any book, series or author."
          icon="heart"
          :loading="loading"
          :can-delete="true"
          @destroy="destroy"
        />
      </div>

      <!-- Right column -->
      <div class="grid grid-cols-1 gap-4 xl:col-span-1">
        <blocks-data-list-template
          :data-list="comments"
          title="Comments list"
          subtitle="All your comments will be here."
          empty-list="Your comments list is empty, try to comment any book, series or author."
          icon="comment"
          :loading="loading"
          :can-delete="true"
          @destroy="destroy"
        />
      </div>
    </div>
  </div>
</template>

<script>
import favorites from '~/mixins/favorites'
import comments from '~/mixins/comments'
export default {
  name: 'PageProfile',
  mixins: [
    favorites,
    comments
  ],
  middleware: 'auth',
  data() {
    return {
      loading: true,
      favorites: [],
      comments: [],
      title: 'My profile'
    }
  },
  head() {
    const dynamicMetadata = require('~/utils/metadata/dynamic')
    const title = 'My profile'
    const description = 'An overview of all your activities.'
    return {
      title,
      meta: [
        ...dynamicMetadata.default({
          title,
          description,
          url: this.$nuxt.$route.path
        })
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const [
          favorites,
          comments
        ] = await Promise.all([
          this.$axios.$get(
            `/favorites/by-user/${this.$auth.$state.user.data.id}`
          ),
          this.$axios.$get(
            `/comments/by-user/${this.$auth.$state.user.data.id}`
          )
        ])
        this.favorites = favorites.data
        this.comments = comments.data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },
    destroy(data) {
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
    }
  }
}
</script>
