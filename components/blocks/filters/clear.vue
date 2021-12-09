<template>
  <div>
    <transition name="fade">
      <button
        v-if="queryAvailable"
        class="
          hover:bg-gray-200
          dark:hover:bg-gray-800
          transition-colors
          duration-75
          py-2
          px-2
          rounded-md
          group
          inline-flex
          justify-center
          text-sm
          font-medium
          items-center
        "
        type="button"
        @click="clearAll"
      >
        <svg-icon
          name="trash"
          class="
            w-4
            h-4
            text-gray-700
            dark:text-gray-300
            group-hover:text-gray-900
            dark:group-hover:text-gray-100
          "
        />
        <span
          class="
            ml-2
            text-gray-700
            dark:text-gray-300
            group-hover:text-gray-900
            dark:group-hover:text-gray-100
          "
        >
          Clear all
        </span>
      </button>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { isEmpty } from 'lodash'
export default {
  name: 'FilterClear',
  props: {
    paginate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filterEnabled: false
    }
  },
  computed: {
    ...mapGetters({
      clear: 'filters/clear'
    }),
    queryAvailable () {
      const query = this.$route.query
      return !this.isEmpty(query)
    }
  },
  methods: {
    isEmpty,
    ...mapMutations({
      setQueries: 'filters/setQueries',
      setClear: 'filters/setClear'
    }),
    clearAll () {
      this.setQueries({})
      const query = {
        perPage: '32',
        page: '1'
      }
      this.$router.replace({
        name: this.$route.name,
        query: this.paginate ? query : {}
      })
    }
  }
}
</script>
