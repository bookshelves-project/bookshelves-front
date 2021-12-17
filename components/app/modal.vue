<template>
  <!-- <app-button
      class="mb-6"
      @click="() => (isOpen = !isOpen)"
    >
      open
    </app-button>
  <app-modal :open="isOpen" @close="(data) => (isOpen = data)" />-->
  <div
    v-if="layer"
    class="fixed z-40 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="items-end justify-center min-h-screen text-center block p-0">
      <transition name="fade">
        <div
          v-if="overlay"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
      </transition>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">&#8203;</span>

      <transition name="fade">
        <div v-if="modal" class="fixed z-50 inset-0 overflow-y-auto scrollbar-thin">
          <div class="items-end justify-center min-h-screen md:min-h-32 text-center block p-0">
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span
              class="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >&#8203;</span>

            <button
              class="fixed z-50 top-2.5 right-2.5 bg-gray-500 bg-opacity-30 hover:bg-gray-600 hover:bg-opacity-30 transition-colors duration-75 rounded-md"
              @click="closeEvent"
            >
              <svg-icon name="cross" class="w-5 h-5 text-gray-800" />
            </button>

            <transition name="fade">
              <div
                v-if="modal"
                v-click-outside="closeEvent"
                class="inline-block bg-white dark:bg-gray-800 dark:text-gray-100 md:rounded-lg text-left overflow-hidden shadow-xl transform transition-all align-middle w-full min-h-screen md:min-h-full"
                :class="`max-w-${size}`"
              >
                <slot />
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: 'Modal',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'sm',
      validator: val => [
        'sm',
        'md',
        'lg',
        'xl',
        '2xl'
      ].includes(val)
    }
  },
  data() {
    return {
      modal: false,
      layer: false,
      overlay: false
    }
  },
  watch: {
    open(newValue, oldValue) {
      if (newValue) {
        this.layer = newValue
        setTimeout(() => {
          this.overlay = newValue
          this.modal = newValue
        }, 150)
        this.scrollDisabled()
      } else {
        this.overlay = newValue
        this.modal = newValue
        setTimeout(() => {
          this.layer = newValue
        }, 250)
        this.scrollEnabled()
      }
    }
  },
  methods: {
    closeEvent() {
      this.modal = false
      // this.$toggleOverlay(this.$store, false)
      this.$emit('close', this.modal)
    },
    scrollDisabled() {
      // To get the scroll position of current webpage
      const topScroll = window.pageYOffset || document.documentElement.scrollTop
      const leftcroll = window.pageXOffset || document.documentElement.scrollLeft

      // if scroll happens, set it to the previous value
      window.onscroll = function () {
        window.scrollTo(leftcroll, topScroll)
      }
    },
    scrollEnabled() {
      window.onscroll = () => ''
    }
  }
}
</script>
