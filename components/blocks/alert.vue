<template>
  <div>
    <transition name="fade">
      <div
        v-if="$store.state.showAlert"
        class="fixed z-50 p-4 transform -translate-x-1/2 bg-yellow-100 rounded-md shadow left-1/2"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: solid/exclamation -->
            <svg
              class="w-5 h-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">
              {{ $store.state.alert.title }}
            </h3>
            <div class="mt-2 text-sm text-yellow-700">
              <p>
                {{ $store.state.alert.message }}
              </p>
            </div>
          </div>
          <div>
            <button class="text-gray-400" @click="close">
              <svg
                class="w-6 h-6"
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
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  methods: {
    close() {
      this.$store.commit('setShowAlert', false)
    },
  },
}
</script>
