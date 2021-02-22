<template>
  <div>
    <div
      v-click-outside="closeOpenedFilter"
      class="relative inline-block text-left"
    >
      <div>
        <button
          id="options-menu"
          type="button"
          class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
      </div>
      <transition name="fade">
        <div
          v-if="openedFilter"
          class="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div class="py-1">
            <div
              class="block w-full px-4 py-2 text-sm font-semibold text-left text-gray-800"
            >
              Languages filter
            </div>
            <button
              v-for="lang in langs"
              :key="lang.id"
              :class="{ 'bg-gray-100': $route.query.lang === lang.id }"
              class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click="filterByLang(lang.id)"
            >
              {{ lang.label }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import iconFilter from '../icons/icon-filter.vue'
export default {
  name: 'EntitiesFilter',
  components: { iconFilter },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      openedFilter: false,
      langs: [
        { label: 'None', id: null },
        { label: 'French', id: 'fr' },
        { label: 'English', id: 'en' },
      ],
    }
  },
  methods: {
    closeOpenedFilter() {
      this.openedFilter = false
    },
    filterByLang(lang) {
      this.closeOpenedFilter()
      this.$emit('filter', lang)
    },
  },
}
</script>

<style lang="postcss" scoped></style>
