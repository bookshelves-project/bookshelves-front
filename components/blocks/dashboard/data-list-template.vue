<template>
  <div class="pb-2 bg-white rounded-md shadow dark:bg-gray-800">
    <div
      class="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6"
    >
      <h3 class="flex items-center text-lg font-medium leading-6 text-gray-900">
        <slot name="icon" />
        <div class="ml-2">
          {{ title }}
        </div>
      </h3>
      <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ subtitle }}
      </div>
    </div>
    <ul
      v-if="list.length"
      class="divide-y divide-gray-200 dark:divide-gray-700"
    >
      <li
        v-for="data in list"
        :key="data.id"
        class="relative grid grid-cols-6 bg-white dark:bg-gray-800"
      >
        <nuxt-link
          :to="{
            name: `${data.meta.for}s-slug`,
            params: {
              author: data.meta.author,
              slug: data.meta.slug,
            },
          }"
          :title="data.title"
          :aria-label="data.title"
          class="flex items-center w-full col-span-5 py-5 pl-4 pr-1 space-x-6 hover:bg-gray-50 dark:hover:bg-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
        >
          <div class="flex-shrink-0">
            <img
              :src="data.picture"
              class="object-cover w-16 h-16 rounded-full"
              :alt="data.title"
              loading="lazy"
            />
          </div>
          <div>
            <div class="flex justify-between space-x-3">
              <div class="flex-1 min-w-0">
                <div class="block focus:outline-none">
                  <p
                    class="text-base font-semibold text-gray-900 truncate dark:text-gray-100"
                  >
                    {{ data.title }}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {{ capitalize(data.meta.for) }}
                  </p>
                </div>
              </div>
              <div class="hidden lg:block">
                <time
                  v-if="data.createdAt && !data.updatedAt"
                  :datetime="data.createdAt"
                  class="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
                  >{{ $formatDate(data.createdAt) }}</time
                >
                <time
                  v-if="data.updatedAt"
                  :datetime="data.updatedAt"
                  class="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
                  >{{ $formatDate(data.updatedAt) }}</time
                >
              </div>
            </div>
            <div v-if="data.text" class="hidden mt-1 lg:block">
              <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {{ data.text }}
              </p>
            </div>
          </div>
        </nuxt-link>
        <div class="col-span-1">
          <button
            type="button"
            class="flex w-full h-full px-4 py-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            title="Delete"
            aria-label="Delete"
            @click="deleted(data)"
          >
            <svg-icon
              name="trash"
              class="w-6 h-6 m-auto text-gray-400 dark:text-gray-300"
            />
          </button>
        </div>
      </li>
    </ul>
    <div v-else class="flex flex-wrap items-center p-4 text-gray-400">
      {{ emptyList }}
    </div>
  </div>
</template>

<script>
import { capitalize } from '~/plugins/utils/methods'

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
  },
  data() {
    return {
      list: [],
      capitalize,
    }
  },
  created() {
    this.list = this.dataList
  },
  methods: {
    deleted(data) {
      const list = this.list.filter((item) => item.meta.slug !== data.meta.slug)
      this.list = list
      this.$emit('deleted', { data })
    },
  },
}
</script>

<style lang="postcss" scoped></style>
