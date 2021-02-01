<template>
  <main class="container mt-5 max-w-7xl">
    <div>
      <div class="mb-8">
        <div class="text-3xl font-semibold">
          {{ serie.title }}
        </div>
        <div class="text-xl">
          {{ serie.author }}
        </div>
      </div>
      <div class="relative mb-8">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-3 text-lg font-medium text-gray-900 bg-white">
            {{ author.books_number }} Books
          </span>
        </div>
      </div>
      <div
        class="grid grid-cols-1 gap-4 2xl:grid-cols-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
      >
        <entity-card
          v-for="book in serie.books"
          :key="book.id"
          :data="book"
          :cover="book.cover.thumbnail"
          :route="{
            name: 'books-slug',
            params: { author: book.author.slug, slug: book.slug },
          }"
        >
          <template #title>
            {{ $overflow(book.title) }}
          </template>
          <template #hover>
            <div>
              <div class="font-semibold">Author &#8212;</div>
              <div class="italic">
                {{ book.author.name }}
              </div>
            </div>
            <div v-if="book.serie" class="mt-5">
              <div class="font-semibold">Serie &#8212;</div>
              <div class="italic break-all">
                {{ book.serie.title }}
              </div>
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
    </div>
  </main>
</template>

<script>
import entityCard from '~/components/blocks/entity-card.vue'
export default {
  name: 'SeriesSlug',
  components: { entityCard },
  async asyncData({ app, query, error, params, $content, store }) {
    try {
      const [serie] = await Promise.all([
        app.$axios.$get(`/series/${params.slug}`),
      ])

      return {
        serie: serie.data,
      }
    } catch (error) {
      console.error(error)

      return {
        serie: {},
      }
    }
  },
  data() {
    return {
      componentKey: 0,
    }
  },
}
</script>

<style lang="postcss" scoped></style>
