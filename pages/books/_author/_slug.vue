<template>
  <main class="main-content">
    <blocks-section-heading
      :title="book.title"
      :image="book.cover ? book.cover.thumbnail : null"
      :image-original="book.cover ? book.cover.original : null"
      :subtitle="subtitle"
      :authors="book.authors"
      :text="book.description"
    >
      <div>
        <div>
          <blocks-button-download
            :href="book.epub ? book.epub.download : null"
            :size="book.epub ? book.epub.size : null"
            :type="`EPUB`"
          />
        </div>
        <div v-if="book.webreader" class="mt-2">
          <app-button :href="book.webreader" class="w-full" external>
            <div class="flex items-center justify-between">
              <svg-icon name="eye" class="w-5 h-5" />
              <span class="ml-2">Webreader</span>
            </div>
          </app-button>
        </div>
      </div>
      <template #text>
        <div v-html="book.description"></div>
      </template>
    </blocks-section-heading>
    <div class="masonry-container">
      <blocks-book-main :book="book" class="masonry-block" />
      <blocks-book-serie
        v-if="book.serie !== null"
        :book="book"
        class="masonry-block"
      />
      <blocks-book-related :book="book" class="masonry-block" />
      <blocks-book-comments
        v-if="$config.moduleSocial"
        :book="book"
        class="masonry-block"
      />
    </div>
  </main>
</template>

<script>
import { formatLanguage, formatAuthors } from '~/plugins/utils/methods'

export default {
  name: 'BooksSlug',
  async asyncData({ app, params }) {
    const [book] = await Promise.all([
      app.$axios.$get(`/books/${params.author}/${params.slug}`),
    ])

    return {
      book: book.data,
    }
  },
  data() {
    return {
      formatAuthors,
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/metadata/metadata-dynamic')
    const serie = this.book.serie
      ? ` · ${this.book.serie.title}, vol. ${this.book.volume} `
      : ''
    const title = `${this.book.title} ${serie}by ${this.authors}`
    return {
      title,
      description: this.book.summary,
      image: this.book.cover.og,
      meta: [
        ...dynamicMetadata({
          title,
          url: this.$nuxt.$route.path,
          bookISBN: this.book.identifier
            ? this.book.identifier.isbn13 || this.book.identifier.isbn
            : null,
          bookAuthor: this.authors,
          bookReleaseDate: this.book.publishDate,
          bookTag: this.book.tags,
        }),
      ],
    }
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: `${this.$config.baseURL}/`,
        text: 'Home',
      },
      {
        url: `${this.$config.baseURL}/books`,
        text: 'Books',
      },
      {
        url: `${this.$config.baseURL}/books/${this.$route.params.author}/${this.$route.params.slug}`,
        text: this.book.title,
      },
    ]
    const authors = this.book.authors.map((author, index) => ({
      '@type': 'Person',
      familyName: author.lastname,
      givenName: author.firstname,
      name: author.name,
      url: `${this.$config.baseURL}/authors/${author.meta.slug}`,
    }))

    const items = breadcrumbs.map((item, index) => ({
      '@type': 'BreadcrumbList',
      item: {
        '@type': 'ListItem',
        position: index + 1,
        '@id': item.url,
        name: item.text,
      },
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      itemListElement: items,
      mainEntity: {
        '@type': 'Book',
        author: authors,
        bookFormat: 'http://schema.org/Book',
        datePublished: this.book.publishDate,
        image: this.book.cover.thumbnail,
        inLanguage: formatLanguage(this.book.language),
        isbn: this.book.identifier
          ? this.book.identifier.isbn || this.book.identifier.isbn13
          : null,
        name: this.book.title,
        numberOfPages: this.book.pageCount,
        publisher: this.book.publisher ? this.book.publisher.name : '',
      },
    }
  },
  computed: {
    subtitle() {
      const lang = formatLanguage(this.book.language)
      const serie = this.book.serie
        ? `${this.book.serie.title}, vol. ${this.book.volume}, `
        : null
      return `${serie}into ${lang}`
    },
    authors() {
      return formatAuthors(this.book.authors)
    },
  },
}
</script>

<style lang="postcss" scoped>
.masonry-block {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 0.8rem;
  break-inside: avoid;
}

.masonry-container {
  column-count: 1;
  column-gap: 1rem;
}

@screen lg {
  .masonry-container {
    column-count: 2;
  }
}
</style>
