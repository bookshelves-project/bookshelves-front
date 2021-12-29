<template>
  <div class="flex w-full items-center justify-center text-center">
    <div
      class="p-12 bg-gray-100 border border-gray-300"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        id="assetsFieldHandle"
        ref="file"
        type="file"
        multiple
        name="fields[assetsFieldHandle][]"
        class="w-px h-px opacity-0 overflow-hidden absolute"
        accept=".pdf,.jpg,.jpeg,.png"
        @change="onChange"
      />

      <label for="assetsFieldHandle" class="block cursor-pointer text-gray-600">
        <div>
          Explain to our users they can drop files in here or
          <span class="underline">click here</span> to upload their files
        </div>
      </label>
      <ul v-if="filelist && filelist.length" v-cloak class="mt-4">
        <li
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const file = ref<HTMLInputElement>()
const filelist = ref<FileList>()

const onChange = () => {
  if (file.value) {
    filelist.value = file.value.files as FileList
  }
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
  // Add some visual fluff to show the user can drop its files
  if (!event.currentTarget.classList.contains('bg-green-300')) {
    event.currentTarget.classList.remove('bg-gray-100')
    event.currentTarget.classList.add('bg-green-300')
  }
}
const dragleave = (event: any) => {
  // Clean up
  event.currentTarget.classList.add('bg-gray-100')
  event.currentTarget.classList.remove('bg-green-300')
}
const drop = (event: any) => {
  event.preventDefault()
  console.log(file.value)
  if (file.value) {
    file.value.files = event.dataTransfer.files
    onChange() // Trigger the onChange event manually
  }
  // Clean up
  event.currentTarget.classList.add('bg-gray-100')
  event.currentTarget.classList.remove('bg-green-300')
}
</script>
