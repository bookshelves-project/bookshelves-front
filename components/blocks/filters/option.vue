<template>
  <div class="relative inline-block text-left">
    <div v-if="type === 'switch'">
      <fields-toggle v-model="switchValue" :label="label" />
    </div>
    <app-dropdown v-else :align="align" :click-close="clickClose">
      <template #trigger>
        <div
          :id="`${filter}-filter`"
          :title="`${label}`"
          class="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-75 hover:text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md py-2 px-2"
        >
          {{ label }}
          <svg-icon
            name="chevron-right"
            class="shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500 transform rotate-90"
          />
        </div>
      </template>
      <template #content>
        <div
          class="w-48 rounded-md shadow-2xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1" role="none">
            <div v-if="type === 'button'">
              <button
                v-for="option in optionsData"
                :key="option.id"
                class="font-medium text-gray-900 dark:text-gray-100 px-4 py-2 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-700 w-full"
                :class="{
                  'bg-gray-200 dark:bg-gray-600':
                    $route.query[filter] === option.value,
                }"
                @click="filterBy(option.value)"
              >
                {{ option.label }}
              </button>
            </div>
            <div v-else>
              <div v-if="type === 'radio'">
                <fields-radios
                  v-model="radio"
                  :options="optionsData"
                  :name="filter"
                  hover
                  class="font-medium text-gray-900 text-left text-sm w-full"
                />
              </div>
              <div v-else-if="type === 'checkbox'">
                <fields-checkboxes-filter
                  v-model="checkboxes"
                  :options="optionsData"
                  :filter="filter"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-dropdown>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { isEmpty } from 'lodash'
import { pushIfNotExist } from '~/utils/methods'
export default {
  name: 'FiltersOption',
  props: {
    align: {
      type: String,
      default: 'left',
    },
    icon: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    filter: {
      type: String,
      default: '',
    },
    options: {
      type: [Array, Function],
      default: () => [],
    },
    type: {
      type: String,
      default: 'checkbox',
      validator: (val) =>
        ['checkbox', 'radio', 'button', 'switch'].includes(val),
    },
    clickClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      languages: {
        data: [],
      },
      optionsData: [],
      radio: null,
      checkboxes: [],
      switchValue: false,
    }
  },
  computed: {
    ...mapGetters({
      storeQueries: 'filters/queries',
    }),
    currentQuery() {
      return this.$route.query
    },
  },
  watch: {
    checkboxes: {
      handler(newValue) {
        let newQuery = []
        newQuery = newValue.join(',')
        if (isEmpty(newQuery)) {
          this.removeQuery()
        } else {
          this.filterBy(newQuery)
        }
      },
      deep: true,
    },
    switchValue(newValue) {
      this.filterBy(newValue)
    },
    currentQuery(newValue) {
      this.checkCurrentQuery(newValue)
    },
  },
  async created() {
    /**
     * Set optionsData from options
     */
    if (typeof this.options === 'function') {
      this.optionsData = await this.options()
      this.setCheckboxesValues()
    } else {
      this.optionsData = this.options
    }
  },
  mounted() {
    this.checkCurrentQuery(this.currentQuery)
  },
  methods: {
    isEmpty,
    ...mapMutations({
      setQueries: 'filters/setQueries',
      setClear: 'filters/setClear',
    }),
    checkCurrentQuery(query) {
      if (Object.prototype.hasOwnProperty.call(query, this.filter)) {
        if (this.type === 'switch') {
          this.switchValue = JSON.parse(query[this.filter])
        }
      }
    },
    setCheckboxesValues() {
      // eslint-disable-next-line no-unused-vars
      for (const [key, option] of Object.entries(this.optionsData)) {
        if (option.enabled) {
          pushIfNotExist(this.checkboxes, option.value)
        }
      }
    },
    /**
     * Push query, to replace all queries set `replace` to `true`
     *
     * @param {string} newQuery
     * @param {boolean} replace
     */
    filterBy(newQuery, replace = false) {
      newQuery = { [this.filter]: newQuery }
      const query = this.$route.query

      if (replace) {
        this.$router.replace({
          query: { query: newQuery },
        })

        this.updateStore(newQuery)
      } else {
        this.$router.push({
          name: this.$route.name,
          query: { ...query, ...newQuery },
        })

        this.updateStore({ ...query, ...newQuery })
      }
    },
    /**
     * Remove current query
     */
    removeQuery() {
      const query = Object.assign({}, this.$route.query)
      delete query[this.filter]
      this.$router.push({ query })
      this.updateStore(query)
    },
    updateStore(query) {
      this.setQueries({ ...query })
    },
  },
}
</script>
