<template>
  <li
    v-if="data.meta"
    class="relative grid grid-cols-6 bg-white dark:bg-gray-800"
  >
    <nuxt-link
      :to="{
        name:
          data.meta.for === 'author'
            ? `authors-slug`
            : `${data.meta.for}s-author-slug`,
        params: {
          author: data.meta.author,
          slug: data.meta.slug,
        },
      }"
      :title="data.title"
      :aria-label="data.title"
      class="
        flex
        items-center
        w-full
        py-5
        pl-4
        pr-1
        space-x-6
        hover:bg-gray-50
        dark:hover:bg-gray-700
        focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600
        overflow-x-hidden
      "
      :class="canDelete ? 'col-span-5' : 'col-span-6'"
    >
      <div class="flex-shrink-0">
        <app-image
          :src="data.cover"
          class="object-cover w-16 h-16"
          class-img="rounded-md"
          :alt="data.title"
          loading="lazy"
        />
      </div>
      <div class="w-full">
        <div class="flex justify-between space-x-3">
          <div class="flex-1 min-w-0">
            <div class="block focus:outline-none">
              <p
                class="
                  text-base
                  font-semibold
                  text-gray-900
                  truncate
                  dark:text-gray-100
                  max-w-[15rem]
                  overflow-ellipsis
                "
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
              :datetime="data.createdAt"
              class="
                flex-shrink-0
                text-sm text-gray-500
                dark:text-gray-400
                whitespace-nowrap
              "
              >{{ $formatDate(data.createdAt) }}</time
            >
          </div>
        </div>
        <div v-if="data.text" class="hidden mt-1 lg:block">
          <div class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            <div v-html="$md.render(data.text)"></div>
          </div>
        </div>
      </div>
    </nuxt-link>
    <div v-if="canDelete" class="col-span-1">
      <button
        type="button"
        class="
          flex
          w-full
          h-full
          px-4
          py-4
          text-gray-400
          hover:text-gray-500 hover:bg-gray-100
          dark:hover:bg-gray-700 dark:hover:text-gray-300
        "
        title="Delete"
        aria-label="Delete"
        @click="destroy(data)"
      >
        <svg-icon
          name="trash"
          class="w-6 h-6 m-auto text-gray-400 dark:text-gray-300"
        />
      </button>
    </div>
  </li>
</template>

<script>
import { capitalize } from '~/plugins/utils/methods'
export default {
  name: 'DataListCard',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    capitalize,
    destroy(data) {
      this.$emit('destroy', data)
    },
  },
}
</script>
