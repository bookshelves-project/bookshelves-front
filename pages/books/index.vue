<template>
  <main class="container max-w-7xl">
    <section-heading
      title="Books"
      subtitle="Discover all available books sorted by title and serie's title"
    />
    <div>
      <div class="display-grid">
        <entity-card
          v-for="book in books.data"
          :key="book.id"
          :data="book"
          :cover="book.cover.thumbnail"
          :route="{
            name: 'books-slug',
            params: { author: book.authorSlug, slug: book.slug },
          }"
        >
          <template #title>
            {{ $overflow(book.title) }}
          </template>
          <template #hover>
            <div>
              <div class="font-semibold">Author &#8212;</div>
              <div class="italic">
                <div v-for="author in book.authors" :key="author.id">
                  {{ author.name }}
                </div>
              </div>
            </div>
            <div v-if="book.serie" class="mt-5">
              <div class="font-semibold">Serie &#8212;</div>
              <div class="italic break-all">
                {{ book.serie.title }}, vol. {{ book.serie.number }}
              </div>
            </div>
            <div v-if="book.language" class="mt-5">
              <div class="font-semibold">Language &#8212;</div>
              <img :src="book.language.flag" :alt="book.language.slug" />
            </div>
          </template>
          <template #title-responsive>
            <div class="font-semibold">
              {{ book.title }}
            </div>
            <div class="italic">
              <div v-for="(author, authorId) in book.authors" :key="authorId">
                {{ author.name }}
                <span
                  v-if="
                    book.authors.length > 1 &&
                    authorId !== book.authors.length - 1
                  "
                >
                  &
                </span>
              </div>
            </div>
            <div v-if="book.serie">
              {{ book.serie.title }}, vol. {{ book.serie.number }}
            </div>
            <div v-if="book.language" class="mt-5">
              <img :src="book.language.flag" :alt="book.language.slug" />
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
import SectionHeading from '~/components/blocks/section-heading.vue'

export default {
  name: 'Books',
  components: {
    Pagination,
    EntityCard,
    SectionHeading,
  },
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query, error, $content, store }) {
    try {
      const page = query.page
      const lang = query.lang
      const [books] = await Promise.all([
        app.$axios.$get(
          `/api/books?${qs.stringify({
            page: page || 1,
            perPage: 32,
            lang,
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
      const lang = this.$route.query.lang
      return {
        name: this.$route.name,
        query: pageNum === 1 ? { lang } : { page: pageNum, lang },
      }
    },
    event(data) {
      this.componentKey += 1
    },
    searching(result) {
      // console.log(this.$store.state.searching)
    },
  },
  watchQuery: ['page', 'lang'],
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
      link: [
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}/books`,
        },
      ],
    }
  },
}
</script>
