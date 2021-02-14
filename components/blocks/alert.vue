<template>
  <div
    class="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
  >
    <transition name="fade">
      <div
        v-if="$store.state.showAlert"
        :class="[
          { 'bg-red-100': $store.state.alert.type === 'danger' },
          { 'bg-yellow-100': $store.state.alert.type === 'warning' },
          { 'bg-green-100': $store.state.alert.type === 'success' },
        ]"
        class="relative py-10 pl-10 pr-20 rounded-md shadow w-96"
      >
        <button
          class="absolute text-gray-400 transition-colors duration-100 rounded top-2 right-2 hover:bg-gray-50"
          @click="close"
        >
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
        <div
          :class="[
            {
              'text-red-800 dark:text-red-700':
                $store.state.alert.type === 'danger',
            },
            {
              'text-yellow-800 dark:text-yellow-700':
                $store.state.alert.type === 'warning',
            },
            {
              'text-green-800 dark:text-green-700':
                $store.state.alert.type === 'success',
            },
          ]"
          class="flex"
        >
          <div class="flex-shrink-0">
            <component
              :is="`icon-${$store.state.alert.type}`"
              class="w-10 h-10"
            />
          </div>
          <div class="mt-1 ml-5">
            <h3 class="text-3xl font-handlee">
              {{ $store.state.alert.title }}
            </h3>
            <div class="mt-2 text-lg">
              <p>
                {{ $store.state.alert.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import IconDanger from '../icons/icon-danger.vue'
import iconInfo from '../icons/icon-info.vue'
import IconSuccess from '../icons/icon-success.vue'
import IconWarning from '../icons/icon-warning.vue'
export default {
  name: 'Alert',
  components: { iconInfo, IconWarning, IconDanger, IconSuccess },
  methods: {
    close() {
      this.$store.commit('setShowAlert', false)
    },
  },
}
</script>
