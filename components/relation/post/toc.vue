<script setup lang="ts">
import { TocItem } from '~~/class/toc-item'

const props = defineProps<{
  body?: string
}>()

const toc = ref<TocItem[]>()
const { create } = useToc()

onMounted(() => {
  toc.value = create(props.body!)
})
</script>

<template>
  <div v-if="toc && toc.length" class="relative block">
    <div
      class="lg:sticky lg:top-5 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-5)"
    >
      <nav class="pb-3 px-2">
        <h3
          class="mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase lg:mb-2 lg:text-xs"
        >
          On this page
        </h3>
        <ul>
          <li
            v-for="link of toc"
            :key="link.id"
            class="text-gray-700 dark:text-gray-300"
            :class="{
              'border-t border-dashed dark:border-gray-800 first:border-t-0':
                link.level === 2,
            }"
          >
            <a
              :href="`#${link.id}`"
              class="block text-sm duration-300 ease-in-out scrollactive-item transition-padding hover:pl-1"
              :class="{
                'py-2': link.level === 2,
                'ml-2 pb-2': link.level === 3,
              }"
              >{{ link.text }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
