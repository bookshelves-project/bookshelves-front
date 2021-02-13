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
    async deleteComment(idOfCommentToDelete) {
      try {
        await this.$axios.$post(`/api/comments/destroy/${idOfCommentToDelete}`)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
