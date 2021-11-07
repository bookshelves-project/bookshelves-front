<template>
  <div class="relative inline-block text-left">
    <app-dropdown :align="align" :click-close="clickClose">
      <template #trigger>
        <div
          :id="`${filter}-filter`"
          :title="`${label}`"
          class="
            group
            inline-flex
            justify-center
            text-sm
            font-medium
            text-gray-700
            transition-colors
            duration-75
            hover:text-gray-900 hover:bg-gray-200
            rounded-md
            py-2
            px-2
          "
        >
          {{ label }}
          <svg-icon
            name="chevron-right"
            class="
              flex-shrink-0
              -mr-1
              ml-1
              h-5
              w-5
              text-gray-400
              group-hover:text-gray-500
              transform
              rotate-90
            "
          />
        </div>
      </template>
      <template #content>
        <div
          class="
            w-48
            rounded-md
            shadow-2xl
            bg-white
            ring-1 ring-black ring-opacity-5
            focus:outline-none
          "
        >
          <div class="py-1" role="none">
            <div v-if="type === 'button'">
              <button
                v-for="option in formOptions"
                :key="option.id"
                class="
                  font-medium
                  text-gray-900
                  px-4
                  py-2
                  text-left text-sm
                  hover:bg-gray-200
                  w-full
                "
                :class="{
                  'bg-gray-200': $route.query.sort === option.query.sort,
                }"
                @click="filterBy(option.query)"
              >
                {{ option.title }}
              </button>
            </div>
            <div v-else>
              <div v-if="type === 'radio'">
                <fields-radios
                  v-model="radioValue"
                  :options="radioOptions"
                  name="series"
                  hover
                  class="font-medium text-gray-900 text-left text-sm w-full"
                />
              </div>
              <div v-else-if="type === 'checkbox'">
                <fields-checkbox
                  v-for="option in formOptions"
                  :key="option.id"
                  v-model="form[slugify(option.slug)]"
                  :label="option.title"
                  :name="slugify(option.title)"
                  class="
                    font-medium
                    text-gray-900 text-left text-sm
                    w-full
                    transition-colors
                    duration-75
                    hover:bg-gray-200
                    py-2
                    px-2
                  "
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
import { isEmpty } from 'lodash'
import { capitalize, slugify } from '@/plugins/utils/methods'
export default {
  name: 'FiltersOption',
  props: {
    filter: {
      type: String,
      default: '',
    },
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
    options: {
      type: [Array, Function],
      default: () => [],
    },
    type: {
      type: String,
      default: 'checkbox',
      validator: (val) => ['checkbox', 'radio', 'button'].includes(val),
    },
    clickClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {},
      formOptions: [],
      radioValue: null,
      radioOptions: [],
      currentQuery: null,
      currentQueryType: null,
    }
  },
  watch: {
    radioValue(newValue) {
      if (this.type === 'radio' && newValue !== undefined) {
        this.currentQueryType = Object.keys(this.formOptions[0].query)[0]
        if (newValue === 'any') {
          this.filterBy({
            override: true,
            type: this.currentQueryType,
          })
        } else {
          const query = { [this.currentQueryType]: newValue }
          this.filterBy(query)
        }
      }
    },
    form: {
      handler() {
        if (this.type === 'checkbox') {
          /**
           * Get options on true
           */
          const options = []
          for (const [key, value] of Object.entries(this.form)) {
            if (value) {
              options.push(key)
            }
          }
          /**
           * Send options
           */
          if (this.formOptions[0]) {
            this.currentQueryType = Object.keys(this.formOptions[0].query)[0]
          }
          if (options.length) {
            const query = { [this.currentQueryType]: options.join(',') }
            this.filterBy(query)
          } else if (!isEmpty(this.$route.query[this.currentQueryType])) {
            this.filterBy({
              override: true,
              type: this.currentQueryType,
            })
          }
        }
      },
      deep: true,
    },
  },
  async created() {
    this.formOptions = this.options
    if (this.type === 'radio') {
      /**
       * Set radios options
       */
      this.setRadiosOptions()
    }
    if (this.type === 'checkbox') {
      /**
       * Set checkboxes options
       */
      if (typeof this.options === 'function') {
        this.formOptions = await this.options()
      }
      this.setCheckboxesOptions()
    }
  },
  methods: {
    capitalize,
    slugify,
    isEmpty,
    filterBy(newQuery) {
      let query = {}
      if (typeof newQuery === 'object' && newQuery.override) {
        // reset current query
        const query = Object.assign({}, this.$route.query)
        delete query[newQuery.type]
        this.$router.replace({ query })
      } else {
        query = { ...this.$route.query, ...newQuery }

        this.$router.replace({ query: { ...query } })
      }
    },
    setCheckboxesOptions() {
      try {
        const form = {}
        this.formOptions.forEach((el) => {
          this.currentQueryType = Object.keys(el.query)[0]
          let currentQuery = this.$route.query[this.currentQueryType]
          if (currentQuery !== undefined) {
            currentQuery = currentQuery.split(',')
            this.currentQuery = currentQuery
            form[el.slug] = this.currentQuery.includes(el.slug)
          }
        })
        this.form = form
      } catch (error) {
        console.error(error)
      }
    },
    setRadiosOptions() {
      try {
        this.formOptions.forEach((el) => {
          this.currentQueryType = Object.keys(el.query)[0]

          this.radioOptions.push({
            label: el.title,
            value: Object.values(el.query)[0],
          })
        })

        this.currentQuery = this.$route.query[this.currentQueryType]
        this.radioValue = this.currentQuery
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
