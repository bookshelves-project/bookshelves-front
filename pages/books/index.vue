<template>
  <main class="container mt-5 max-w-7xl">
    <div>
      <div
        class="grid grid-cols-1 gap-4 2xl:grid-cols-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
      >
        <entity-card
          v-for="book in books.data"
          :key="book.id"
          :data="book"
          :cover="book.cover.thumbnail"
          :route="{
            name: 'books-slug',
            params: { author: book.author.slug, slug: book.slug },
          }"
        >
          <template #title>
            {{ $overflow(book.title) }}
          </template>
          <template #hover>
            <div>
              <div class="font-semibold">Author &#8212;</div>
              <div class="italic">
                {{ book.author.name }}
              </div>
            </div>
            <div v-if="book.serie" class="mt-5">
              <div class="font-semibold">Serie &#8212;</div>
              <div class="italic break-all">
                {{ book.serie.title }}
              </div>
              <div>Vol. {{ book.serie.number }}</div>
            </div>
          </template>
          <template #title-responsive>
            <div class="font-semibold">
              {{ book.title }}
            </div>
            <div class="italic">
              {{ book.author.name }}
            </div>
            <div v-if="book.serie">
              {{ book.serie.title }}, vol. {{ book.serie.number }}
            </div>
          </template>
        </entity-card>
      </div>
    </div>
    <div class="mt-6 mb-5">
      <pagination
        :link-gen="linkGen"
        :pages="pages"
        :current-page="currentPage"
        :limit="5"
        class="flex justify-center"
        @event="event"
      >
      </pagination>
    </div>
  </main>
</template>

<script>
import qs from 'qs'

import Pagination from '~/components/special/pagination.vue'
import EntityCard from '~/components/blocks/entity-card.vue'

export default {
  name: 'Books',
  components: {
    Pagination,
    EntityCard,
  },
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query, error, $content, store }) {
    try {
      const page = query.page
      const [books] = await Promise.all([
        app.$axios.$get(
          `/books?${qs.stringify({
            page: page || 1,
            perPage: 32,
          })}`
        ),
      ])

      return {
        books,
        pages: books.meta.last_page,
        currentPage: books.meta.current_page,
        perPage: books.meta.per_page,
        total: books.meta.total,
      }
    } catch (error) {
      console.error(error)

      return {
        books: [],
        pages: 0,
        currentPage: 0,
      }
    }
  },
  data() {
    return {
      isLoading: false,
      isReloadForPaginate: false,
      componentKey: 0,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
    }
  },
  methods: {
    linkGen(pageNum) {
      return {
        name: this.$route.name,
        query: pageNum === 1 ? {} : { page: pageNum },
      }
    },
    event(data) {
      this.componentKey += 1
    },
    searching(result) {
      console.log(this.$store.state.searching)
    },
  },
  watchQuery: ['page'],
  head() {
    const title = 'Books on Bookshelves'
    const description = 'All books available on Bookshelves.'
    const image = `${process.env.BASE_URL}/open-graph.png`
    return {
      title,
      titleTemplate: '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: image,
        },
      ],
    }
  },
}
</script>
