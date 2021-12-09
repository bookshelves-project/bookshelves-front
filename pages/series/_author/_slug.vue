<template>
  <main v-if="serie" class="main-content">
    <app-header
      :title="serie.title"
      :image="serie.cover ? serie.cover.thumbnail : null"
      :subtitle="`${serie.count} eBooks`"
      :authors="serie.authors"
      :cta="serie.link"
      :text="serie.description"
      :border="false"
      :entity="serie"
      favorite
    >
      <blocks-button-download
        :href="serie.download"
        :size="serie.size"
        :type="`ZIP`"
      >{{ serie.count }} eBooks</blocks-button-download>
      <div class="mt-2 text-right">Language: {{ formatLanguage(serie.language)?.label }}</div>
      <template #content>
        <div v-if="serie.tags && serie.tags.length" class="lg:flex">
          <h2 class="mr-1">Tags:</h2>
          <ul>
            <li v-for="(tag, id) in serie.tags" :key="id" class="inline-block dark:text-gray-100">
              <span>{{ tag.name }}</span>
              <span
                v-if="serie.tags.length > 1 && id !== serie.tags.length - 1"
                class="mr-1 text-gray-900 dark:text-gray-100"
              >,</span>
            </li>
          </ul>
        </div>
      </template>
    </app-header>
    <div>
      <div v-if="books" class="space-y-6 display-grid sm:space-y-0">
        <blocks-entity-card
          v-for="(book,id) in books"
          :key="id"
          :data="book"
          :cover="book.cover?.thumbnail"
          :color="book.cover?.color"
          :title="book.title"
          :route="{
            name: 'books-author-slug',
            params: { author: book.meta.author, slug: book.meta.slug },
          }"
        >
          <template #title>{{ overflow(book.title, 50) }}</template>
          <template #subtitle>{{ formatAuthors(book.authors) }}</template>
          <template #extra>Vol. {{ book.volume }}</template>
        </blocks-entity-card>
      </div>
      <div class="mt-6 mb-5">
        <!-- <pagination v-if="meta" :current-page="meta.current_page" :pages="meta.last_page" /> -->
        <pagination-load
          v-if="meta"
          :current-page="meta.current_page"
          :pages="meta.last_page"
          :endpoint="ApiEndpoint.SerieBook"
          @load="load"
        />
      </div>
    </div>
    <blocks-comments-template :entity="serie" />
  </main>
</template>

<script setup lang="ts">
import { ApiEndpoint } from '~/composables/repository'
import { ApiMeta, Book, Serie } from '~/types'
import Pagination from '~/components/blocks/pagination.vue'
import { overflow } from '@/plugins/utils/methods'
import { formatLanguage, formatAuthors } from '@/plugins/utils/entities'
import PaginationLoad from '~/components/blocks/pagination-load.vue'

const { $repository, route } = useContext()
const params = route.value.params
const query = route.value.query

const serie = ref<Serie>()
const books = ref<Book[]>()
const meta = ref<ApiMeta>()

useAsync(async () => {
  const [
    serieApi,
    booksApi
  ] = await Promise.all([
    $repository(ApiEndpoint.Serie).show([
      params.author,
      params.slug
    ]),
    $repository(ApiEndpoint.SerieBook).index({
      page: query.page as string || '1',
      perPage: '32'
    }, [
      params.author,
      params.slug
    ])
  ])
  serie.value = serieApi.data
  books.value = booksApi.data
  meta.value = booksApi.meta
})

const load = (data: any[]) => {
  books.value = books.value?.concat(data)
}

// const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
// const title = `${this.serie.title} by ${this.authors}`
// return {
//   title,
//   meta: [
//     ...dynamicMetadata.default({
//       type: 'book',
//       title,
//       description: `Written by ${this.authors} with ${this.serie.count} books.`,
//       url: this.$nuxt.$route.path,
//       image: this.serie.cover.og
//     })
//   ]
// }
</script>
