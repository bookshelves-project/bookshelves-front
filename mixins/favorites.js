export default {
  data() {
    return {
      isFavorite: false,
      favoritesList: [],
    }
  },
  mounted() {
    this.favoritesList = this.favorites
  },
  methods: {
    isFavoriteCheck() {
      const entity = this.$route.name.split('-')[0].slice(0, -1)
      this.isFavorite = this[entity] ? this[entity].isFavorite : null
    },
    async toggleFavorite() {
      const entity = this.$route.name.split('-')[0].slice(0, -1)
      this.isFavorite = !this.isFavorite
      const slug = this.$route.params.slug
      try {
        await this.$axios.$post(`/favorites/toggle/${entity}/${slug}`)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteFavorite(model, slug) {
      try {
        await this.$axios.$post(`/favorites/toggle/${model}/${slug}`)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
