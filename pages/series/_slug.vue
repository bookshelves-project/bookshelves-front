<template>
  <div class="px-5 py-5">
    <div class="mb-8">
      <div class="text-3xl font-semibold">
        {{ serie.title }}
      </div>
      <div class="text-xl">
        {{ serie.author }}
      </div>
    </div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="px-3 text-lg font-medium text-gray-900 bg-white">
          {{ serie.books_number }} Books
        </span>
      </div>
    </div>
    <books-grid :key="componentKey" class="mt-5" :books="serie.books" />
  </div>
</template>

<script>
import booksGrid from '~/components/blocks/books-grid.vue'
export default {
  name: 'SeriesSlug',
  components: { booksGrid },
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
