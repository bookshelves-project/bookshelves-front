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
          <icon-cross />
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
import IconCross from '../icons/icon-cross.vue'
import IconDanger from '../icons/icon-danger.vue'
import iconInfo from '../icons/icon-info.vue'
import IconSuccess from '../icons/icon-success.vue'
import IconWarning from '../icons/icon-warning.vue'
export default {
  name: 'Alert',
  components: { iconInfo, IconWarning, IconDanger, IconSuccess, IconCross },
  methods: {
    close() {
      this.$store.commit('setShowAlert', false)
    },
  },
}
</script>
