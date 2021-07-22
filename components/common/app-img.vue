<template>
  <div class="relative">
    <img
      v-if="imageNotExist"
      src="/images/no-cover.webp"
      :alt="title"
      class="object-cover dark:bg-gray-800 inset-0 absolute h-full w-full z-10"
    />
    <transition name="fade">
      <div v-if="loading">
        <div
          v-if="color"
          :style="`background-color: ${color}`"
          :class="picture"
          class="
            absolute
            inset-0
            transition-transform
            duration-300
            blur-sm
            max-size
            img
          "
        ></div>
        <div
          v-else
          :class="picture"
          class="
            absolute
            inset-0
            transition-transform
            duration-300
            blur-sm
            max-size
            img
            bg-gray-50
            dark:bg-gray-800
          "
        ></div>
      </div>
    </transition>
    <img
      v-if="!imageNotExist"
      v-lazy-load
      :class="[loading ? '' : '', picture]"
      :data-src="src"
      :src="src"
      :alt="imageNotExist ? '' : noAlt ? '' : title"
      :title="title"
      class="object-cover max-size img h-full w-full"
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
      default: null,
    },
    title: {
      type: String,
      default: 'Image',
    },
    picture: {
      type: String,
      default: null,
    },
    noAlt: {
      type: Boolean,
      default: false,
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
