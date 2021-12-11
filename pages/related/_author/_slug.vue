<template>
  <main class="main-content">
    <app-header :title="`${title} ${currentBook.title}`" :subtitle="description" />
    <section>
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="book in books"
            :key="book.id"
            :cover="book.cover.thumbnail"
            :color="book.cover.color"
            :title="book.title"
            :route="{
              name:
                book.meta.entity === 'author'
                  ? `authors-slug`
                  : `${book.meta.entity}s-author-slug`,
              params: {
                author: book.meta.author,
                slug: book.meta.slug,
              },
            }"
          >
            <template #title>{{ $overflow(book.title, 50) }}</template>
            <template #subtitle>
              <div v-for="(author, authorId) in book.authors" :key="authorId">
                {{ author.name }}
                <span
                  v-if="book.authors.length > 1 && authorId !== book.authors.length - 1"
                >&</span>
              </div>
            </template>
            <template #extra>{{ capitalize(book.meta.entity) }}</template>
          </entity-card>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import EntityCard from '~/components/blocks/entity-card.vue'
import { objectIsEmpty, capitalize, formatLanguage, formatAuthors } from '~/utils/methods'

export default {
  name: 'PageRelatedSlug',
  // eslint-disable-next-line vue/no-unused-components
  components: { EntityCard },
  async asyncData({ app, params }) {
    const [
      currentBook,
      books
    ] = await Promise.all([
      app.$axios.$get(`/books/${params.author}/${params.slug}`),
      app.$axios.$get(`/books/related/${params.author}/${params.slug}`)
    ])

    return {
      currentBook: currentBook.data,
      books: books.data
    }
  },
  data() {
    return {
      title: 'Related books & series for',
      description: 'List of all results for related books & series...'
    }
  },
  head() {
    const dynamicMetadata = require('~/utils/metadata/dynamic')
    const title = `${this.title} ${this.currentBook.title}`
    return {
      title,
      meta: [
        ...dynamicMetadata.default({
          title,
          description: this.description,
          url: this.$nuxt.$route.path,
          image: this.currentBook.cover.og
        })
      ]
    }
  },
  methods: {
    formatLanguage,
    objectIsEmpty,
    formatAuthors,
    capitalize
  }
}
</script>
