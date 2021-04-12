<template>
  <!-- Welcome panel -->
  <section aria-labelledby="book-header">
    <div class="overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800">
      <h2 id="profile-overview-title" class="sr-only">Profile Overview</h2>
      <div class="p-6 bg-white dark:bg-gray-800">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:flex sm:space-x-5">
            <div class="flex-shrink-0">
              <img
                v-lazy="book.picture.base"
                :alt="book.title"
                class="object-cover w-20 h-20 mx-auto rounded-full"
              />
            </div>
            <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p
                class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-100"
              >
                {{ book.title }}
              </p>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
                {{ book.serie.title }}, vol. {{ book.volume }}
              </p>
              <p
                v-if="book.epub"
                class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                <svg-icon name="epub" class="w-4 h-4" />
                <span class="ml-1"
                  >EPUB {{ book.epub.size }} into
                  {{ $getLanguage(book.language) }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="$auth.$state.loggedIn ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        class="grid grid-cols-1 border-t border-gray-200 divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800 md:divide-y-0 md:divide-x"
      >
        <component
          :is="book.picture.original ? 'a' : 'span'"
          :href="book.picture.original"
          target="_blank"
          rel="noopener noreferrer"
          :class="
            book.picture.original
              ? 'header-action_active'
              : 'header-action_disabled'
          "
          class="header-action"
        >
          <svg-icon name="picture" class="w-5 h-5" />
          <span>Cover</span>
        </component>
        <component
          :is="book.epub ? 'a' : 'span'"
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
          class="header-action header-action_active"
          @click="toggleFavorite('book')"
        >
          <svg-icon
            name="heart"
            :class="isFavorite ? 'text-red-600' : 'text-gray-600'"
            class="w-5 h-5"
          />
          <span>Favorite</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import favorites from '~/mixins/favorites'

export default {
  name: 'BookHeader',
  mixins: [favorites],
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isFavorite: false,
    }
  },
}
</script>

<style lang="postcss" scoped>
.header-action {
  @apply flex items-center space-x-1 py-5 text-sm font-semibold transition-colors duration-100 text-center text-gray-600 dark:text-gray-300 justify-center;
}
.header-action_active {
  @apply hover:bg-gray-300 hover:bg-opacity-50 dark:hover:bg-gray-700;
}
.header-action_disabled {
  @apply bg-gray-300 bg-opacity-50;
}
</style>
