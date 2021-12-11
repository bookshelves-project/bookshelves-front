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
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <transition name="fade">
        <div
          v-if="overlay"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
      </transition>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >&#8203;</span>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LayoutOverlay',
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      visibleLayer: true,
      visibleOverlay: true
    }
  },
  computed: {
    ...mapGetters({
      layer: 'overlay/isVisibleLayer',
      overlay: 'overlay/isVisibleOverlay'
    })
  },
  watch: {
    layer(newValue, oldValue) {
      // console.log(newValue)
    }
  },
  mounted() {
    // console.log(`layer: ${this.layer}, overlay: ${this.overlay}`)
  },
  methods: {
    close() {
      this.$toggleOverlay(this.$store, false)
    }
  }
}
</script>
