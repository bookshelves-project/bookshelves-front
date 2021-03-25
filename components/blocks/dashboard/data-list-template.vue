<template>
  <div>
    <div
      class="px-4 py-5 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:px-6 rounded-t-md"
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
    <ul v-if="list.length" class="divide-y divide-gray-200">
      <nuxt-link
        v-for="data in list"
        :key="data.id"
        :to="{
          name: `${data.meta.for}s-slug`,
          params: {
            author: data.meta.author,
            slug: data.meta.slug,
          },
        }"
        class="relative flex items-center justify-between px-4 py-5 space-x-6 bg-white dark:bg-gray-800 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
      >
        <div class="flex items-center space-x-6">
          <div class="flex-shrink-0">
            <img
              v-lazy="data.picture"
              class="object-cover w-16 h-16 rounded-full"
              :alt="data.title"
            />
          </div>
          <div>
            <div class="flex justify-between space-x-3">
              <div class="flex-1 min-w-0">
                <div class="block focus:outline-none">
                  <!-- <span class="absolute inset-0" aria-hidden="true"></span> -->
                  <p
                    class="text-base font-semibold text-gray-900 truncate dark:text-gray-100"
                  >
                    {{ data.title }}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {{ $capitalize(data.meta.for) }}
                  </p>
                </div>
              </div>
              <div class="hidden lg:block">
                <time
                  v-if="data.createdAt && !data.updatedAt"
                  :datetime="data.createdAt"
                  class="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
                  >{{ $getDate(data.createdAt) }}</time
                >
                <time
                  v-if="data.updatedAt"
                  :datetime="data.updatedAt"
                  class="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
                  >{{ $getDate(data.updatedAt) }}</time
                >
              </div>
            </div>
            <div v-if="data.text" class="hidden mt-1 lg:block">
              <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {{ data.text }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="flex w-full h-full text-gray-400 md:p-5 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            title="Delete"
            @click="deleted(data)"
          >
            <icon-trash class="w-6 h-6 m-auto" />
          </button>
        </div>
      </nuxt-link>
    </ul>
    <div v-else class="flex flex-wrap items-center py-4 text-gray-400">
      {{ emptyList }}
    </div>
  </div>
</template>

<script>
import iconTrash from '~/components/icons/icon-trash.vue'
export default {
  name: 'DataListTemplate',
  components: { iconTrash },
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
