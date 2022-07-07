<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

interface Props {
  open: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}
const props = withDefaults(defineProps<Props>(), {
  open: false,
  size: 'sm',
})

const target = ref<HTMLElement>()
const modal = ref(false)
const layer = ref(false)
const overlay = ref(false)

watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      layer.value = newVal
      setTimeout(() => {
        overlay.value = newVal
        modal.value = newVal
      }, 150)
      scrollDisabled()
    } else {
      overlay.value = newVal
      modal.value = newVal
      setTimeout(() => {
        layer.value = newVal
      }, 250)
      scrollEnabled()
    }
  }
)

onClickOutside(target, (event) => closeEvent())

const emit = defineEmits(['close'])

const closeEvent = () => {
  modal.value = false
  emit('close', modal.value)
}
const preventDefault = (e: Event) => {
  e.preventDefault()
}
const scrollDisabled = () => {
  document.body.classList.add('no-scroll')
  // // To get the scroll position of current webpage
  // const topScroll = window.pageYOffset || document.documentElement.scrollTop
  // const leftcroll = window.pageXOffset || document.documentElement.scrollLeft
  // document.body.addEventListener('touchmove', preventDefault, {
  //   passive: false,
  // })
  // // if scroll happens, set it to the previous value
  // window.onscroll = function () {
  //   window.scrollTo(leftcroll, topScroll)
  // }
}
const scrollEnabled = () => {
  document.body.classList.remove('no-scroll')
  // window.onscroll = () => ''
  // document.body.removeEventListener('touchmove', preventDefault)
}
</script>

<template>
  <div
    v-if="layer"
    class="fixed inset-0 z-40 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="block min-h-screen items-end justify-center p-0 text-center">
      <Transition>
        <div
          v-if="overlay"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
      </Transition>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden md:inline-block md:h-screen md:align-middle"
        aria-hidden="true"
      >&#8203;</span
      >

      <Transition>
        <div
          v-if="modal"
          class="fixed inset-0 z-50 overflow-y-auto scrollbar-thin"
        >
          <div
            class="md:min-h-32 block min-h-screen items-end justify-center p-0 text-center"
          >
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span
              class="hidden md:inline-block md:h-screen md:align-middle"
              aria-hidden="true"
            >&#8203;</span
            >

            <button
              class="fixed top-2.5 right-2.5 z-50 rounded-md bg-gray-500 bg-opacity-30 transition-colors duration-75 hover:bg-gray-600 hover:bg-opacity-30"
              @click="closeEvent"
            >
              <svg
                class="h-5 w-5 text-gray-800"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>

            <Transition>
              <div
                v-if="modal"
                ref="target"
                class="inline-block min-h-screen w-full transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all dark:bg-gray-800 dark:text-gray-100 md:min-h-full md:rounded-lg"
                :class="`dialog-${size}`"
              >
                <slot />
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dialog-sm {
  @apply max-w-sm;
}
.dialog-md {
  @apply max-w-md;
}
.dialog-lg {
  @apply max-w-lg;
}
.dialog-xl {
  @apply max-w-xl;
}
.dialog-2xl {
  @apply max-w-2xl;
}
</style>
