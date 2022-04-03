<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import AppButton from '@/components/app/button.vue'
import EntityBookMain from '@/components/entity/book/main.vue'
import EntityBookSerie from '@/components/entity/book/serie.vue'
import EntityBookRelated from '@/components/entity/book/related.vue'
import EntityComment from '@/components/entity/comment/index.vue'
import DownloadButton from '@/components/entity/download-button.vue'
import { formatAuthors } from '~~/utils/methods'

const { nuxtAsyncData } = useFetchable()
const route = useRoute()

const title = ref<string>()
const book = ref<Book>()

// await nuxtAsync<ApiResponse<Book>>('book', '/books', [
//   params.author,
//   params.slug,
// ]).then((e) => {
//   const bookData = e?.data
//   if (bookData) {
//     const serie = bookData.serie
//       ? ` · ${bookData.serie.title}, vol. ${bookData.volume} `
//       : ''
//     const authors = formatAuthors(bookData.authors)
//     title.value = `${bookData.title} ${serie}by ${authors}`
//     book.value = bookData
//   }
// })

const load = async () => {
  const entity = await await nuxtAsyncData<Book>('/books', [
    route.params.author,
    route.params.slug,
  ])
  book.value = entity
}
await load()

useMeta({
  title: title.value,
})

// const authors = this.formatAuthors(this.book.authors)
// const isbn: string = this.book.identifier
//   ? ((this.book.identifier.isbn13 || this.book.identifier.isbn) as string)
//   : ''

// return this.$metadata({
//   title: this.title,
//   description: this.book.summary,
//   image: this.book.cover?.og,
//   bookISBN: isbn,
//   bookAuthor: authors,
//   bookReleaseDate: this.book.publishDate?.toString(),
//   bookTag: formatTags(this.book.tags),
// })
</script>

<template>
  <main v-if="book" class="main-content">
    <app-header
      :title="book.title"
      :image="book.cover?.thumbnail"
      :image-original="book.cover?.original"
      :color="book.cover?.color"
      :authors="book.authors"
      :text="book.description"
      favorite
    >
      <div class="mx-auto grid w-max space-y-3">
        <download-button :download="book.download" :files="book.files" />
      </div>
    </app-header>
    <entity-book-main :book="book" class="mb-6" />
    <div
      class="divide-x divide-transparent lg:grid lg:grid-cols-2 lg:divide-gray-200 lg:dark:divide-gray-600"
    >
      <entity-book-serie
        v-if="book.serie !== null"
        :book="book"
        class="lg:pr-10"
      />
      <entity-book-related
        v-if="book.tags?.length || book.genres?.length"
        :book="book"
        :class="book.serie ? 'lg:pl-10' : ''"
      />
    </div>
    <entity-comment :entity="book" class="mt-6" />
  </main>
</template>
