<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import EntityBookOverview from '@/components/entity/book/overview/index.vue'
import DownloadButton from '@/components/entity/download-button.vue'
import ReaderButton from '@/components/entity/reader-button.vue'
import { formatAuthors } from '~~/utils/methods'

const { nuxtAsyncData } = useFetchable()
const route = useRoute()

const title = ref<string>('')
const breadcrumb = ref<string>()
const book = ref<Book>()

const load = async () => {
  const entity = await nuxtAsyncData<Book>('/books', [
    route.params.author,
    route.params.slug,
  ])

  book.value = entity
  if (entity) {
    const serie = book.value.serie
      ? ` · ${book.value.serie.title}, vol. ${book.value.volume} `
      : ''
    const authors = formatAuthors(book.value.authors)
    title.value = `${book.value.title} (${book.value.type}) ${serie}by ${authors}`
    breadcrumb.value = `${book.value.title} (${book.value.type})`
  }
}
await load()

useMetadata({
  title: title.value,
  description: book.value?.description,
  image: book.value?.cover?.simple,
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
      :breadcrumb="breadcrumb"
      favorite
    >
      <div class="mx-auto grid w-max space-y-3">
        <download-button :download="book.download" :files="book.files" />
        <reader-button :download="book.download" :files="book.files" />
      </div>
    </app-header>
    <entity-book-overview :book="book" class="mb-6" />
  </main>
</template>
