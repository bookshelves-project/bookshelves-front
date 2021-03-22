<template>
  <main class="container max-w-7xl">
    <section-heading
      title="Authors"
      subtitle="Want to find all books written by specific author?"
    />
    <section v-if="!apiError">
      <div>
        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
        >
          <entity-card
            v-for="(author, authorId) in authors.data"
            :key="authorId"
            :cover="author.image"
            :image-alt="author.name"
            :route="{
              name: 'authors-slug',
              params: { slug: author.slug },
            }"
          >
            <template #title>
              {{ $overflow(`${author.lastname} ${author.firstname}`) }}
            </template>
            <template #hover>
              <div>
                <div class="font-semibold">Available here &#8212;</div>
                <div>{{ author.books_number }} books</div>
              </div>
            </template>
            <template #title-responsive>
              <div class="font-semibold">
                {{ `${author.lastname} ${author.firstname}` }}
              </div>
              <div>{{ author.books_number }} books</div>
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

export default {
  name: 'AuthorsIndex',
  components: { Pagination, EntityCard, SectionHeading, ApiErrorMessage },
  async asyncData({ app, query, error, $content, store }) {
    try {
      const page = query.page
      const [authors] = await Promise.all([
        app.$axios.$get(
          `/api/authors?${qs.stringify({
            page: page || 1,
            perPage: 32,
          })}`
        ),
      ])

      return {
        authors,
        pages: authors.meta.last_page,
        currentPage: authors.meta.current_page,
        perPage: authors.meta.per_page,
        total: authors.meta.total,
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
      componentKey: 0,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
    }
  },
  head() {
    const title = 'Authors on Bookshelves'
    const description = 'Find your favorite author among those.'
    const image = `${process.env.BASE_URL}/open-graph.jpg`
    const url = `${process.env.BASE_URL}/authors`
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
        {
          hid: 'og:url',
          property: 'og:url',
          content: url,
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
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      // this.componentKey += 1
      return {
        name: this.$route.name,
        query: pageNum === 1 ? {} : { page: pageNum },
      }
    },
    event(data) {
      this.componentKey += 1
    },
  },
}
</script>
