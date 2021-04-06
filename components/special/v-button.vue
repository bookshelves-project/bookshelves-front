<template>
  <component
    :is="component"
    :to="link"
    :target="{ _blank: component === 'link' }"
    :rel="{ 'noopener noreferrer': component === 'link' }"
    :type="type"
    :class="[color, { 'primary-disabled': disabled }]"
    class="btn"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    color: {
      type: String,
      default: 'secondary',
      validator: (val) => ['secondary', 'primary', 'white'].includes(val),
    },
    component: {
      type: String,
      default: 'button',
      validator: (val) => ['button', 'nuxt-link', 'link'].includes(val),
    },
    link: {
      type: [String, Object],
      default: null,
    },
    disabled: {
      type: Boolean,
      defualt: false,
    },
    type: {
      type: String,
      default: 'button',
      validator: (val) => ['button', 'reset', 'submit'].includes(val),
    },
  },
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply inline-flex items-center px-4 py-2 text-base font-semibold rounded-md transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 border;
}
.secondary {
  @apply text-primary-700 bg-primary-100 border-transparent hover:bg-primary-200;
}
.primary {
  @apply border-transparent shadow-sm text-white bg-primary-600 hover:bg-primary-700;
}
.white {
  @apply border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-primary-100;
}

.primary-disabled {
  @apply bg-primary-300 cursor-not-allowed !important;
}
</style>
