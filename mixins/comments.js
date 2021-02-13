export default {
  data() {
    return {
      isFavorite: false,
      favoritesList: [],
    }
  },
  created() {
    this.isFavorite = this.book ? this.book.isFavorite : null
    this.favoritesList = this.favorites
  },
  methods: {
    async toggleFavorite() {
      this.isFavorite = !this.isFavorite
      const model = 'book'
      const slug = this.$route.params.slug
      try {
        await this.$axios.$post(`/api/favorites/toggle/${model}/${slug}`)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteFavorite(model, slug) {
      const favorites = this.favoritesList.filter((book) => book.slug !== slug)
      this.favoritesList = favorites
      try {
        await this.$axios.$post(`/api/favorites/toggle/${model}/${slug}`)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
