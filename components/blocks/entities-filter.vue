<template>
  <div class="relative md:static md:mb-0">
    <div class="flex space-x-6">
      <div class="h-10">
        <transition name="fade">
          <button
            v-if="filterEnabled"
            id="options-menu"
            type="button"
            class="
              inline-flex
              justify-center
              w-full
              px-2
              py-2
              text-sm
              font-medium
              text-gray-700
              bg-white
              border border-gray-300
              rounded-md
              shadow-sm
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-gray-100
              focus:ring-primary-500
              group
              dark:bg-gray-800 dark:border-gray-700
            "
            aria-haspopup="true"
            aria-expanded="true"
            aria-label="Delete"
            @click="clearFilter"
          >
            <svg-icon
              name="trash"
              class="
                w-5
                h-5
                text-red-600
                transition-colors
                duration-100
                group-hover:text-red-700
              "
            />
          </button>
        </transition>
      </div>
      <blocks-filter-option
        v-if="serie"
        filter="serie"
        icon="collection"
        :options="series"
        @filter="filter"
      />
      <blocks-filter-option
        v-if="lang"
        filter="lang"
        icon="languages"
        :options="langs"
        meta="meta.slug"
        @filter="filter"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntitiesFilter',
  props: {
    serie: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openedFilter: false,
      filterEnabled: false,
      langs: [],
      series: [
        {
          meta: {
            slug: 'false',
          },
          name: 'No series',
        },
        {
          meta: {
            slug: 'true',
          },
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
    filter({ type, data }) {
      this.filterEnabled = true
      this.$emit('filter', { type, data })
    },
  },
}
</script>

<style lang="postcss" scoped></style>
