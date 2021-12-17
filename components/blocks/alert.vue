<template>
  <div class="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
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
          type="button"
          class="absolute text-gray-400 transition-colors duration-100 rounded top-2 right-2 hover:bg-gray-50"
          aria-label="Close"
          @click="close"
        >
          <svg-icon name="cross" class="w-6 h-6" />
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
          <div class="shrink-0">
            <svg-icon :name="`icon-${$store.state.alert.type}`" class="w-10 h-10" />
          </div>
          <div class="mt-1 ml-5">
            <h3 class="text-3xl font-handlee">{{ $store.state.alert.title }}</h3>
            <div class="mt-2 text-lg">
              <p>{{ $store.state.alert.message }}</p>
            </div>
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
    }
  }
}
</script>
