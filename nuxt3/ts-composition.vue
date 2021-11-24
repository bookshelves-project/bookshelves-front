<template>
  <div class="main-content">
    <future-books-list :books="books" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { stringify } from 'qs'
import { Book } from '~/types/books/book'
import { ApiResponse } from '~/types/ApiResponse'
import { getBooks } from '@/composables/books'

// export default {
//   async asyncData({ $axios, query }: any) {

//   },
// }
@Component({
  async asyncData(ctx) {
    const queryList = { ...ctx.query }
    queryList.page = ctx.query.page || '1'
    queryList['per-page'] = '32'

    const response: ApiResponse = await ctx.$axios.$get(
      `/books?${stringify({
        ...queryList,
      })}`
    )
    const books: Array<Book> = response.data

    return {
      books,
    }
  },
})
export default class TestPage extends Vue {
  books: Array<Book> = []
  mounted() {
    console.log(this.books)
  }
}

// @Component
// export default class Index extends Vue {
//   created() {
//     console.log('created')
//   }

//   async asyncData({ $axios, query }: any) {
//     console.log('asyncData')

//     return {
//       books,
//     }
//   }

//   fetch() {
//     console.log('fetch')
//   }
// }
</script>

<!-- <script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import { getBooks } from '@/composables/books'

export default defineComponent({
  setup() {
    const { books } = getBooks()

    const { title } = useMeta()
    title.value = 'Bookshelves'

    return {
      books,
    }
  },
  head: {},
})
</script> -->
