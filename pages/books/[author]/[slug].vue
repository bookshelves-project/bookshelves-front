<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import EntityBookOverview from '@/components/entity/book/overview.vue'
import DownloadButton from '@/components/entity/download-button.vue'
import EntityComment from '@/components/entity/comment/index.vue'
import { formatAuthors } from '~~/utils/methods'

const { nuxtAsyncData } = useFetchable()
const route = useRoute()

const title = ref<string>()
const breadcrumb = ref<string>()
const book = ref<Book>()

const load = async () => {
  const entity = await nuxtAsyncData<Book>('/books', [
    route.params.author,
    route.params.slug,
  ])

  book.value = entity
  const serie = entity.serie
    ? ` · ${entity.serie.title}, vol. ${entity.volume} `
    : ''
  const authors = formatAuthors(entity.authors)
  title.value = `${entity.title} (${entity.type}) ${serie}by ${authors}`
  breadcrumb.value = `${entity.title} (${entity.type})`
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
      :breadcrumb="breadcrumb"
      favorite
    >
      <div class="mx-auto grid w-max space-y-3">
        <download-button :download="book.download" :files="book.files" />
      </div>
    </app-header>
    <entity-book-overview :book="book" class="mb-6">
      <template #comments>
        <entity-comment :entity="book" />
      </template>
    </entity-book-overview>
  </main>
</template>
