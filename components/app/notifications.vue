<template>
  <div class="fixed top-0 right-0 z-50">
    <transition-group name="list" tag="section">
      <div v-for="(notification, id) in notifications" :key="id + 1">
        <app-notification
          :id="id"
          :ref="notification.date"
          :notification="notification"
          @delete="deleteItem"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
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
    deleteItem(notif) {
      this.clear(notif)
    },
    clear(notif) {
      this.notifications = this.notifications.filter(
        x => x.date !== notif.date
      )
    }
  }
}
</script>
