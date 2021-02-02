<template>
  <main class="container mt-5 max-w-7xl">
    <div>
      <!-- <search /> -->
      <div>
        <div
          class="grid grid-cols-1 gap-4 2xl:grid-cols-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
        >
          <entity-card
            v-for="(author, authorId) in authors.data"
            :key="authorId"
            :cover="author.picture"
            :route="{
              name: 'authors-slug',
              params: { slug: author.slug },
            }"
          >
            <template #image>
              <v-lazy-image
                :alt="author.name"
                :src="author.picture"
                src-placeholder="/images/author-no-picture.svg"
                class="object-cover object-top w-32 h-32 rounded-full"
              />
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

export default {
  name: 'AuthorsIndex',
  components: { Pagination, EntityCard },
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

      await Promise.all(
        authors.data.map(async (author) => {
          const pictureDefault = `${process.env.BASE_URL}/images/author-no-picture.svg`
          let picture = ''
          let authorName = author.name
          const regex = /\s/g
          authorName = authorName.replace(regex, '%20')
          const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&titles=${authorName}&prop=pageimages&format=json&pithumbsize=512`
          try {
            const result = await app.$http.$get(url)
            const source =
              result.query.pages[Object.keys(result.query.pages)[0]]

            try {
              picture = source.thumbnail.source
            } catch (error) {
              picture = pictureDefault
            }
          } catch (error) {
            picture = pictureDefault
          }
          author.picture = picture
        })
      )

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
    return {
      title: 'Authors',
    }
  },
}
</script>

<style lang="postcss" scoped></style>
