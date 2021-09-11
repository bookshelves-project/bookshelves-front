<template>
  <section
    class="
      max-w-sm
      bg-gray-100
      dark:bg-gray-700
      shadow-lg
      rounded-lg
      pointer-events-auto
      ring-1 ring-black ring-opacity-5
      overflow-hidden
      lg:w-96
      w-64
      m-5
    "
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg-icon
            :name="`notification/${notification.type}`"
            :class="color"
            class="w-6 h-6"
          />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-200">
            {{ notification.title }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ notification.text }}
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
            @click="clear"
          >
            <span class="sr-only">Close</span>
            <svg-icon name="cross" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppNotification',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    notification: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    color() {
      const colors = {
        success: 'text-green-400',
        warning: 'text-orange-400',
        error: 'text-red-400',
        information: 'text-blue-400',
        default: 'text-blue-400',
      }
      return colors[this.notification.type] || colors.default
    },
  },
  methods: {
    clear() {
      this.$emit('delete', this.notification)
    },
  },
}
</script>
