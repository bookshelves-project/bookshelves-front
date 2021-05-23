<template>
  <div class="relative">
    <img
      v-if="imageNotExist"
      src="/images/bookshelves.png"
      :alt="title"
      class="object-cover max-size"
    />
    <transition name="fade">
      <div
        v-if="loading"
        :style="`background-color: ${color}`"
        :class="picture"
        class="absolute inset-0 transition-transform duration-300 blur-sm max-size img"
      ></div>
    </transition>
    <img
      v-lazy-load
      :class="[loading ? '' : '', picture]"
      :data-src="src"
      :alt="title"
      :title="title"
      class="object-cover max-size img"
      @load="onImgLoad"
    />
  </div>
</template>

<script>
export default {
  name: 'AppImg',
  props: {
    src: {
      type: String,
      default: '/images/no-cover.webp',
    },
    color: {
      type: String,
      default: '#564fcc',
    },
    title: {
      type: String,
      default: 'Image',
    },
    picture: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      imageNotExist: false,
    }
  },
  watch: {
    src(newValue, oldValue) {
      this.loading = true
    },
  },
  created() {
    if (!this.src) {
      this.imageNotExist = true
    }
  },
  methods: {
    onImgLoad() {
      this.loading = false
    },
  },
}
</script>

<style lang="postcss" scoped>
.max-size {
  width: 98%;
  height: 98%;
}
</style>
