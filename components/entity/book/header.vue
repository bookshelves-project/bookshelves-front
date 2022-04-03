<template>
  <div>entity book header</div>
</template>

<!-- <template>
  <section aria-labelledby="book-header">
    <div class="overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800">
      <h2 id="profile-overview-title" class="sr-only">Profile Overview</h2>
      <div class="p-6 bg-white dark:bg-gray-800">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:flex sm:space-x-5">
            <div v-if="book.cover" class="shrink-0">
              <app-img
                :src="book.cover.thumbnail"
                :color="book.cover.color"
                :title="book.title"
                class="w-20 h-20"
                picture="rounded-md"
              />
            </div>
            <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p
                class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-100"
              >
                {{ book.title }}
              </p>
              <p
                v-if="book.serie"
                class="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                {{ book.serie.title }}, vol. {{ book.volume }}
              </p>
              <p
                v-if="book.epub"
                class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                <svg-icon name="epub" class="w-4 h-4" />
                <span class="ml-1">
                  EPUB {{ book.epub.size }} into
                  {{ formatLanguage(book.language) }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="$auth.$state.loggedIn ? 'md:grid-cols-4' : 'md:grid-cols-3'"
        class="grid grid-cols-1 border-t border-gray-200 divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800 md:divide-y-0 md:divide-x"
      >
        <component
          :is="book.cover ? 'a' : 'span'"
          :href="book.cover ? book.cover.original : null"
          target="_blank"
          rel="noopener noreferrer"
          :class="
            book.cover ? 'header-action_active' : 'header-action_disabled'
          "
          class="header-action"
        >
          <svg-icon name="picture" class="w-5 h-5" />
          <span>Cover</span>
        </component>
        <component
          :is="book.epub ? 'a' : 'span'"
          v-if="book.epub"
          :href="book.epub.download"
          :class="
            book.epub.download
              ? 'header-action_active'
              : 'header-action_disabled'
          "
          class="header-action"
        >
          <svg-icon name="download" class="w-5 h-5" />
          <span class="mx-1">Download</span>
        </component>
        <button
          v-if="$auth.$state.loggedIn"
          type="button"
          class="header-action header-action_active"
          aria-label="Favorite"
          @click="toggleFavorite('book')"
        >
          <svg-icon
            :name="isFavorite ? 'heart-full' : 'heart'"
            :class="isFavorite ? 'text-red-600' : 'text-gray-600'"
            class="w-5 h-5"
          />
          <span>Favorite</span>
        </button>
        <component
          :is="book.webreader ? 'a' : 'span'"
          class="header-action header-action_active"
          aria-label="Favorite"
          :href="book.webreader"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg-icon name="eye" class="w-5 h-5" />
          <span>Webreader</span>
        </component>
      </div>
    </div>
  </section>
</template>

<script>
// import favorites from '~/mixins/FavoriteMixin'
import { formatLanguage } from '~/utils/methods'

export default {
  name: 'BookHeader',
  // mixins: [favorites],
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formatLanguage,
      isFavorite: false,
    }
  },
}
</script>

<style lang="css" scoped>
.header-action {
  @apply flex items-center space-x-1 py-5 text-sm font-semibold transition-colors duration-100 text-center text-gray-600 dark:text-gray-300 justify-center;
}
.header-action_active {
  @apply hover:bg-gray-300 hover:bg-opacity-50 dark:hover:bg-gray-700;
}
.header-action_disabled {
  @apply bg-gray-300 bg-opacity-50;
}
</style> -->
