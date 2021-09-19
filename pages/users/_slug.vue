<template>
  <div class="main-content">
    <app-header
      :title="`${title} ${user.name}`"
      :image="user.avatar"
      :text="user.about"
    />

    <!-- Main 2 column grid -->
    <div class="grid items-start grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8">
      <!-- Left column -->
      <div class="grid grid-cols-1 gap-4 xl:col-span-1">
        <blocks-data-list-template
          v-if="user.displayFavorites"
          :data-list="favorites"
          title="Favorites list"
          subtitle="All your favorites will be here."
          empty-list="Your favorite list is empty, try to favorite any book, series or author."
          icon="heart"
          :loading="loading"
        />
        <div v-else class="italic text-gray-400 dark:text-gray-500">
          {{ user.name }} don't want to show comments.
        </div>
      </div>

      <!-- Right column -->
      <div class="grid grid-cols-1 gap-4 xl:col-span-1">
        <blocks-data-list-template
          v-if="user.displayComments"
          :data-list="comments"
          title="Comments list"
          subtitle="All your comments will be here."
          empty-list="Your comments list is empty, try to comment any book, series or author."
          icon="comment"
          :loading="loading"
        />
        <div v-else class="italic text-gray-400 dark:text-gray-500">
          {{ user.name }} don't want to show favorites.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageProfileSlug',
  async asyncData({ app, params }) {
    const user = await app.$axios.$get(`/users/${params.slug}`)

    return {
      user: user.data,
    }
  },
  data() {
    return {
      loading: true,
      title: `Profile of`,
      favorites: [],
      comments: [],
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/metadata/metadata-dynamic')
    const title = `${this.title} ${this.user.name}`
    return {
      title,
      meta: [
        ...dynamicMetadata({
          title,
          url: this.$nuxt.$route.path,
          image: this.user.avatar,
        }),
      ],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const [favorites, comments] = await Promise.all([
          this.$axios.$get(`/users/favorites/${this.$route.params.slug}`),
          this.$axios.$get(`/users/comments/${this.$route.params.slug}`),
        ])
        this.favorites = favorites.data
        this.comments = comments.data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },
  },
}
</script>
