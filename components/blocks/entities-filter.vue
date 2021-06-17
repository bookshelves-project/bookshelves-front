<template>
  <div class="relative md:static md:mb-0">
    <div class="flex space-x-6">
      <div class="h-10">
        <transition name="fade">
          <button
            v-if="filterEnabled"
            id="options-menu"
            type="button"
            class="inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 group dark:bg-gray-800 dark:border-gray-700"
            aria-haspopup="true"
            aria-expanded="true"
            aria-label="Delete"
            @click="clearFilter"
          >
            <svg-icon
              name="trash"
              class="w-5 h-5 text-red-600 transition-colors duration-100 group-hover:text-red-700"
            />
          </button>
        </transition>
      </div>
      <dropdown align="right" :width="48">
        <template #trigger>
          <button
            id="series-filter"
            title="Series filter"
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-100 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
            aria-haspopup="true"
            aria-expanded="true"
            aria-label="Filter"
            @click="openedFilter = !openedFilter"
          >
            <svg-icon name="collection" class="w-6 h-6" />
            <svg-icon name="arrow-chevron-bottom" class="w-5 h-5 ml-1" />
          </button>
        </template>
        <template #content>
          <div class="py-1">
            <div
              class="block w-full px-4 py-2 text-sm font-semibold text-left text-gray-800 dark:text-gray-200"
            >
              Series filter
            </div>
            <button
              v-for="serie in series"
              :key="serie.slug"
              :class="{ 'bg-gray-100': $route.query.serie === serie.slug }"
              type="button"
              class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
              role="menuitem"
              :aria-label="`Filter by ${serie.name}`"
              @click="filterBy('serie', serie.slug)"
            >
              {{ serie.name }}
            </button>
          </div>
        </template>
      </dropdown>
      <dropdown align="right" :width="48">
        <template #trigger>
          <button
            id="languages-filter"
            title="Languages filter"
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-100 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
            aria-haspopup="true"
            aria-expanded="true"
            aria-label="Filter"
            @click="openedFilter = !openedFilter"
          >
            <svg-icon name="languages" class="w-6 h-6" />
            <svg-icon name="arrow-chevron-bottom" class="w-5 h-5 ml-1" />
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
              :key="lang.meta.slug"
              :class="{ 'bg-gray-100': $route.query.lang === lang.meta.slug }"
              type="button"
              class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
              role="menuitem"
              :aria-label="`Filter by ${lang.name}`"
              @click="filterBy('lang', lang.meta.slug)"
            >
              {{ lang.name }}
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
      langs: [],
      series: [
        {
          slug: 'false',
          name: 'No series',
        },
        {
          slug: 'true',
          name: 'Only series',
        },
      ],
    }
  },
  mounted() {
    if (
      this.$route.query &&
      Object.keys(this.$route.query).length !== 0 &&
      this.$route.query.constructor === Object
    ) {
      this.filterEnabled = true
    }
  },
  async created() {
    const languages = await this.$axios.$get('/languages')
    this.langs = languages.data
  },
  methods: {
    closeOpenedFilter() {
      this.openedFilter = false
    },
    clearFilter() {
      this.filterEnabled = false
      this.$emit('filter', null)
    },
    filterBy(type, data) {
      this.filterEnabled = true
      this.closeOpenedFilter()
      this.$emit('filter', { type, data })
    },
  },
}
</script>

<style lang="postcss" scoped></style>
