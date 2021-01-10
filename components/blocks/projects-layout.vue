<template>
  <main class="relative z-0 flex-1 focus:outline-none" tabindex="0">
    <!-- Page title & actions -->
    <page-title />
    <!-- Pinned projects -->
    <div class="hidden px-4 mt-6 sm:px-6 lg:px-8">
      <h2 class="text-xs font-medium tracking-wide text-gray-500 uppercase">
        Pinned Projects
      </h2>
      <ul
        class="grid grid-cols-1 gap-4 mt-3 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <project-card />
      </ul>
    </div>

    <!-- Projects list (only on smallest breakpoint) -->
    <div class="mt-10 sm:hidden">
      <div class="px-4 sm:px-6">
        <h2 class="text-xs font-medium tracking-wide text-gray-500 uppercase">
          Projects
        </h2>
      </div>
      <ul class="mt-3 border-t border-gray-200 divide-y divide-gray-100">
        <li>
          <a
            href="#"
            class="flex items-center justify-between px-4 py-4 group hover:bg-gray-50 sm:px-6"
          >
            <span class="flex items-center space-x-3 truncate">
              <span
                class="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-pink-600"
                aria-hidden="true"
              ></span>
              <span class="text-sm font-medium leading-6 truncate">
                GraphQL API
                <span class="font-normal text-gray-500 truncate"
                  >in Engineering</span
                >
              </span>
            </span>
            <!-- Heroicon name: chevron-right -->
            <svg
              class="w-5 h-5 ml-4 text-gray-400 group-hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>

        <!-- More project rows... -->
      </ul>
    </div>

    <!-- Projects table (small breakpoint and up) -->
    <div class="min-h-screen">
      <div v-if="!isLoading" class="hidden py-2 mt-8 sm:block">
        <div class="flex justify-end px-4 py-3 space-x-2">
          <button
            :class="$store.state.booksView === 'list' ? 'bg-gray-200' : ''"
            class="view-btn"
            @click="switchBooksView()"
          >
            <icon name="view-list" />
          </button>
          <button
            :class="$store.state.booksView === 'grid' ? 'bg-gray-200' : ''"
            class="view-btn"
            @click="switchBooksView()"
          >
            <icon name="view-grid" />
          </button>
        </div>
        <transition name="fade">
          <books-table v-if="$store.state.booksView === 'list'" />
          <books-grid v-else class="px-5" />
        </transition>
      </div>
      <loading v-else />
    </div>
    <default-footer />
  </main>
</template>

<script>
import DefaultFooter from '../layout/default-footer.vue'
import BooksGrid from './books-grid.vue'
import BooksTable from './books-table.vue'
import PageTitle from './page-title.vue'
import ProjectCard from './project-card.vue'
export default {
  name: 'ProjectsLayout',
  components: { ProjectCard, BooksTable, BooksGrid, DefaultFooter, PageTitle },
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    const booksView = localStorage.getItem('books-view')
    if (booksView) {
      this.$store.commit('setBooksView', booksView)
    }
    this.isLoading = false
  },
  methods: {
    switchBooksView() {
      if (this.$store.state.booksView === 'list') {
        this.$store.commit('setBooksView', 'grid')
        localStorage.setItem('books-view', 'grid')
      } else {
        this.$store.commit('setBooksView', 'list')
        localStorage.setItem('books-view', 'list')
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.view-btn {
  @apply p-1 transition-colors duration-300 rounded-md hover:bg-gray-100;
}
</style>
