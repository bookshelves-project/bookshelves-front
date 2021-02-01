<template>
  <main class="container mt-5 max-w-7xl">
    <div>
      <!-- <search /> -->
      <div>
        <div
          class="grid grid-cols-1 gap-4 2xl:grid-cols-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
        >
          <entity-card
            v-for="author in authors.data"
            :key="author.id"
            :cover="author.avatar"
            :route="{
              name: 'authors-slug',
              params: { slug: author.slug },
            }"
          >
            <template #image>
              <author-image :author-name="author.name" />
            </template>
            <template #title>
              {{ $overflow(author.name) }}
            </template>
            <template #hover>
              <div>
                <div class="font-semibold">Available here &#8212;</div>
                <div>{{ author.books_number }} books</div>
              </div>
            </template>
            <template #title-responsive>
              <div class="font-semibold">
                {{ author.name }}
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
    </div>
  </main>
</template>

<script>
import qs from 'qs'
import Pagination from '~/components/special/pagination.vue'
import EntityCard from '~/components/blocks/entity-card.vue'
import AuthorImage from '~/components/blocks/author-image.vue'
export default {
  name: 'AuthorsIndex',
  components: { Pagination, EntityCard, AuthorImage },
  async asyncData({ app, query, error, $content, store }) {
    try {
      const page = query.page
      const [authors] = await Promise.all([
        app.$axios.$get(
          `/authors?${qs.stringify({
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
}
</script>

<style lang="postcss" scoped></style>
