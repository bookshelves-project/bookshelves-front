<template>
  <main class="main-content">
    <app-header
      :title="book.title"
      :image="book.cover ? book.cover.thumbnail : null"
      :image-original="book.cover ? book.cover.original : null"
      :color="book.cover ? book.cover.color : ''"
      :subtitle="subtitle"
      :authors="book.authors"
      :text="book.description"
      :entity="book"
      favorite
    >
      <div class="space-y-3 grid w-max mx-auto">
        <app-button
          v-if="book.epub && book.epub.download"
          :href="book.epub.download"
          color="primary"
          class="w-full md:w-max mx-auto"
          icon="download"
        >
          Download (EPUB {{ book.epub.size }})
        </app-button>
        <app-button
          v-if="book.webreader"
          :to="{
            name: 'reader-author-slug',
            params: { author: book.meta.author, slug: book.meta.slug },
          }"
          class="w-full md:w-max lg:w-full mx-auto"
          icon="eye"
          external
        >
          Webreader
        </app-button>
      </div>
    </app-header>
    <block-book-main :book="book" class="mb-6" />
    <div
      class="lg:grid lg:grid-cols-2 divide-x divide-transparent lg:divide-gray-200 lg:dark:divide-gray-600"
    >
      <block-book-serie
        v-if="book.serie !== null"
        :book="book"
        class="lg:pr-10"
      />
      <block-book-related
        v-if="book.tags?.length || book.genres?.length"
        :book="book"
        :class="book.serie ? 'lg:pl-10' : ''"
      />
    </div>
    <block-comments-template :entity="book" class="mt-6" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiEndpoint, Book } from '~/types'
import { formatLanguage, formatAuthors, formatTags } from '~/utils/methods'

@Component({
  async asyncData({ $repository, params }) {
    const api = await $repository(ApiEndpoint.Book).show<Book>([
      params.author,
      params.slug,
    ])

    const book = api.data
    const serie = book.serie
      ? ` · ${book.serie.title}, vol. ${book.volume} `
      : ''
    const authors = formatAuthors(book.authors)
    const title = `${book.title} ${serie}by ${authors}`

    return {
      book,
      title,
    }
  },
  methods: {
    formatLanguage,
    formatAuthors,
    formatTags,
  },
  head(this: PageBookAuthorSlug) {
    const authors = this.formatAuthors(this.book.authors)
    const isbn: string = this.book.identifier
      ? ((this.book.identifier.isbn13 || this.book.identifier.isbn) as string)
      : ''

    return this.$metadata({
      title: this.title,
      description: this.book.summary,
      image: this.book.cover?.og,
      bookISBN: isbn,
      bookAuthor: authors,
      bookReleaseDate: this.book.publishDate?.toString(),
      bookTag: formatTags(this.book.tags),
    })
  },
})
export default class PageBookAuthorSlug extends Vue {
  book!: Book
  formatLanguage!: typeof formatLanguage
  formatAuthors!: typeof formatAuthors
  title!: string

  get subtitle() {
    const lang = formatLanguage(this.book.language)
    const serie = this.book.serie
      ? `${this.book.serie.title}, vol. ${this.book.volume}, `
      : ''
    return `${serie}into ${lang}`
  }
}
</script>
