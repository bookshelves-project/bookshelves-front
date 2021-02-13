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
          <div
            v-for="data in list"
            :key="data.id"
            class="flex items-center justify-center"
          >
            <nuxt-link
              :to="{
                name: `${data.type}-slug`,
                params: {
                  author: data.authorSlug ? data.authorSlug : null,
                  slug: data.slug,
                },
              }"
              class="relative flex items-center justify-between w-full py-0 my-1 text-gray-900 transition-colors duration-100 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50"
            >
              <div class="relative flex items-center w-full">
                <div v-if="withImage" class="h-20">
                  <img
                    v-lazy="data.cover"
                    alt="Book cover"
                    class="object-cover object-center w-12 h-full rounded-sm shadow"
                  />
                </div>
                <div class="flex flex-wrap items-center w-full py-1 ml-3">
                  <slot name="content" :data="data" />
                </div>
              </div>
            </nuxt-link>
            <button
              class="h-full p-5 text-gray-400 hover:text-gray-500 hover:bg-gray-50"
              title="Delete"
              @click="deleted('book', data.slug)"
            >
              <icon-trash />
            </button>
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
    deleted(model, slug) {
      const list = this.list.filter((data) => data.slug !== slug)
      this.list = list
      console.log(this.list)
      this.$emit('deleted', { model, slug })
    },
  },
}
</script>

<style lang="postcss" scoped></style>
