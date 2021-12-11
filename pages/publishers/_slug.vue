<template>
  <main class="main-content">
    <app-header :title="`${title} ${publisher.name}`" :subtitle="description" />
    <section>
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="book in books.data"
            :key="book.id"
            :cover="book.cover.thumbnail"
            :color="book.cover.color"
            :title="book.title"
            :route="{
              name: `books-author-slug`,
              params: { author: book.meta.author, slug: book.meta.slug },
            }"
          >
            <template #title>{{ $overflow(book.title, 50) }}</template>
            <template #subtitle>
              <div v-for="(author, authorId) in book.authors" :key="authorId">
                {{ author.name }}
                <span
                  v-if="
                    book.authors.length > 1 &&
                      authorId !== book.authors.length - 1
                  "
                >&</span>
              </div>
            </template>
            <template #extra>
              <div v-if="book.serie" class="italic">
                {{ book.serie.title }},
                <br />
                vol. {{ book.volume }}
              </div>
              <div class="mt-1">{{ formatLanguage(book.language).label }}</div>
            </template>
          </entity-card>
        </div>
        <div class="mt-14 mb-5">
          <load-more
            :last-page="books.meta.last_page"
            :endpoint="`publishers/books/${publisher.meta.slug}`"
            :entities="books.data"
            @load="load"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import EntityCard from '~/components/blocks/entity-card.vue'
import { formatLanguage, formatAuthors } from '~/utils/methods'
import LoadMore from '~/components/special/load-more.vue'

export default {
  name: 'PageRelatedSlug',
  components: { EntityCard, LoadMore },
  async asyncData({ app, params }) {
    const [
      publisher,
      books
    ] = await Promise.all([
      app.$axios.$get(`/publishers/${params.slug}`),
      app.$axios.$get(`/publishers/books/${params.slug}`)
    ])

    return {
      publisher: publisher.data,
      books
    }
  },
  data() {
    return {
      formatLanguage,
      formatAuthors,
      title: 'Books published by',
      description: 'List of all books for publisher'
    }
  },
  head() {
    const dynamicMetadata = require('~/utils/metadata/dynamic')
    const title = `${this.title} ${this.publisher.name}`
    return {
      title,
      meta: [
        ...dynamicMetadata.default({
          title,
          description: this.description,
          url: this.$nuxt.$route.path
        })
      ]
    }
  },
  methods: {
    load(data) {
      this.books.data = data
    }
  }
}
</script>
