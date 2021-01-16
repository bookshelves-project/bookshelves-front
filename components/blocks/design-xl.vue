<template>
  <div class="sticky top-0">
    <img
      class="right-0 object-cover h-screen"
      :src="`/images/${design}.svg`"
      :alt="design"
      style="width: inherit"
    />
  </div>
</template>

<script>
export default {
  name: 'DesignXl',
  data() {
    return {
      design: null,
    }
  },
  mounted() {
    this.design = this.$shuffle(this.$store.state.design)[0]
  },
}
</script>

<style lang="postcss" scoped></style>
