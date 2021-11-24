<template>
  <div class="main-content">
    <!-- <future-books-list :books="books" /> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Book } from '~/types/books/book'
import { ModelEnum, BookRepository } from '~/types/repository'

@Component({
  async asyncData(ctx) {
    try {
      const queryList = { ...ctx.query }
      queryList.page = ctx.query.page || '1'
      queryList['per-page'] = '32'

      const books: Book[] = await ctx.$repository(
        new BookRepository(ModelEnum.find),
        queryList
      )
      console.log(books)

      return {
        books,
      }
    } catch (error) {
      return {
        books: [],
      }
    }
  },
})
export default class TestPage extends Vue {
  books: Array<Book> = []
  // async asyncData(ctx) {
  //   try {
  //     return {
  //       posts: await ctx.app.$postRepository.index(),
  //     }
  //   } catch (error) {
  //     return {
  //       posts: [],
  //     }
  //   }
  // },
  // data() {
  //   return {
  //     posts: [],
  //   }
  // },
  // computed: {
  //   slicedPosts() {
  //     return this.posts.slice(-3)
  //   },
  // },
  // methods: {
  //   async createPost() {
  //     const result = await this.$postRepository.create({
  //       title: 'foo',
  //       body: 'bar',
  //       userId: 1,
  //     })
  //     console.log(result)
  //     // Fix ids to be unique
  //     this.posts.push({ ...result, id: Number(this.posts.slice(-1)[0].id) + 1 })
  //   },
  // },
}
</script>

<style scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 100px;
  color: #526488;
  letter-spacing: 1px;
  font-size: 6em;
}

.links {
  padding-top: 15px;
}
</style>
