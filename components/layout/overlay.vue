<template>
  <div
    v-if="layer"
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @click="close"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <transition name="fade">
        <div
          v-if="overlay"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
      </transition>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: 'LayoutOverlay',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      visibleLayer: true,
      visibleOverlay: true,
    }
  },
  computed: {
    // ...mapState({
    //   layer: 'overlay/isVisibleLayer',
    //   overlay: 'overlay/isVisibleOverlay',
    // }),
  },
  methods: {
    close() {
      this.$toggleOverlay(this.$store, false)
    },
  },
}
</script>
