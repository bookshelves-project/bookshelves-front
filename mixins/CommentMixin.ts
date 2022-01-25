// export default {
//   data() {
//     return {
//       isFavorite: false,
//       favoritesList: []
//     }
//   },
//   created() {
//     this.isFavorite = this.book ? this.book.isFavorite : null
//     this.favoritesList = this.favorites
//   },
//   methods: {
//     async deleteComment(idOfCommentToDelete) {
//       try {
//         await this.$axios.$post(`/comments/destroy/${idOfCommentToDelete}`)
//       } catch (error) {
//         console.error(error)
//       }
//     }
//   }
// }

import { Component, Vue } from 'nuxt-property-decorator'
@Component
class CommentMixin extends Vue {
  public cartProducts: object[] = []
  public addToCart(newItem: object): void {
    this.cartProducts = { ...this.cartProducts, ...newItem }
  }
}
export default CommentMixin
