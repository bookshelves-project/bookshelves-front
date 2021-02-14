<template>
  <main class="container max-w-7xl">
    <section-heading
      title="Authors"
      subtitle="Want to find all books written by specific author?"
    />
    <div>
      <div class="display-grid">
        <entity-card
          v-for="(author, authorId) in authors.data"
          :key="authorId"
          :cover="author.image"
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
  </main>
</template>

<script>
import qs from 'qs'

import Pagination from '~/components/special/pagination.vue'
import EntityCard from '~/components/blocks/entity-card.vue'
import SectionHeading from '~/components/blocks/section-heading.vue'

export default {
  name: 'AuthorsIndex',
  components: { Pagination, EntityCard, SectionHeading },
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
      }
    } catch (error) {
      console.error(error)

      return {
        authors: [],
        pages: 0,
        currentPage: 0,
        componentKey: 0,
      }
    }
  },
  data() {
    return {
      componentKey: 0,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
    }
  },
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
  watchQuery: ['page'],
  head() {
    const title = 'Authors on Bookshelves'
    const description = 'Find your favorite author among those.'
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
          href: `${process.env.BASE_URL}/authors`,
        },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped></style>
