<template>
  <span class="flex">
    <app-button
      :color="`secondary`"
      :href="`${$config.apiURL}/${endpoint}`"
      class="mx-auto"
    >
      <slot />
    </app-button>
  </span>
</template>

<script>
export default {
  name: 'ApiButton',
  props: {
    endpoint: {
      type: String,
      default: '',
    },
  },
}
</script>
