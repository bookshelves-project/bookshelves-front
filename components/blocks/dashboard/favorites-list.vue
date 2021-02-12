<template>
  <div class="bg-white rounded-md shadow dark:bg-gray-800">
    <div
      class="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6 rounded-t-md"
    >
      <h3 class="flex items-center text-lg font-medium leading-6 text-gray-900">
        <icon-heart class="text-red-600" :is-full="true" />
        <div class="ml-2">Favorites list</div>
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        All your favorites books will be here.
      </p>
    </div>
    <div class="p-3 lg:p-5">
      <transition name="fade">
        <div v-if="favoritesList.length > 0">
          <div
            v-for="book in favoritesList"
            :key="book.id"
            class="relative flex items-center justify-between p-2 text-gray-900 transition-colors duration-100 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50"
          >
            <nuxt-link
              :to="{
                name: 'books-slug',
                params: { author: book.authorSlug, slug: book.slug },
              }"
              class="relative flex items-center"
            >
              <div class="absolute left-0 w-10">
                <img
                  v-lazy="book.cover.basic"
                  alt="Book cover"
                  class="object-cover object-center w-full h-12 rounded-sm shadow"
                />
              </div>
              <div class="flex flex-wrap items-center ml-12">
                <div
                  class="block font-semibold transition-colors duration-100 w-max"
                >
                  <span class="hidden md:block">
                    {{ book.title }}
                  </span>
                  <span class="hidden sm:block md:hidden">
                    {{ $overflow(book.title, 20) }}
                  </span>
                  <span class="block sm:hidden">
                    {{ $overflow(book.title, 16) }}
                  </span>
                </div>
                <div
                  v-if="book.serie"
                  class="flex-wrap items-center hidden md:flex"
                >
                  <span class="mx-1">in</span>
                  <div class="block transition-colors duration-100 w-max">
                    {{ book.serie.title }}
                  </div>
                </div>
              </div>
            </nuxt-link>
            <button
              class="p-4 text-gray-400 hover:text-gray-500"
              title="Delete"
              @click="deleteFavorite('book', book.slug)"
            >
              <icon-trash />
            </button>
          </div>
        </div>
        <div v-else class="flex flex-wrap items-center text-gray-400">
          <div>Your favorite list is empty, try to favorite any book with</div>
          <div>
            <icon-heart class="ml-1" :is-full="true" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import iconHeart from '~/components/icons/icon-heart.vue'
import IconTrash from '~/components/icons/icon-trash.vue'
export default {
  name: 'FavoritesList',
  components: { iconHeart, IconTrash },
  props: {
    books: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      favoritesList: [],
    }
  },
  mounted() {
    this.favoritesList = this.books
  },
  methods: {
    async deleteFavorite(model, slug) {
      const books = this.favoritesList.filter((book) => book.slug !== slug)
      this.favoritesList = books
      try {
        await this.$axios.$post(`/api/favorite/${model}/${slug}`)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
