<template>
  <div>
    <div v-for="(item, i) in items" :key="i" class="flex mt-3">
      <span :class="`list-${type}`" class="shrink-0 mt-px mr-3">
        <svg-icon :name="iconName" class="w-6 h-6" />
      </span>
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'success',
      validator(value) {
        return [
          'info',
          'success',
          'warning',
          'danger'
        ].includes(value)
      }
    }
  },
  computed: {
    iconName() {
      return (
        this.icon ||
        {
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }[this.type]
      )
    }
  }
}
</script>

<style lang="postcss">
/* Primary */
.list-primary {
  @apply text-primary-600;
}
/* Info */
.list-info {
  @apply text-primary-600;
}
/* Success */
.list-success {
  @apply text-green-500;
}
/* Warning */
.list-warning {
  @apply text-yellow-500;
}
/* Danger */
.list-danger {
  @apply text-red-500;
}
</style>
