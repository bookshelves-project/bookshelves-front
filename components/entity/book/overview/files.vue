<script setup lang="ts">
const props = defineProps<{
  files?: DownloadList
}>()

const list = computed((): DownloadList => {
  let filtered = {}
  if (props.files) {
    filtered = Object.fromEntries(
      Object.entries(props.files).filter(([key, file]) => file !== null)
    )
    filtered = Object.values(filtered).reverse()
  }

  return filtered
})
</script>

<template>
  <section aria-labelledby="download-heading" class="mt-auto">
    <div class="mt-4 space-y-6">
      <div>
        <h2
          id="download-heading"
          class="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          Formats
        </h2>
        <ul
          role="list"
          class="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700 mt-3"
        >
          <li
            v-for="file in list"
            :key="file?.format"
            class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
          >
            <div class="w-0 flex-1 flex items-center">
              <span
                class="font-bold uppercase text-primary-600 dark:text-primary-500"
                >{{ file?.format }}</span
              >
              <span class="ml-2 flex-1 w-0 truncate">
                {{ file?.name }}
              </span>
            </div>
            <div class="ml-4 flex-shrink-0 flex items-center">
              <div class="text-gray-500 dark:text-gray-400 mr-1">
                {{ file?.size }}
              </div>
              <a
                :href="file?.reader"
                class="font-medium text-primary-600 dark:text-primary-500 hover:bg-gray-100 py-1 px-2 rounded-md dark:hover:bg-gray-800"
                target="_blank"
              >
                Read
              </a>
              <a
                :href="file?.url"
                class="font-medium text-primary-600 dark:text-primary-500 hover:bg-gray-100 py-1 px-2 rounded-md dark:hover:bg-gray-800"
                download
              >
                Download
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
