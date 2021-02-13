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
            v-for="favorite in favoritesList"
            :key="favorite.id"
            class="flex items-center justify-between"
          >
            <nuxt-link
              :to="{
                name: 'books-slug',
                params: { author: favorite.authorSlug, slug: favorite.slug },
              }"
              class="relative flex items-center justify-between w-full py-5 my-1 text-gray-900 transition-colors duration-100 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50"
            >
              <div class="relative flex items-center">
                <div class="absolute left-0 w-10">
                  <img
                    v-lazy="favorite.cover.basic"
                    alt="Book cover"
                    class="object-cover object-center w-full h-full rounded-sm shadow"
                  />
                </div>
                <div class="flex flex-wrap items-center ml-12">
                  <div
                    class="block font-semibold transition-colors duration-100 w-max"
                  >
                    <span class="hidden md:block">
                      {{ favorite.title }}
                    </span>
                    <span class="hidden sm:block md:hidden">
                      {{ $overflow(favorite.title, 20) }}
                    </span>
                    <span class="block sm:hidden">
                      {{ $overflow(favorite.title, 16) }}
                    </span>
                  </div>
                  <div
                    v-if="favorite.serie"
                    class="flex-wrap items-center hidden md:flex"
                  >
                    <span class="mx-1">in</span>
                    <div class="block transition-colors duration-100 w-max">
                      {{ favorite.serie.title }}
                    </div>
                  </div>
                </div>
              </div>
            </nuxt-link>
            <button
              class="p-5 text-gray-400 hover:text-gray-500 hover:bg-gray-50"
              title="Delete"
              @click="deleteFavorite('book', favorite.slug)"
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
import favorites from '~/mixins/favorites'

export default {
  name: 'FavoritesList',
  components: { iconHeart, IconTrash },
  mixins: [favorites],
  props: {
    favorites: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" scoped></style>
