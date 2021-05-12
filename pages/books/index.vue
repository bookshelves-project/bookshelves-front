<template>
  <main class="container relative max-w-7xl">
    <section-heading :title="title" :subtitle="description" />
    <entities-filter @filter="filter" />
    <section v-if="!apiError">
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="book in books.data"
            :key="book.id"
            :cover="book.picture.base"
            :title="book.title"
            :route="{
              name: 'books-slug',
              params: { author: book.author, slug: book.slug },
            }"
          >
            <template #primary>
              {{ $overflow(book.title, 50) }}
            </template>
            <template #secondary>
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
            </template>
            <template #tertiary>
              <div v-if="book.serie" class="italic">
                {{ book.serie.title }},<br />
                vol. {{ book.volume }}
              </div>
              <div class="mt-1">
                {{ $getLanguage(book.language) }}
              </div>
            </template>
          </entity-card>
        </div>
      </div>
      <div class="mt-6 mb-5">
        <pagination
          v-if="pages > 1"
          :link-gen="linkGen"
          :pages="pages"
          :current-page="currentPage"
          :limit="5"
          class="flex justify-center"
          @event="event"
        >
        </pagination>
      </div>
    </section>
    <api-error-message v-else />
  </main>
</template>

<script>
import qs from 'qs'

import Pagination from '~/components/special/pagination.vue'
import EntityCard from '~/components/blocks/entity-card.vue'
import SectionHeading from '~/components/blocks/section-heading.vue'
import ApiErrorMessage from '~/components/special/api-error-message.vue'
import EntitiesFilter from '~/components/blocks/entities-filter.vue'
import dynamicMetadata from '~/plugins/utils/dynamic-metadata'

export default {
  name: 'Books',
  components: {
    Pagination,
    EntityCard,
    SectionHeading,
    ApiErrorMessage,
    EntitiesFilter,
  },
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query }) {
    try {
      const page = query.page
      const lang = query.lang
      const [books] = await Promise.all([
        app.$axios.$get(
          `/books?${qs.stringify({
            page: page || 1,
            'per-page': 32,
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
        apiError: false,
      }
    } catch (error) {
      return {
        apiError: true,
      }
    }
  },
  data() {
    return {
      isLoading: false,
      isReloadForPaginate: false,
      componentKey: 0,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      title: `Books`,
      description: `Discover all available books sorted by title and serie's title`,
    }
  },
  head() {
    const title = this.title
    const url = `${this.$config.baseURL}/books`
    const dynamicMeta = dynamicMetadata({
      title: this.title,
      description: this.description,
      url,
    })
    return {
      title,
      meta: [...dynamicMeta],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home',
      },
      {
        url: `${this.$config.baseURL}/books`,
        text: 'Books',
      },
    ]
    const items = breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      itemListElement: items,
    }
  },
  watchQuery: ['page', 'lang'],
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
    filter(lang) {
      if (lang) {
        this.$router.push({ name: 'books', query: { lang } })
      } else {
        this.$router.push({ name: 'books' })
      }
    },
  },
}
</script>
