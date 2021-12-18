<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <blocks-filters languages :sort="sortOptions" paginate />
      </template>
    </app-header>
    <section>
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <EntityCard
            v-for="(serie, id) in series"
            :key="id"
            :cover="serie.cover?.thumbnail"
            :color="serie.cover?.color"
            :title="serie.title"
            :route="{
              name: 'series-author-slug',
              params: { author: serie.meta.author, slug: serie.meta.slug },
            }"
          >
            <template #title>{{ serie.title }}</template>
            <template #subtitle>{{ formatAuthors(serie.authors) }}</template>
            <template #extra>
              <span>{{ serie.count }} books</span>
              <span v-if="serie.language" class="mt-1 block">
                {{ formatLanguage(serie.language) }}
              </span>
            </template>
          </EntityCard>
        </div>
      </div>
      <div class="mt-6 mb-5">
        <Pagination
          v-if="meta"
          :current-page="meta.current_page"
          :pages="meta.last_page"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ApiEndpoint, ApiMeta, Serie } from '~/types'
import Pagination from '~/components/blocks/pagination.vue'
import EntityCard from '~/components/blocks/entity-card.vue'
import { formatLanguage, formatAuthors } from '~/utils/methods'

const { $config, route } = useContext()
const router = useRouter()

if (!route.value.query.perPage) {
  router.replace({
    query: {
      perPage: '32',
      page: '1',
      sort: 'title_sort',
    },
  })
}

const series = ref<Serie[]>()
const meta = ref<ApiMeta>()

const title = `All series available on ${$config.appName}`
const description = "Discover books grouped by their serie's name"
const sortOptions = [
  {
    label: "By series' title (default)",
    query: { sort: 'title_sort' },
    value: 'title_sort',
  },
  {
    label: 'By title',
    query: { sort: 'title' },
    value: 'title',
  },
  {
    label: 'Newest uploaded',
    query: { sort: '-created_at' },
    value: '-created_at',
  },
]

useMeta(() => ({
  title,
}))
// const dynamicMetadata = require('~/utils/metadata/dynamic')
// const title = this.title
// return {
//   title,
//   meta: [
//     ...dynamicMetadata.default({
//       title,
//       description: this.description,
//       url: this.$nuxt.$route.path
//     })
//   ]
// }
</script>

<script lang="ts">
export default defineComponent({
  async asyncData({ query, $repository }) {
    const api = await $repository(ApiEndpoint.Serie).index({
      page: (query.page as string) || '1',
      perPage: '32',
      ...query,
    })

    return {
      series: api.data,
      meta: api.meta,
    }
  },
  head: {},
  watchQuery: ['page', 'filter[languages]', 'sort'],
  // jsonld() {
  //   const breadcrumbs = [
  //     {
  //       url: this.$config.baseURL,
  //       text: 'Home'
  //     },
  //     {
  //       url: `${this.$config.baseURL}/series`,
  //       text: 'Series'
  //     }
  //   ]
  //   const items = breadcrumbs.map((item, index) => ({
  //     '@type': 'ListItem',
  //     position: index + 1,
  //     item: {
  //       '@id': item.url,
  //       name: item.text
  //     }
  //   }))
  //   return {
  //     '@context': 'https://schema.org',
  //     '@type': 'WebPage',
  //     itemListElement: items
  //   }
  // },
})
</script>
