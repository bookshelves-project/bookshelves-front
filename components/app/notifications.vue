<template>
  <div class="fixed top-0 right-0 z-50">
    <transition-group name="list" tag="section">
      <div v-for="(notification, id) in notifications" :key="id + 1">
        <app-notification :notification="notification" />
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { Notification } from '~/types'
import { namespace, getterType, mutationType, actionType } from '~/store/notification'

// from: https://blog.aspiresys.pl/technology/toast-notifications-in-vue/
const ctx = useContext()
const notifications = computed(() => (ctx.store.state.notification.notifications as Notification[]))
</script>

<!-- <script>
export default {
  name: 'AppNotifications',
  data() {
    return {
      notifications: [],
      timeout: 4000
    }
  },
  mounted() {
    this.notifications = []
    this.$nuxt.$on('notification', this.trigger)
  },
  beforeDestroy() {
    this.$nuxt.$off('notification')
  },
  methods: {
    trigger(notifData) {
      notifData.date = Date.now()
      this.notifications.push(notifData)
      setTimeout(() => {
        this.clear(notifData)
      }, this.timeout)
    },
  }
}
</script> -->
