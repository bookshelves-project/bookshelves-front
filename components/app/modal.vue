<template>
  <!-- <app-button
      class="mb-6"
      @click="() => ((isOpen = !isOpen), $toggleOverlay($store, isOpen))"
    >
      open
    </app-button>
    <app-modal :open="isOpen" @close="(data) => (isOpen = data)" /> -->
  <div
    v-if="layer"
    class="fixed z-40 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        text-center
        sm:block sm:p-0
      "
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <transition name="fade">
        <div
          v-if="overlay"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
      </transition>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <transition name="fade">
        <div v-if="modal" class="fixed z-50 inset-0 overflow-y-auto">
          <div
            class="
              flex
              items-end
              justify-center
              min-h-screen
              text-center
              sm:block sm:p-0
            "
          >
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
              >&#8203;</span
            >

            <button
              class="
                fixed
                z-50
                top-2.5
                right-2.5
                bg-gray-500 bg-opacity-30
                hover:bg-gray-600 hover:bg-opacity-30
                transition-colors
                duration-75
                rounded-md
              "
              @click="closeEvent"
            >
              <svg-icon name="cross" class="w-5 h-5 text-gray-800" />
            </button>

            <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
            <transition name="fade">
              <div
                v-if="modal"
                v-click-outside="closeEvent"
                class="
                  inline-block
                  align-bottom
                  bg-white
                  dark:bg-gray-800 dark:text-gray-100
                  rounded-lg
                  text-left
                  overflow-hidden
                  shadow-xl
                  transform
                  transition-all
                  sm:align-middle sm:w-full
                "
                :class="`sm:max-w-${size}`"
              >
                <slot />
                <!-- <div>
                  <div
                    class="
                      mx-auto
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-full
                      bg-green-100
                    "
                  >
                    <svg
                      class="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <h3
                      id="modal-title"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Payment successful
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur amet labore.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <app-button
                    color="primary"
                    class="w-full"
                    align="center"
                    @click="closeEvent"
                  >
                    Go back to dashboard
                  </app-button>
                </div> -->
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
    clickOutside: vClickOutside.directive,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'sm',
      validator: (val) => ['sm', 'md', 'lg', 'xl', '2xl'].includes(val),
    },
  },
  data() {
    return {
      modal: false,
      layer: false,
      overlay: false,
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
        // document.getElementsByTagName('html')[0].classList.add('noscroll')
      } else {
        this.overlay = newValue
        this.modal = newValue
        setTimeout(() => {
          this.layer = newValue
        }, 250)
        // document.getElementsByTagName('html')[0].classList.remove('noscroll')
      }
    },
  },
  methods: {
    closeEvent() {
      this.modal = false
      // this.$toggleOverlay(this.$store, false)
      this.$emit('close', this.modal)
    },
  },
}
</script>
