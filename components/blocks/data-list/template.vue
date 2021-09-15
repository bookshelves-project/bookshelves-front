<template>
  <div class="bg-white rounded-md shadow dark:bg-gray-800">
    <div
      class="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6"
    >
      <h3 class="flex items-center text-lg font-medium leading-6 text-gray-900">
        <svg-icon
          v-if="icon"
          :name="icon"
          class="w-6 h-6 text-gray-400 dark:text-gray-300"
        />
        <div :class="icon ? 'ml-2' : ''">
          {{ title }}
        </div>
      </h3>
      <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ subtitle }}
      </div>
    </div>
    <div v-if="isLoading">
      <blocks-data-list-card-loading />
    </div>
    <div v-else>
      <ul
        v-if="list.length"
        class="
          divide-y divide-gray-200
          dark:divide-gray-700
          max-h-[50rem]
          overflow-x-hidden overflow-y-auto
          scrollbar-thin
        "
      >
        <blocks-data-list-card
          v-for="(data, id) in list"
          :key="id"
          :data="data"
          :class="id === list.length - 1 ? 'rounded-b-md' : ''"
          :can-delete="canDelete"
          @destroy="destroy"
        ></blocks-data-list-card>
      </ul>
      <div v-else class="flex flex-wrap items-center p-4 text-gray-400">
        {{ emptyList }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataListTemplate',
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    emptyList: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: '',
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      isLoading: true,
    }
  },
  watch: {
    dataList(newValue, oldValue) {
      this.list = newValue
    },
    loading(newValue, oldValue) {
      this.isLoading = this.loading
    },
  },
  mounted() {
    this.list = this.dataList
    this.isLoading = this.loading
  },
  methods: {
    destroy(data) {
      const list = this.list.filter((item) => item.meta.slug !== data.meta.slug)
      this.list = list
      this.$emit('destroy', { data })
    },
  },
}
</script>

<style lang="postcss" scoped></style>
