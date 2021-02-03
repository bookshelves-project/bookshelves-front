<template>
  <div class="space-y-6">
    <slot name="description" />
    <slot name="serie" />
  </div>
</template>

<script>
export default {
  name: 'BookInformation',
}
</script>

<style lang="postcss" scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
