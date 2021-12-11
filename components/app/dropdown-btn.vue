<template>
  <button
    id="menu-button"
    type="button"
    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
  >
    <slot />
    <svg-icon
      name="chevron-right"
      :class="`${color} group-hover:${hover}`"
      class="shrink-0 -mr-1 ml-1 h-5 w-5 transform rotate-90"
    />
  </button>
</template>

<script>
export default {
  name: 'DropdownButton',
  props: {
    color: {
      type: String,
      default: 'black'
    },
    hover: {
      type: String,
      default: 'text-gray-900'
    }
  }
}
</script>
