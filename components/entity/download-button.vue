<script setup lang="ts">
import AppButtonGroup from '@/components/app/button-group.vue'
import SvgIcon from '@/components/svg-icon.vue'

const props = defineProps<{
  download?: DownloadFile
  files?: DownloadList
}>()

const deployable = ref(false)
const formats = ref<DownloadFile[]>()

const getOtherFormats = () => {
  if (props.files) {
    const list: DownloadFile[] = []
    Object.entries(props.files).forEach(([key, value]) => {
      const file: DownloadFile = value
      if (file && file?.format !== props.download?.format) {
        list.push(file)
      }
    })
    if (list.length > 0) {
      deployable.value = true
    }
    formats.value = list
  }
}
getOtherFormats()
</script>

<template>
  <div v-if="download">
    <app-button-group :action="download.url" :deployable="deployable" download>
      <svg-icon name="download" class="w-6 h-6 mr-1" />
      <span class="hidden md:block mr-1">Download</span>
      {{ download.count ? download.count : '' }}
      {{ download?.format.toUpperCase() }} ({{ download.isZip ? 'ZIP ' : ''
      }}{{ download.size }})
      <template #content>
        <div class="py-1" role="none">
          <span v-for="file in formats" :key="file?.format">
            <a
              v-if="file"
              :href="file.url"
              download
              class="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-75 block px-4 py-2 text-sm"
              role="menuitem"
            >
              <span class="hidden md:block mr-1">Download</span>
              {{ file.count ? file.count : '' }}
              {{ file.format.toUpperCase() }} ({{ file.isZip ? 'ZIP' : '' }}
              {{ file.size }})
            </a>
          </span>
        </div>
      </template>
    </app-button-group>
  </div>
</template>
