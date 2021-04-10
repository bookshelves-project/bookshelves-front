<template>
  <div class="p-4 mt-4 mb-4 border-l-4 alert" :class="`alert-${type}`">
    <div>
      <div class="flex items-center mb-3">
        <div class="flex-shrink-0">
          <component :is="icon" class="w-6 h-6 mt-px alert-icon" />
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
        return ['info', 'success', 'warning', 'danger'].includes(value)
      },
    },
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    icon() {
      return {
        info: 'IconInformationCircle',
        success: 'IconCheckCircle',
        warning: 'IconExclamationCircle',
        danger: 'IconXCircle',
      }[this.type]
    },
  },
}
</script>

<style lang="postcss">
.alert p {
  @apply m-0 !important;
}

.alert a {
  @apply text-gray-700 !important;
}
.dark-mode .alert a {
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
  @apply bg-primary-100 border-primary-400;
}
.alert-info code {
  @apply bg-primary-200 shadow-none border-0 text-current;
}
.alert-info .alert-icon {
  @apply text-primary-400;
}
.alert-info .alert-content {
  @apply text-primary-600;
}
.dark-mode .alert-info {
  @apply bg-primary-900 border-primary-600;
}
.dark-mode .alert-info code {
  @apply bg-primary-800;
}
.dark-mode .alert-info .alert-content {
  @apply text-primary-300;
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
.dark-mode .alert-success {
  @apply bg-green-900 border-green-700;
}
.dark-mode .alert-success code {
  @apply bg-green-800;
}
.dark-mode .alert-success .alert-content {
  @apply text-green-300;
}

/* Warning */

.alert-warning {
  @apply bg-yellow-100 border-yellow-400;
}
.alert-warning code {
  @apply bg-yellow-200 shadow-none border-0 text-current;
}
.alert-warning .alert-icon {
  @apply text-yellow-400;
}
.alert-warning .alert-content {
  @apply text-yellow-700;
}
.dark-mode .alert-warning {
  @apply bg-yellow-900 border-yellow-700;
}
.dark-mode .alert-warning code {
  @apply bg-yellow-800;
}
.dark-mode .alert-warning .alert-content {
  @apply text-yellow-300;
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
.dark-mode .alert-danger {
  @apply bg-red-900 border-red-700;
}
.dark-mode .alert-danger code {
  @apply bg-red-800;
}
.dark-mode .alert-danger .alert-content {
  @apply text-red-300;
}
</style>
