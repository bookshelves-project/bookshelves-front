<template>
  <transition name="fade">
    <div class="col-span-6 md:col-span-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ label }}
      </label>
      <p
        v-if="helper || $slots.default"
        :id="`${name}-description`"
        class="mt-2 mb-2 text-sm text-gray-500 dark:text-gray-400"
      >
        <span v-if="helper">{{ helper }}</span>
        <slot v-else />
      </p>
      <div class="flex items-center mt-1">
        <div v-if="avatarPreview">
          <span
            class="block w-12 h-12 rounded-full"
            :style="
              'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' +
              avatarPreview +
              '\');'
            "
          />
        </div>
        <app-img
          v-else
          :src="avatarSrc"
          override="object-cover w-12 h-12 rounded-full"
        />
        <!-- <span
          class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
        >
          <svg-icon name="avatar" class="h-full w-full text-gray-300" />
        </span> -->

        <input
          ref="avatar"
          type="file"
          style="display: none"
          accept="image/jpeg, image/png, image/webp"
          @change="updatePreview"
        />
        <div class="space-x-2 ml-4">
          <app-button color="white" @click="uploadImage"> Change </app-button>
          <!-- <app-button color="danger" @click="deleteImage"> Delete </app-button> -->
        </div>
        <div v-if="isLoading" class="ml-3 italic text-gray-500">
          {{ progress }}%
        </div>
      </div>
      <div
        v-if="avatarValue"
        class="mt-2 text-gray-500 dark:text-gray-400 italic"
      >
        {{ humanFileSize(avatarValue.size) }}
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  // modelValue: string
  value: any
  label: string
  name: string
  helper: string
}
const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  name: undefined,
  helper: undefined,
})

const isLoading = ref(false)
const progress = ref<number>()
const avatar = ref<HTMLInputElement>()
const avatarPreview = ref()
const avatarValue = ref<File>()
const avatarSrc = ref<string>()

const emit = defineEmits(['input'])

watch(
  () => props.value,
  (newVal) => {
    avatarSrc.value = props.value
  }
)

const updatePreview = (event: any) => {
  avatarValue.value = event.target.files[0]
  emit('input', avatarValue.value)

  const reader = new FileReader()
  reader.onload = (e) => {
    avatarPreview.value = e.target?.result
  }
  if (avatar.value && avatar.value.files) {
    reader.readAsDataURL(avatar.value.files[0])
  }
}
const uploadImage = () => {
  avatar.value?.click()
  // validateSize()
}
const deleteImage = async () => {
  // try {
  //   const user = await this.$axios.$get('/profile/delete/avatar')
  //   this.avatarPreview = null
  //   this.form.avatar = null
  //   this.$auth.setUser(user)
  // } catch (error) {}
}

const humanFileSize = (bytes: number, si = false, dp = 1) => {
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
// const validateSize = (input) => {
//   const fileSize = input.files[0].size / 1024 / 1024; // in MiB
//   if (fileSize > 2) {
//     alert('File size exceeds 2 MiB');
//     // $(file).val(''); //for clearing with Jquery
//   } else {
//     // Proceed further
//   }
// }

onMounted(() => {
  if (props.value) {
    console.log(avatarSrc.value)
    avatarSrc.value = props.value
  }
})
</script>
