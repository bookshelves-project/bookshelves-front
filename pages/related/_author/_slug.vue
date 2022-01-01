<template>
  <main class="main-content">
    <app-header :title="`${title} ${book.title}`" :subtitle="description" />
    <section class="space-y-6 display-grid sm:space-y-0">
      <entity-card
        v-for="(entity, id) in entities"
        :key="id"
        :cover="entity.cover?.thumbnail"
        :color="entity.cover?.color"
        :title="book.title"
        :route="{
          name:
            entity.meta?.entity === 'author'
              ? `authors-slug`
              : `${entity.meta.entity}s-author-slug`,
          params: {
            author: entity.meta.author,
            slug: entity.meta.slug,
          },
        }"
      >
        <template #title>
          <span class="line-clamp-2">
            {{ book.title }}
          </span>
        </template>
        <template #subtitle>
          {{ formatAuthors(entity.authors) }}
        </template>
        <template #extra>
          {{ capitalize(entity.meta.entity) }}
        </template>
      </entity-card>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiEndpoint, ApiMeta, Book, Entity } from '~/types'
import EntityCard from '~/components/block/entity-card.vue'
import { capitalize, formatLanguage, formatAuthors } from '~/utils/methods'

@Component({
  async asyncData({ $repository, params }) {
    const [api, book] = await Promise.all([
      $repository(ApiEndpoint.BookRelated, false).index<Entity>({}, [
        params.author,
        params.slug,
      ]),
      $repository(ApiEndpoint.Book).show<Book>([params.author, params.slug]),
    ])

    return {
      entities: api.data,
      meta: api.meta,
      book: book.data,
    }
  },
  methods: {
    capitalize,
    formatLanguage,
    formatAuthors,
  },
  components: {
    EntityCard,
  },
})
export default class PageRelatedAuthor extends Vue {
  entities!: Entity[]
  meta!: ApiMeta
  book!: Book
  capitalize!: typeof capitalize
  formatLanguage!: typeof formatLanguage
  formatAuthors!: typeof formatAuthors

  title = 'Related books & series for'
  description = 'List of all results for related books & series...'
}
</script>

<style scoped></style>
