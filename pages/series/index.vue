<template>
  <main class="container max-w-7xl">
    <section-heading
      title="Series"
      subtitle="Discover books grouped by their serie's name"
    />
    <div>
      <div class="display-grid">
        <entity-card
          v-for="serie in series.data"
          :key="serie.id"
          :cover="serie.cover"
          :route="{
            name: 'series-slug',
            params: { slug: serie.slug },
          }"
        >
          <template #title>
            {{ $overflow(serie.title) }}
          </template>
          <template #hover>
            <div>
              <div class="font-semibold">Author &#8212;</div>
              <div class="italic">
                {{ serie.author }}
              </div>
              <div class="mt-5">
                <div class="font-semibold">Serie &#8212;</div>
                <div>{{ serie.booksNumber }} books</div>
              </div>
              <div v-if="serie.language" class="mt-5">
                <div class="font-semibold">Language &#8212;</div>
                <img :src="serie.language.flag" :alt="serie.language.slug" />
              </div>
            </div>
          </template>
          <template #title-responsive>
            <div class="font-semibold">
              {{ serie.title }}
            </div>
            <div class="italic">
              {{ serie.author }}
            </div>
            <div>{{ serie.booksNumber }} books</div>
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
  name: 'SeriesIndex',
  components: { Pagination, EntityCard, SectionHeading },
  async asyncData({ app, query, error, $content, store }) {
    try {
      const page = query.page
      const [series] = await Promise.all([
        app.$axios.$get(
          `/api/series?${qs.stringify({
            page: page || 1,
            perPage: 32,
          })}`
        ),
      ])

      return {
        series,
        pages: series.meta.last_page,
        currentPage: series.meta.current_page,
        perPage: series.meta.per_page,
        total: series.meta.total,
      }
    } catch (error) {
      console.error(error)

      return {
        series: [],
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
  head() {
    const title = 'Series on Bookshelves'
    const description = 'Discover exciting and breathtaking series.'
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
          href: `${process.env.BASE_URL}/series`,
        },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped>
.cover {
  @apply object-cover rounded-sm;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
}
</style>
