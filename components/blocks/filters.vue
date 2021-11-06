<template>
  <div>
    <section aria-labelledby="filter-heading">
      <h2 id="filter-heading" class="sr-only">Filters</h2>

      <div class="relative z-10 border-b border-gray-200 pb-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="relative inline-block text-left">
            <!-- <blocks-filters-option-sort
              v-if="sort"
              filter="sort"
              label="Sort"
              :options="sortOptions"
              @filter="filter"
            /> -->
            <blocks-filters-option
              v-if="sort"
              filter="sort"
              label="Sort"
              :options="sortOptions"
              sort
              click-close
              @filter="filter"
            />
          </div>
          <button
            type="button"
            class="
              inline-block
              text-sm
              font-medium
              text-gray-700
              hover:text-gray-900
              sm:hidden
            "
          >
            Filters
          </button>

          <div class="hidden sm:block">
            <div class="flow-root">
              <div class="flex items-center space-x-4">
                <blocks-filters-option
                  v-if="hasSerie"
                  filter="has_serie"
                  label="Series"
                  :options="seriesOptions"
                  radio
                  align="right"
                  click-close
                  @filter="filter"
                />
                <blocks-filters-option
                  v-if="languages"
                  filter="languages"
                  label="Languages"
                  :options="languagesOptions"
                  align="right"
                  @filter="filter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="max-w-7xl mx-auto py-3 sm:flex sm:items-center">
          <h3
            class="text-xs font-semibold uppercase tracking-wide text-gray-500"
          >
            Filters
            <span class="sr-only">, active</span>
          </h3>

          <div
            aria-hidden="true"
            class="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"
          ></div>

          <div class="mt-2 sm:mt-0 sm:ml-4">
            <div class="-m-1 flex flex-wrap items-center">
              <blocks-filters-clear />
              <blocks-filters-chip />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    hasSerie: {
      type: Boolean,
      default: false,
    },
    languages: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sortOptions: [
        {
          title: "By series' title (default)",
          query: { sort: 'title_sort' },
          default: true,
        },
        {
          title: 'By title',
          query: { sort: 'title' },
        },
        {
          title: 'Most recently published',
          query: { sort: '-date' },
        },
        {
          title: 'Newest uploaded',
          query: { sort: '-created_at' },
        },
      ],
      seriesOptions: [
        {
          title: 'No series',
          query: { 'filter[has_serie]': false },
        },
        {
          title: 'Only series',
          query: { 'filter[has_serie]': true },
        },
        {
          title: 'Any',
          query: { 'filter[has_serie]': 'any' },
          default: true,
        },
      ],
    }
  },
  methods: {
    async languagesOptions() {
      const languages = await this.$axios.$get('/languages')
      const languagesData = []
      languages.data.forEach((el) => {
        languagesData.push({
          title: el.name,
          slug: el.meta.slug,
          query: { 'filter[languages]': el.meta.slug },
        })
      })
      return languagesData
    },
    filter(newQuery) {
      // console.log(newQuery)
      const query = { ...this.$route.query, ...newQuery }
      this.$emit('filter', query)
    },
  },
}
</script>
