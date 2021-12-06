<template>
  <div>
    <span
      v-for="item in queries"
      :key="item.id"
    >
      <blocks-filters-chip
        v-if="item.type !== 'page' && item.type !== 'perPage'"
        :filter-type="item.type"
        :filter-value="item.value"
        @remove="remove"
      >
        {{ `${filterName(item.type)}: ${item.value}` }}
      </blocks-filters-chip>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isEmpty } from 'lodash'
export default {
  name: 'FiltesQueries',
  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      queries: []
    }
  },
  computed: {
    ...mapGetters({
      storeQueries: 'filters/queries'
    }),
    queryAvailable () {
      const query = this.$route.query
      return !this.isEmpty(query)
    }
  },
  watch: {
    storeQueries: {
      handler (newValue, oldValue) {
        this.setQueries(newValue)
      },
      deep: true
    }
  },
  methods: {
    isEmpty,
    filterName (query) {
      const filters = {
        'filter[allow_serie]': 'allow series',
        sort: 'sort by',
        'filter[languages]': 'languages',
        'filter[negligible]': 'hide negligible',
        default: 'unknown'
      }
      return filters[query] || query
    },
    setQueries (queries) {
      this.queries = []
      for (const [key, value] of Object.entries(queries)) {
        this.queries.push({ type: key, value })
      }
    },
    remove (type) {
      try {
        const query = Object.assign({}, this.$route.query)
        delete query[type]
        this.$router.replace({ query })

        this.setQueries(query)
      } catch (error) {
        console.log('Error on replace')
      }
    }
  }
}
</script>
