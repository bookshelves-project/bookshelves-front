<template>
  <div class="flex">
    <transition name="fade">
      <app-button
        v-if="!disabled"
        :color="`secondary`"
        class="w-full max-w-lg mx-auto"
        :disabled="disabled"
        align="center"
        @click="load"
      >
        <div class="flex items-center space-x-2 relative">
          <div class="absolute top-1/2 -translate-y-1/2 transform -left-5">
            <transition name="fade">
              <loading v-if="pending" class="w-5 h-5" />
              <span v-else class="w-5 h-5"></span>
            </transition>
          </div>
          <span v-if="!disabled">Load more</span>
          <span v-else>End</span>
        </div>
      </app-button>
    </transition>
  </div>
</template>

<script>
import qs from 'qs'
import { objectIsEmpty } from '~/plugins/utils/methods'

export default {
  name: 'LoadMore',
  props: {
    lastPage: {
      type: Number,
      default: 0,
    },
    endpoint: {
      type: String,
      default: 'books',
    },
    entities: {
      type: Array,
      default: () => [],
    },
    queries: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      pending: false,
      currentPage: 1,
      disabled: false,
      objectIsEmpty,
    }
  },
  watch: {
    $route(to, from) {
      this.disabled = false
    },
  },
  mounted() {
    if (this.currentPage === this.lastPage) {
      this.disabled = true
    }
  },
  methods: {
    async load() {
      this.currentPage++
      if (this.currentPage <= this.lastPage) {
        await this.apiCall({ page: this.currentPage }, this.endpoint)
      } else {
        this.disabled = true
      }
    },
    async apiCall(data, entity) {
      this.pending = true
      const queries = {
        page: data.page,
      }
      if (!objectIsEmpty(this.queries)) {
        Object.assign(queries, this.queries)
      }

      const newEntities = await this.$axios.$get(
        `/${entity}?${qs.stringify(queries)}`
      )
      if (newEntities.meta.current_page === newEntities.meta.last_page) {
        this.disabled = true
      }

      let entities = [...this.entities]
      entities = this.entities.concat(newEntities.data)
      this.$emit('load', entities)

      this.pending = false
    },
  },
}
</script>
