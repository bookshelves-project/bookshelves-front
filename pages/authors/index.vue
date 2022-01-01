<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <block-filters :sort="sortOptions" paginate />
      </template>
    </app-header>
    <section>
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="(author, id) in authors"
            :key="id"
            :cover="author.cover?.thumbnail"
            :color="author.cover?.color"
            :title="author.name"
            :route="{
              name: 'authors-slug',
              params: { slug: author.meta.slug },
            }"
          >
            <template #title
              >{{ author.lastname }} {{ author.firstname }}</template
            >
            <template #extra>
              <span> {{ author.count?.books }} books </span>
              <span v-if="author.count?.series && author.count?.series > 1">
                &
                {{ author.count?.series }} series
              </span>
            </template>
          </entity-card>
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
import { ApiEndpoint, ApiMeta, Application, Author, MetaInfo } from '~/types'
import EntityCard from '~/components/block/entity-card.vue'
import Pagination from '~/components/block/pagination.vue'
import { useApplicationStore } from '~/stores/application'

@Component({
  async asyncData({ $repository, query }) {
    const api = await $repository(ApiEndpoint.Author).index<Author>({
      page: (query.page as string) || '1',
      perPage: '32',
      ...query,
    })

    const store = useApplicationStore()
    const application = store.application as Application
    const title = `All authors available on ${application.name}`

    return {
      authors: api.data,
      meta: api.meta,
      title,
    }
  },
  head(this: PageAuthorsIndex) {
    return this.$metadata({
      title: this.title,
      description: this.description,
    })
  },
  watchQuery: ['page', 'sort'],
  components: {
    EntityCard,
    Pagination,
  },
})
export default class PageAuthorsIndex extends Vue {
  authors!: Author[]
  meta!: ApiMeta

  title!: string
  description = 'Want to find all books written by specific author?'
  sortOptions = [
    {
      label: 'By lastname (default)',
      query: { sort: 'lastname' },
      value: 'lastname',
    },
    {
      label: 'By firstname',
      query: { sort: 'firstname' },
      value: 'firstname',
    },
    {
      label: 'Newest created',
      query: { sort: '-created_at' },
      value: '-created_at',
    },
  ]

  // jsonld() {
  //   const breadcrumbs = [
  //     {
  //       url: this.$config.baseURL,
  //       text: 'Home'
  //     },
  //     {
  //       url: `${this.$config.baseURL}/authors`,
  //       text: 'Authors'
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
  // }

  /**
   * Script setup
   */
  // useAsync(async () => {
  //   const [serieApi, booksApi] = await Promise.all([
  //     $repository(ApiEndpoint.Serie).show([params.author, params.slug]),
  //     $repository(ApiEndpoint.SerieBook).index(
  //       {
  //         page: (query.page as string) || '1',
  //         perPage: '32',
  //       },
  //       [params.author, params.slug]
  //     ),
  //   ])
  //   serie.value = serieApi.data
  //   books.value = booksApi.data
  //   meta.value = booksApi.meta
  // })
}
</script>
