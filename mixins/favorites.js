export default {
  data() {
    return {
      isFavorite: false,
      favoritesList: [],
    }
  },
  mounted() {
    this.isFavoriteCheck()
    this.favoritesList = this.favorites
  },
  methods: {
    isFavoriteCheck() {
      let entity = this.$route.name
      entity = entity.replace('s-slug', '')
      this.isFavorite = this[entity] ? this[entity].isFavorite : null
    },
    async toggleFavorite(entity) {
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
