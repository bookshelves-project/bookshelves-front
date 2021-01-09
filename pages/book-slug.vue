<template>
  <div>
    <div
      class="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
    >
      <div class="flex-1 min-w-0">
        <nuxt-link
          to="/"
          class="text-lg font-medium leading-6 text-gray-900 sm:truncate"
        >
          Back
        </nuxt-link>
      </div>
      <div class="flex mt-4 sm:mt-0 sm:ml-4">
        <button
          type="button"
          class="inline-flex items-center order-1 px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
        >
          Share
        </button>
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm order-0 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
        >
          Create
        </button>
      </div>
    </div>
    <main class="py-10">
      <!-- Page header -->
      <book-header :book="book" />

      <div
        class="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 sm:px-6 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-3"
      >
        <book-information :book="book" />
      </div>
    </main>
  </div>
</template>

<script>
import bookHeader from '~/components/blocks/book-slug/book-header.vue'
import BookInformation from '~/components/blocks/book-slug/book-information.vue'
export default {
  name: 'BookSlug',
  components: { bookHeader, BookInformation },
  async asyncData({ app, query, params, error, $content, store }) {
    try {
      const [book] = await Promise.all([
        app.$axios.$get(`books/${params.author}/${params.slug}`),
      ])

      return {
        book: book.data,
      }
    } catch (error) {
      console.error(error)

      return {
        book: [],
      }
    }
  },
}
</script>

<style lang="postcss" scoped></style>
