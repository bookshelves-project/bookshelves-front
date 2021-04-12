<template>
  <div class="relative md:static md:mb-0">
    <div class="py-8 md:py-0"></div>
    <div class="absolute top-0 md:top-5 md:right-28 right-24">
      <transition name="fade">
        <button
          v-if="filterEnabled"
          id="options-menu"
          type="button"
          class="inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 group dark:bg-gray-800 dark:border-gray-700"
          aria-haspopup="true"
          aria-expanded="true"
          @click="clearFilter"
        >
          <icon-trash
            class="w-5 h-5 text-red-600 transition-colors duration-100 group-hover:text-red-700"
          />
        </button>
      </transition>
    </div>
    <div class="absolute top-0 right-0 md:top-5 md:right-5">
      <dropdown align="right" :width="48">
        <template #trigger>
          <button
            id="options-menu"
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
            aria-haspopup="true"
            aria-expanded="true"
            @click="openedFilter = !openedFilter"
          >
            <icon-filter />
            <!-- Heroicon name: solid/chevron-down -->
            <svg
              class="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </template>
        <template #content>
          <div class="py-1">
            <div
              class="block w-full px-4 py-2 text-sm font-semibold text-left text-gray-800 dark:text-gray-200"
            >
              Languages filter
            </div>
            <button
              v-for="lang in langs"
              :key="lang.id"
              :class="{ 'bg-gray-100': $route.query.lang === lang.id }"
              class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
              role="menuitem"
              @click="filterByLang(lang.id)"
            >
              {{ lang.label }}
            </button>
          </div>
        </template>
      </dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/special/dropdown-template.vue'
export default {
  name: 'EntitiesFilter',
  // eslint-disable-next-line vue/no-unused-components
  components: { Dropdown },
  data() {
    return {
      openedFilter: false,
      filterEnabled: false,
      langs: [
        { label: 'French', id: 'fr' },
        { label: 'English', id: 'en' },
      ],
    }
  },
  methods: {
    closeOpenedFilter() {
      this.openedFilter = false
    },
    clearFilter() {
      this.filterEnabled = false
      this.$emit('filter', null)
    },
    filterByLang(lang) {
      this.filterEnabled = true
      this.closeOpenedFilter()
      this.$emit('filter', lang)
    },
  },
}
</script>

<style lang="postcss" scoped></style>
