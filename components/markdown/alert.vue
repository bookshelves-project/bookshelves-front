<template>
  <div class="p-4 mt-4 mb-4 border-l-4 alert" :class="`alert-${type}`">
    <div>
      <div class="flex items-center mb-3">
        <div class="flex-shrink-0">
          <svg-icon :name="icon" class="w-6 h-6 mt-px alert-icon" />
        </div>
        <div class="flex-grow ml-2 overflow-auto font-semibold alert-content">
          <span v-if="title">
            {{ title }}
          </span>
          <span v-else class="uppercase">
            {{ type }}
          </span>
        </div>
      </div>
      <div class="flex-grow ml-2 overflow-auto alert-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return ['info', 'success', 'warning', 'danger', 'required'].includes(
          value
        )
      }
    },
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    icon() {
      return {
        info: 'info',
        success: 'success',
        warning: 'warning',
        danger: 'danger',
        required: 'required'
      }[this.type]
    }
  }
}
</script>

<style>
.alert p {
  @apply m-0 !important;
}

.alert a {
  @apply text-gray-700 !important;
}
.dark .alert a {
  @apply text-gray-300 !important;
}

.alert strong {
  @apply text-current;
}

.alert-content pre code {
  background-color: inherit !important;
}

/* Info */

.alert-info {
  @apply bg-blue-100 border-blue-400;
}
.alert-info code {
  @apply bg-blue-200 shadow-none border-0 text-current;
}
.alert-info .alert-icon {
  @apply text-blue-400;
}
.alert-info .alert-content {
  @apply text-blue-700;
}
.dark .alert-info {
  @apply bg-blue-900 border-blue-700;
}
.dark .alert-info code {
  @apply bg-blue-800;
}
.dark .alert-info .alert-content {
  @apply text-blue-300;
}

/* Success */

.alert-success {
  @apply bg-green-100 border-green-400;
}
.alert-success code {
  @apply bg-green-200 shadow-none border-0 text-current;
}
.alert-success .alert-icon {
  @apply text-green-400;
}
.alert-success .alert-content {
  @apply text-green-700;
}
.dark .alert-success {
  @apply bg-green-900 border-green-700;
}
.dark .alert-success code {
  @apply bg-green-800;
}
.dark .alert-success .alert-content {
  @apply text-green-300;
}

/* Warning */

.alert-warning {
  @apply bg-red-100 border-red-400;
}
.alert-warning code {
  @apply bg-red-200 shadow-none border-0 text-current;
}
.alert-warning .alert-icon {
  @apply text-red-400;
}
.alert-warning .alert-content {
  @apply text-red-700;
}
.dark .alert-warning {
  @apply bg-yellow-900 border-yellow-700;
}
.dark .alert-warning code {
  @apply bg-yellow-800;
}
.dark .alert-warning .alert-content {
  @apply text-red-300;
}

/* Danger */

.alert-danger {
  @apply bg-red-100 border-red-400;
}
.alert-danger code {
  @apply bg-red-200 shadow-none border-0 text-current;
}
.alert-danger .alert-icon {
  @apply text-red-400;
}
.alert-danger .alert-content {
  @apply text-red-700;
}
.dark .alert-danger {
  @apply bg-red-900 border-red-700;
}
.dark .alert-danger code {
  @apply bg-red-800;
}
.dark .alert-danger .alert-content {
  @apply text-red-300;
}

/* Required */

.alert-required {
  @apply bg-indigo-100 border-indigo-400;
}
.alert-required code {
  @apply bg-indigo-200 shadow-none border-0 text-current;
}
.alert-required .alert-icon {
  @apply text-indigo-400;
}
.alert-required .alert-content {
  @apply text-indigo-700;
}
.dark .alert-required {
  @apply bg-indigo-900 border-indigo-700;
}
.dark .alert-required code {
  @apply bg-indigo-800;
}
.dark .alert-required .alert-content {
  @apply text-indigo-300;
}
</style>
