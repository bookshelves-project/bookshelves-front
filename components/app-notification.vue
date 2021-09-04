<template>
  <div
    aria-live="assertive"
    class="
      fixed
      z-50
      inset-0
      flex
      items-end
      px-4
      py-6
      pointer-events-none
      sm:p-6 sm:items-start
    "
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!--
      Notification panel, dynamically insert this into the live region when it needs to be displayed

      Entering: "transform ease-out duration-300 transition"
        From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        To: "translate-y-0 opacity-100 sm:translate-x-0"
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <transition name="fade">
        <div
          v-if="isVisible"
          class="
            max-w-sm
            w-full
            bg-gray-100
            dark:bg-gray-700
            shadow-lg
            rounded-lg
            pointer-events-auto
            ring-1 ring-black ring-opacity-5
            overflow-hidden
          "
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg-icon
                  :name="`notification/${type}`"
                  :class="color"
                  class="w-6 h-6"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-200">
                  {{ title }}
                </p>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {{ text }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  class="
                    bg-white
                    rounded-md
                    inline-flex
                    text-gray-400
                    dark:text-gray-300 dark:bg-gray-800
                    hover:text-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-indigo-500
                  "
                  @click="setIsVisible(false)"
                >
                  <span class="sr-only">Close</span>
                  <svg-icon name="cross" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AppNotification',
  computed: {
    ...mapGetters({
      isVisible: 'notification/getIsVisible',
      title: 'notification/getTitle',
      text: 'notification/getText',
      type: 'notification/getType',
    }),
    color() {
      const colors = {
        success: 'text-green-400',
        warning: 'text-orange-400',
        error: 'text-red-400',
        information: 'text-blue-400',
        default: 'text-blue-400',
      }
      return colors[this.type] || colors.default
    },
  },
  watch: {
    isVisible(newValue, oldValue) {
      setTimeout(() => {
        this.setIsVisible(false)
      }, 4000)
    },
  },
  methods: {
    ...mapMutations({
      setIsVisible: 'notification/setIsVisible',
    }),
  },
}
</script>
