<template>
  <div
    class="grid grid-cols-1 gap-4 2xl:grid-cols-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
  >
    <entity-card
      v-for="(book, bookId) in books"
      v-cloak
      :id="bookId"
      :key="bookId"
      :data="book"
      :cover="book.image"
      :title="book.title"
      :route="route"
    >
      <template #title>
        {{ $overflow(book.title) }}
      </template>
      <template #hover>
        <div v-if="book.serie">
          <div class="font-semibold">Series volume &#8212;</div>
          <div>Vol. {{ book.serie.number }}</div>
        </div>
      </template>
      <template #title-responsive>
        <div class="font-semibold">
          {{ book.title }}
        </div>
        <div class="italic">
          {{ book.author.name }}
        </div>
        <div v-if="book.serie">
          {{ book.serie.title }}, vol. {{ book.serie.number }}
        </div>
      </template>
    </entity-card>
  </div>
</template>

<script>
import EntityCard from './entity-card.vue'
export default {
  name: 'BooksGrid',
  components: { EntityCard },
  props: {
    books: {
      type: Array,
      default: () => [],
    },
    route: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="postcss" scoped></style>
