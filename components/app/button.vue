<template>
  <component
    :is="component"
    ref="btn"
    :to="to ? localePath(to) : null"
    :target="href !== null ? (download ? '' : '_blank') : null"
    :rel="href !== null ? 'noopener noreferrer' : null"
    :type="component === 'button' ? type : null"
    :class="[color, { disabled: disabled }, overrideClass]"
    class="btn relative"
    :disabled="disabled"
    :download="download"
    @click="$emit('click')"
  >
    <div class="inline-block" :class="alignData">
      <slot />
    </div>
    <span v-if="external" class="hidden md:block absolute right-3">
      <svg-icon name="external-link" class="w-4 h-4" />
    </span>
  </component>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    color: {
      type: String,
      default: 'secondary',
      validator: (val) =>
        ['secondary', 'primary', 'white', 'danger'].includes(val),
    },
    href: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object],
      default: null,
    },
    // Only for true hackers & trickers
    overrideComponent: {
      type: String,
      default: null,
    },
    overrideClass: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
      validator: (val) => ['button', 'reset', 'submit'].includes(val),
    },
    external: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: 'left',
      validator: (val) => ['left', 'center', 'right'].includes(val),
    },
    download: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      component: 'button',
    }
  },
  computed: {
    alignData() {
      const alignements = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
        default: 'mx-auto',
      }
      return alignements[this.align] || alignements.default
    },
  },
  created() {
    if (this.href !== null) {
      this.component = 'a'
    }
    if (this.to !== null) {
      this.component = 'nuxt-link'
    }
    if (this.overrideComponent) {
      this.component = this.overrideComponent
    }
  },
  mounted() {
    if (this.href) {
      const btn = this.$refs.btn
      btn.setAttribute('href', this.href)
    }
  },
}
</script>

<style lang="css" scoped>
.btn {
  @apply inline-flex items-center px-4 py-2 text-base font-semibold rounded-md transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 border !important;
}
.secondary {
  @apply text-primary-600 bg-primary-100 dark:bg-primary-700 dark:hover:bg-primary-800 border-transparent hover:bg-primary-200 hover:text-primary-600 dark:text-gray-200 !important;
}
.primary {
  @apply border-transparent shadow-sm text-white bg-primary-600 hover:bg-primary-500 !important;
}
.white {
  @apply border-gray-300 dark:border-gray-600 shadow-sm text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-primary-100 !important;
}
.danger {
  @apply border-red-300 dark:border-red-600 shadow-sm text-red-700 bg-white dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-red-700 hover:bg-red-100 !important;
}

.disabled {
  @apply opacity-70 !important;
  pointer-events: none;
}
</style>
