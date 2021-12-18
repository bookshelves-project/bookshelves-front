<template>
  <div>
    <section aria-labelledby="filter-heading">
      <h2 id="filter-heading" class="sr-only">Filters</h2>

      <div class="relative z-10 border-b border-gray-200 dark:border-gray-700 pb-2">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="relative flex items-center text-left">
            <blocks-filters-option
              v-if="sort.length"
              filter="sort"
              label="Sort"
              :options="sort"
              type="button"
              click-close
            />
            <button
              v-if="$route.query.sort"
              class="p-2 ml-1 rounded-md transition-colors duration-75 hover:bg-gray-200 dark:hover:bg-gray-700"
              @click="reverseSort($route.query.sort.includes('-'))"
            >
              <svg-icon
                name="arrow-sm-right"
                class="w-5 h-5 text-gray-500 transform"
                :class="
                  $route.query.sort.includes('-') ? '-rotate-90' : 'rotate-90'
                "
              />
            </button>
          </div>
          <button
            type="button"
            class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
          >
Filters
</button>

          <div class="hidden sm:block">
            <div class="flow-root">
              <div class="flex items-center space-x-4">
                <blocks-filters-option
                  v-if="hasSerie"
                  filter="filter[allow_serie]"
                  label="Allow series"
                  :options="seriesOptions"
                  type="switch"
                />
                <blocks-filters-option
                  v-if="negligible"
                  filter="filter[negligible]"
                  label="Negligible"
                  :options="negligibleOptions"
                  type="button"
                  align="right"
                  click-close
                />
                <blocks-filters-option
                  v-if="languages"
                  filter="filter[languages]"
                  label="Languages"
                  type="checkbox"
                  :options="languagesOptions"
                  align="right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto py-2 sm:flex sm:items-center">
        <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Filters
          <span class="sr-only">, active</span>
        </h3>

        <div
          aria-hidden="true"
          class="hidden w-px h-10 bg-gray-300 dark:bg-gray-700 sm:block sm:ml-4"
        />

        <div class="mt-2 sm:mt-0 sm:ml-4">
          <div class="-m-1 flex flex-wrap items-center">
            <div v-if="!queryAvailable" class="italic text-gray-300">None.</div>
            <blocks-filters-clear :paginate="paginate" />
            <blocks-filters-queries />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { isEmpty } from 'lodash'
export default {
  name: 'Filters',
  props: {
    hasSerie: {
      type: Boolean,
      default: false
    },
    languages: {
      type: Boolean,
      default: false
    },
    negligible: {
      type: Boolean,
      default: false
    },
    paginate: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      seriesOptions: [
        {
          label: 'No series',
          value: 'false'
        },
        {
          label: 'Only series',
          value: 'true'
        },
        {
          label: 'Any',
          value: 'any'
        }
      ],
      negligibleOptions: [
        {
          label: 'All',
          value: 'true'
        },
        {
          label: 'Hide (default)',
          value: 'false'
        }
      ]
    }
  },
  computed: {
    queryAvailable() {
      const query = this.$route.query
      return !this.isEmpty(query)
    }
  },
  mounted() {
    // if (this.paginate && Object.keys(this.$route.query).length === 0) {
    //   this.$router.push({
    //     query: {
    //       perPage: '32',
    //       page: '1'
    //     }
    //   })
    // }
  },
  methods: {
    isEmpty,
    ...mapMutations({
      setQueries: 'filters/setQueries'
    }),
    async languagesOptions() {
      const languages = await this.$axios.$get('/languages')
      const query = this.$route.query
      const queryLanguages = query['filter[languages]']
      const languagesData = []
      languages.data.forEach((el) => {
        languagesData.push({
          label: el.name,
          value: el.meta.slug,
          query: { 'filter[languages]': el.meta.slug },
          enabled: queryLanguages
            ? queryLanguages.includes(el.meta.slug)
            : false
        })
      })
      return languagesData
    },
    reverseSort(asc = false) {
      let newQuery = this.$route.query
      const order = asc ? '' : '-'
      let sort = `${order}${newQuery.sort}`
      if (asc) {
        sort = newQuery.sort.replace('-', '')
      }

      newQuery = { sort }

      let query = {}
      query = { ...this.$route.query, ...newQuery }
      this.$router.replace({ query: { ...query } })

      this.setQueries({ ...query })
    }
  }
}
</script>
