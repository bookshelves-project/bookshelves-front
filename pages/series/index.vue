<template>
  <main class="container max-w-7xl">
    <section-heading :title="title" :subtitle="description" />
    <section v-if="!apiError">
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="serie in series.data"
            :key="serie.id"
            :cover="serie.picture.base"
            :image-alt="serie.title"
            :route="{
              name: 'series-slug',
              params: { author: serie.author, slug: serie.slug },
            }"
          >
            <template #primary>
              {{ serie.title }}
            </template>
            <template #secondary>
              <div v-for="(author, authorId) in serie.authors" :key="authorId">
                {{ author.name }}
                <span
                  v-if="
                    serie.authors.length > 1 &&
                    authorId !== serie.authors.length - 1
                  "
                >
                  &
                </span>
              </div>
            </template>
            <template #tertiary> {{ serie.booksNumber }} books </template>
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
import dynamicMetadata from '~/plugins/utils/dynamic-metadata'

export default {
  name: 'SeriesIndex',
  components: { Pagination, EntityCard, SectionHeading, ApiErrorMessage },
  async asyncData({ app, query }) {
    try {
      const page = query.page
      const [series] = await Promise.all([
        app.$axios.$get(
          `/series?${qs.stringify({
            page: page || 1,
            'per-page': 32,
          })}`
        ),
      ])

      return {
        series,
        pages: series.meta.last_page,
        currentPage: series.meta.current_page,
        perPage: series.meta.per_page,
        total: series.meta.total,
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
      title: `Series`,
      description: `Discover books grouped by their serie's name`,
    }
  },
  head() {
    const title = this.title
    const url = `${process.env.BASE_URL}/series`
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
        url: process.env.BASE_URL,
        text: 'Home',
      },
      {
        url: `${process.env.BASE_URL}/series`,
        text: 'Series',
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
  watchQuery: ['page'],
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
}
</script>

<style lang="postcss" scoped>
.cover {
  @apply object-cover rounded-sm;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
}
</style>
