<template>
  <main v-if="book" class="main-content">
    <app-header
      :title="book.title"
      :image="book.cover ? book.cover.thumbnail : null"
      :image-original="book.cover ? book.cover.original : null"
      :color="book.cover ? book.cover.color : ''"
      :subtitle="subtitle(book)"
      :authors="book.authors"
      :text="book.description"
      :entity="book"
      favorite
    >

      <div class="space-y-3 mx-auto">
        <div>
          <blocks-button-download
            v-if="book.epub && book.epub.download"
            :href="book.epub.download"
            :size="book.epub ? book.epub.size : ''"
            :type="`EPUB`"
          />
        </div>
        <div v-if="book.webreader">
          <app-button :href="book.webreader" class="w-full" external>
            <div class="flex items-center space-x-1">
              <svg-icon name="eye" class="w-5 h-5" />
              <span>Webreader</span>
            </div>
          </app-button>
        </div>
      </div>
    </app-header>
    <blocks-book-main :book="book" class="mb-6" />
    <div
      class="
        lg:grid lg:grid-cols-2
        divide-x divide-transparent
        lg:divide-gray-200 lg:dark:divide-gray-600
      "
    >
      <blocks-book-serie
        v-if="book.serie !== null"
        :book="book"
        class="lg:pr-10"
      />
      <blocks-book-related v-if="book.tags?.length || book.genres?.length" :book="book" :class="book.serie ? 'lg:pl-10' : ''" />
    </div>
    <blocks-comments-template :entity="book" class="mt-6" />
  </main>
</template>

<script setup lang="ts">
import { ApiEndpoint } from '~/composables/repository'
import { Book } from '~/types'
import { formatLanguage, formatAuthors } from '@/plugins/utils/entities'

const { title, meta } = useMeta()

const book = ref<Book>()
const pageTitle = ref<string>()
// const subtitle = computed(() => {
// })
const subtitle = (book: Book) => {
  const lang = formatLanguage(book.language)?.label
  const serie = book.serie
    ? `${book.serie.title}, vol. ${book.volume}, `
    : ''
  return `${serie}into ${lang}`
}

title.value = book.value?.title
// meta.value.push({
//   hid: 'ogTitle',
//   name: 'og:title',
//   content: post.value.title,
// })
// meta.value.push({
//   hid: 'twitterTitle',
//   name: 'twitter:title',
//   content: post.value.title,
// })

useMeta({
  bodyAttrs: {
    itemtype: 'http://schema.org/WebPage'
  },
  meta: [{ hid: 'description', name: 'description', content: 'page desc' }]
})
</script>

<script lang="ts">
export default defineComponent({
  async asyncData({ params, $repository }) {
    const api = await $repository(ApiEndpoint.Book).show([
      params.author,
      params.slug
    ])

    const data = api.data
    const serie = data.serie
      ? ` · ${data.serie.title}, vol. ${data.volume} `
      : ''
    const authors = formatAuthors(data.authors)
    const pageTitle = `${data.title} ${serie}by ${authors}`
    console.log(pageTitle)

    return {
      book: api.data,
      pageTitle
    }
  },
  head: {}
  // const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
  // const serie = this.book.serie
  //   ? ` · ${this.book.serie.title}, vol. ${this.book.volume} `
  //   : ''
  // const authors = this.formatAuthors(this.book.authors)
  // const title = `${this.book.title} ${serie}by ${authors}`
  // return {
  //   title,
  //   description: this.book.summary,
  //   image: this.book.cover.og,
  //   meta: [
  //     ...dynamicMetadata.default({
  //       title,
  //       url: this.$nuxt.$route.path,
  //       bookISBN: this.book.identifier
  //         ? this.book.identifier.isbn13 || this.book.identifier.isbn
  //         : null,
  //       bookAuthor: authors,
  //       bookReleaseDate: this.book.publishDate,
  //       bookTag: this.formatTags(this.book.tags)
  //     })
  //   ]
  // }
})
</script>
