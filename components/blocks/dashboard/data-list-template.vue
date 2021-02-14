<template>
  <div class="bg-white rounded-md shadow dark:bg-gray-800">
    <div
      class="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6 rounded-t-md"
    >
      <h3 class="flex items-center text-lg font-medium leading-6 text-gray-900">
        <!-- <icon-heart class="text-red-600" :is-full="true" />
        <div class="ml-2">Favorites list</div> -->
        <slot name="title" />
      </h3>
      <div class="mt-1 text-sm text-gray-500">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="p-3 lg:p-5">
      <transition name="fade">
        <div v-if="list.length > 0">
          <div v-for="data in list" :key="data.id" class="grid grid-cols-6">
            <nuxt-link
              :to="{
                name: `${data.meta.for}s-slug`,
                params: {
                  author: data.meta.author,
                  slug: data.meta.slug,
                },
              }"
              class="relative flex items-center justify-between w-full col-span-5 py-0 my-1 text-gray-900 transition-colors duration-100 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50"
            >
              <div class="relative flex items-center w-full">
                <div v-if="withImage" class="h-20">
                  <img
                    v-lazy="data.image"
                    alt="Book cover"
                    class="object-cover object-center w-12 h-full rounded-sm shadow"
                  />
                </div>
                <div class="flex flex-wrap items-center w-full py-1 ml-3">
                  <slot name="content" :data="data" />
                </div>
              </div>
            </nuxt-link>
            <div class="flex justify-center">
              <button
                class="flex w-full h-full text-gray-400 md:p-5 hover:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                title="Delete"
                @click="deleted(data)"
              >
                <icon-trash class="m-auto" />
              </button>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-wrap items-center py-4 text-gray-400">
          <slot name="no-data" />
        </div>
      </transition>
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
    withImage: {
      type: Boolean,
      default: true,
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
