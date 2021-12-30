<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>
    <div class="relative">
      <button
        class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md w-full hover:bg-gray-100 dark:hover:bg-gray-800"
        type="button"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
        @click="uploadImage"
      >
        <div class="space-y-1 text-center">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="flex text-sm text-gray-600">
            <label
              for="file-upload"
              class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <!-- <input
              id="fileUpload"
              ref="fileUpload"
              type="file"
              multiple
              name="fields[fileUpload][]"
              class="sr-only"
              :accept="accept"
              @change="onChange"
            /> -->
              <input
                id="fileUpload"
                ref="fileUpload"
                type="file"
                :name="name"
                class="sr-only"
                :accept="accept"
                @change="onChange"
              />
            </label>
            <p class="pl-1">or drag and drop</p>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ format }}
          </p>
        </div>
      </button>
      <transition name="fade">
        <div
          v-if="filelist && filelist.length"
          class="absolute z-10 inset-0 bg-gray-200 dark:bg-gray-700 rounded-md"
        >
          <div class="relative h-full">
            <ul
              v-cloak
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-md p-3 bg-opacity-70"
            >
              <li v-if="multiple"></li>
              <li v-else class="text-center">
                <span class="block">
                  {{ filelist[0].name }}
                </span>
                <span
                  class="text-sm italic text-gray-500 dark:text-gray-400 block mt-1"
                >
                  {{ fileSize(filelist[0].size) }}
                </span>
                <button type="button" @click="() => (filelist = undefined)">
                  Remove
                </button>
              </li>
              <!-- <li
              v-for="(newFile, id) in filelist"
              :key="id"
              class="text-sm p-1 text-gray-500"
            >
              {{ newFile.name }}
              <button
                class="ml-2"
                type="button"
                title="Remove file"
                @click="remove(id)"
              >
                Remove
              </button>
            </li> -->
            </ul>
            <div v-if="bannerPreview" class="preview h-full">
              <span
                class="block w-full h-full bg-cover bg-no-repeat bg-center rounded-md"
                :style="'background-image: url(\'' + bannerPreview + '\');'"
              />
            </div>
            <div v-if="bannerSrc" class="preview h-full">
              <img :src="bannerSrc" alt="" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string
  label: string
  name: string
  accept: string
  format: string
  multiple: boolean
}
const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  name: 'fileUpload',
  accept: '.jpg,.jpeg,.png',
  format: 'PNG, JPG, GIF up to 10MB',
  multiple: false,
})

const emit = defineEmits(['input'])

watch(
  () => props.value,
  (newVal) => {
    bannerSrc.value = newVal
  }
)

const fileUpload = ref<HTMLInputElement>()
const filelist = ref<FileList>()
const bannerPreview = ref()
const bgEnabled = 'bg-gray-600'
const styleEnabled = [bgEnabled, 'dark:bg-gray-800', 'bg-opacity-50']
const styleDisabled = ['bg-primary-600', 'bg-opacity-50']
const bannerSrc = ref()

const uploadImage = () => {
  fileUpload.value?.click()
}
const updatePreview = (event: any) => {
  if (event.target.files) {
    bannerPreview.value = event.target.files[0]
    emit('input', bannerPreview.value)

    const reader = new FileReader()
    reader.onload = (e) => {
      bannerPreview.value = e.target?.result
    }
    if (filelist.value && filelist.value[0]) {
      reader.readAsDataURL(filelist.value[0])
    }
  }
}
const onChange = (event: any) => {
  if (fileUpload.value) {
    filelist.value = fileUpload.value.files as FileList
  }
  updatePreview(event)
}
const remove = (i: any) => {
  if (filelist.value) {
    const fileBuffer: any = []
    for (const iterator of filelist.value) {
      fileBuffer.push(iterator)
    }

    const file = fileBuffer.shift(i, 1)
    filelist.value = fileBuffer
  }
}
const dragover = (event: any) => {
  event.preventDefault()
  const el = event.currentTarget as HTMLElement
  // Add some visual fluff to show the user can drop its files
  if (!el.classList.contains(bgEnabled)) {
    el.classList.remove(...styleEnabled)
    el.classList.add(...styleDisabled)
  }
}
const dragleave = (event: any) => {
  // Clean up
  event.currentTarget.classList.add(...styleEnabled)
  event.currentTarget.classList.remove(...styleDisabled)
}
const drop = (event: any) => {
  event.preventDefault()
  console.log(fileUpload.value)
  if (fileUpload.value) {
    fileUpload.value.files = event.dataTransfer.files
    onChange(event) // Trigger the onChange event manually
  }
  // Clean up
  event.currentTarget.classList.add(...styleEnabled)
  event.currentTarget.classList.remove(...styleDisabled)
}
const fileSize = (bytes: number, si = false, dp = 1) => {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['Ko', 'Mo', 'Go', 'To', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  )

  return bytes.toFixed(dp) + ' ' + units[u]
}

onMounted(() => {
  bannerSrc.value = props.value
})
</script>
