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
      class="lg:grid lg:grid-cols-2 divide-x divide-transparent lg:divide-gray-200 lg:dark:divide-gray-600"
    >
      <blocks-book-serie
        v-if="book.serie !== null"
        :book="book"
        class="lg:pr-10"
      />
      <blocks-book-related
        v-if="book.tags?.length || book.genres?.length"
        :book="book"
        :class="book.serie ? 'lg:pl-10' : ''"
      />
    </div>
    <blocks-comments-template :entity="book" class="mt-6" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiEndpoint, Book, MetaInfo } from '~/types'
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
  head(this: PageBookAuthorSlug): MetaInfo {
    const authors = this.formatAuthors(this.book.authors)
    const isbn: string = this.book.identifier
      ? ((this.book.identifier.isbn13 || this.book.identifier.isbn) as string)
      : ''

    return {
      title: this.title,
      meta: this.$metadata({
        title: this.title,
        description: this.book.summary,
        image: this.book.cover?.og,
        bookISBN: isbn,
        bookAuthor: authors,
        bookReleaseDate: this.book.publishDate?.toString(),
        bookTag: formatTags(this.book.tags),
      }),
    }
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
