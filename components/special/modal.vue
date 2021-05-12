<template>
  <div
    v-click-outside="close"
    class="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
  >
    <!--
      Modal panel, show/hide based on modal state.
    -->
    <transition name="fade" mode="out-in">
      <div
        v-if="isVisible"
        class="inline-block w-48 px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl md:w-full sm:my-8 sm:align-middle sm:w-64 md:max-w-sm sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div>
          <div
            :class="[
              {
                'text-red-800 dark:text-red-700 bg-red-100':
                  $store.state.alert.type === 'danger',
              },
              {
                'text-yellow-800 dark:text-yellow-700 bg-yellow-100':
                  $store.state.alert.type === 'warning',
              },
              {
                'text-green-800 dark:text-green-700 bg-green-100':
                  $store.state.alert.type === 'success',
              },
            ]"
            class="flex items-center justify-center w-12 h-12 mx-auto rounded-full"
          >
            <svg-icon :name="`${$store.state.alert.type}`" class="w-10 h-10" />
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3
              id="modal-headline"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              {{ $store.state.alert.title }}
            </h3>
            <div class="mt-2">
              <p class="text-gray-500">
                {{ $store.state.alert.message }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            @click="close"
          >
            Understand
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'Modal',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isVisible: false,
    }
  },
  watch: {
    '$store.state.modal.isVisible'(newValue) {
      this.isVisible = newValue
    },
  },
  methods: {
    close() {
      this.$store.commit('modal/setIsVisible', false)
      this.$store.commit('overlay/setIsVisible', false)
    },
  },
}
</script>
