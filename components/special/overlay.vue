<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="$store.state.overlay.isVisible"
      class="fixed inset-0 z-50 bg-black opacity-50"
    ></div>
  </transition>
</template>

<script>
export default {
  name: 'Overlay',
  data() {
    return {
      isVisible: false
    }
  },
  watch: {
    '$store.state.overlay.isVisible'(newValue) {
      setTimeout(() => {
        this.isVisible = newValue
      }, 150)
    }
  }
}
</script>

<style lang="postcss" scoped></style>
