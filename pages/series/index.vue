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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useIndexStore } from '~/stores'
import { ApiEndpoint, ApiMeta, Application, Serie } from '~/types'
import { formatLanguage, formatAuthors } from '~/utils/methods'
import Pagination from '~/components/blocks/pagination.vue'
import EntityCard from '~/components/blocks/entity-card.vue'
import { useApplicationStore } from '~/stores/application'

@Component({
  async asyncData({ $repository, query }) {
    const api = await $repository(ApiEndpoint.Serie).index<Serie>({
      page: (query.page as string) || '1',
      perPage: '32',
      ...query,
    })

    const store = useApplicationStore()
    const application = store.application as Application
    const title = `All series available on ${application.name}`

    return {
      series: api.data,
      meta: api.meta,
      title,
    }
  },
  head(this: PageSeriesIndex) {
    return this.$metadata({
      title: this.title,
      description: this.description,
    })
  },
  methods: {
    formatLanguage,
    formatAuthors,
  },
  components: {
    Pagination,
    EntityCard,
  },
  watchQuery: ['page', 'filter[languages]', 'sort'],
})
export default class PageSeriesIndex extends Vue {
  series!: Serie[]
  meta!: ApiMeta

  formatLanguage!: typeof formatLanguage
  formatAuthors!: typeof formatAuthors

  title!: string
  description = 'Discover all series'
  sortOptions = [
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
}
</script>
