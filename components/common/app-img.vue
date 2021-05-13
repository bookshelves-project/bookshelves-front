<template>
  <div class="relative object-cover object-top cover-shadow">
    <transition name="fade">
      <div
        v-if="loading"
        class="absolute inset-0 transition-transform duration-300 bg-purple-600 blur-sm"
      ></div>
    </transition>
    <img
      :class="loading ? 'hidden' : ''"
      :src="src"
      :alt="title"
      :title="title"
      class="w-full h-full"
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
  },
  data() {
    return {
      loading: true,
      visible: true,
    }
  },
  watch: {
    src(newValue, oldValue) {
      this.loading = true
    },
  },
  methods: {
    onImgLoad() {
      this.loading = false
    },
  },
}
</script>
<style scoped>
.src-image {
  filter: blur(5px);
  transition: filter 1.6s;
  will-change: filter;
}
.src-image-loaded {
  filter: blur(0);
}
.cover-shadow {
  @apply rounded-sm;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
}
</style>
