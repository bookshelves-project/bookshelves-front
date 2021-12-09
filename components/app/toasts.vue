<template>
  <div class="fixed top-0 right-0 z-50">
    <transition-group name="list" tag="section">
      <div v-for="(toast, id) in toasts" :key="id + 1">
        <app-toast :toast="toast" />
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { Toast } from '~/types'
import { namespace, getterType, mutationType, actionType } from '~/store/toast'

// from: https://blog.aspiresys.pl/technology/toast-toasts-in-vue/
const ctx = useContext()
const toasts = computed(() => (ctx.store.state.toast.toasts as Toast[]))
</script>

<!-- <script>
export default {
  name: 'AppToasts',
  data() {
    return {
      toasts: [],
      timeout: 4000
    }
  },
  mounted() {
    this.toasts = []
    this.$nuxt.$on('toast', this.trigger)
  },
  beforeDestroy() {
    this.$nuxt.$off('toast')
  },
  methods: {
    trigger(notifData) {
      notifData.date = Date.now()
      this.toasts.push(notifData)
      setTimeout(() => {
        this.clear(notifData)
      }, this.timeout)
    },
  }
}
</script> -->
