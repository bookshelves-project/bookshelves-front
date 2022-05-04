<script setup lang="ts">
import AppImg from '@/components/app/img.vue'
import SvgIcon from '@/components/svg-icon.vue'
import { capitalize, date } from '@/utils/methods'

defineProps<{
  data: Favoritable | Review
  deletable: boolean
}>()

const emit = defineEmits(['destroy'])

const destroy = (data: Favoritable | Review) => {
  emit('destroy', data)
}
</script>

<template>
  <li v-if="data.meta" class="relative bg-white dark:bg-gray-800 flex">
    <nuxt-link
      :to="
        $localePath({
          name:
            data.meta.for === 'author'
              ? `authors-slug`
              : `${data.meta.for}s-author-slug`,
          params: {
            author: data.meta.author,
            slug: data.meta.slug,
          },
        })
      "
      :title="data.title"
      :aria-label="data.title"
      class="flex items-center w-full py-5 pl-4 pr-3 space-x-6 hover:bg-gray-50 dark:hover:bg-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 overflow-x-hidden"
    >
      <div class="shrink-0">
        <app-img
          :src="data.cover"
          :color="data.color"
          class="object-cover w-16 h-16"
          override="rounded-md"
          :alt="data.title"
        />
      </div>
      <div class="w-full">
        <div class="flex justify-between space-x-3">
          <div class="flex-1 min-w-0">
            <div class="block focus:outline-none">
              <div
                class="text-base font-semibold text-gray-900 truncate dark:text-gray-100 max-w-[15rem] text-ellipsis"
              >
                {{ data.title }}
              </div>
              <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                {{ capitalize(data.meta.for) }}
              </div>
            </div>
          </div>
          <div v-if="data.createdAt" class="hidden lg:block">
            <time
              :datetime="data.createdAt.toString()"
              class="shrink-0 text-sm text-gray whitespace-nowrap"
              >{{ date(data.createdAt) }}</time
            >
          </div>
        </div>
        <div v-if="data.text" class="hidden mt-1 lg:block">
          <div class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            <div v-html="data.text"></div>
          </div>
        </div>
      </div>
    </nuxt-link>
    <button
      v-if="deletable"
      type="button"
      class="block w-20 flex-col py-5 px-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
      title="Delete"
      aria-label="Delete"
      @click="destroy(data)"
    >
      <svg-icon
        name="trash"
        class="w-6 h-6 m-auto text-gray-400 dark:text-gray-300"
      />
    </button>
  </li>
</template>
