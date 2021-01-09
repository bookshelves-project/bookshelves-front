<template>
  <!-- <tr v-if="book" :class="id % 2 ? 'bg-gray-100' : 'bg-gray-50'"> -->
  <nuxt-link
    v-if="book"
    :to="{
      name: 'book-slug',
      params: { author: book.author.slug, slug: book.slug },
    }"
    :class="id % 2 ? 'bg-gray-100' : 'bg-gray-50'"
    class="table-row align-middle transition-colors duration-300 hover:bg-gray-200"
  >
    <td class="px-6 py-3 text-sm font-medium text-gray-500">
      <div class="w-16 h-full">
        <nuxt-image
          v-if="book.coverPath"
          :alt="book.title"
          :src="book.coverPath"
          class="cover"
          placeholder
        />
        <nuxt-image
          v-else
          src="/images/no-cover.webp"
          alt="bookshelves-default"
          class="bg-gray-600 bg-opacity-25 cover"
          placeholder
        />
      </div>
    </td>
    <td class="px-6 py-3 text-sm font-medium text-gray-500">
      {{ book.title }}
    </td>
    <td
      class="hidden px-6 py-3 text-sm font-medium text-gray-500 sm:table-cell"
    >
      {{ book.author.name }}
    </td>
    <td
      class="hidden px-6 py-3 text-sm text-gray-500 lg:table-cell whitespace-nowrap"
    >
      {{ book.serie }}
    </td>
    <td
      class="hidden px-6 py-3 text-sm text-gray-500 lg:table-cell whitespace-nowrap"
    >
      <span v-if="book.serie">N°{{ book.serieNumber }}</span>
    </td>
    <td class="pr-6">
      <div class="relative z-50 flex items-center justify-end">
        <button
          id="project-options-menu-0"
          v-click-outside="closeProjectRowOpened"
          aria-haspopup="true"
          type="button"
          class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          @click="projectRowOpened = !projectRowOpened"
        >
          <span class="sr-only">Open options</span>
          <!-- Heroicon name: dots-vertical -->
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
            />
          </svg>
        </button>
        <transition name="fade">
          <div
            v-if="projectRowOpened"
            :class="
              projectRowOpened ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            "
            class="absolute top-0 z-10 w-48 mx-3 mt-1 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg right-7 ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="project-options-menu-0"
          >
            <div class="py-1" role="none">
              <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-gray-700 group hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <!-- Heroicon name: pencil-alt -->
                <svg
                  class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                Edit
              </a>
              <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-gray-700 group hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <!-- Heroicon name: duplicate -->
                <svg
                  class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"
                  />
                  <path
                    d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"
                  />
                </svg>
                Duplicate
              </a>
              <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-gray-700 group hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <!-- Heroicon name: user-add -->
                <svg
                  class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                  />
                </svg>
                Share
              </a>
            </div>
            <div class="py-1" role="none">
              <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-gray-700 group hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <!-- Heroicon name: trash -->
                <svg
                  class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Delete
              </a>
            </div>
          </div>
        </transition>
      </div>
    </td>
  </nuxt-link>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'ProjectRow',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    book: {
      type: Object,
      default: () => {},
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      projectRowOpened: false,
    }
  },
  methods: {
    closeProjectRowOpened(event) {
      this.projectRowOpened = false
    },
  },
}
</script>

<style lang="postcss" scoped>
.cover {
  @apply object-cover w-full h-full rounded-md;
}
</style>
