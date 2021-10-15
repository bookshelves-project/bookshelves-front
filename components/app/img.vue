<template>
  <div ref="AppImg" class="relative">
    <div
      :class="init ? 'opacity-100' : 'opacity-100'"
      class="app-img transition-opacity duration-200 h-full"
    >
      <transition name="fade">
        <div
          v-if="loading"
          ref="Placeholder"
          :class="placeholder ? '' : 'bg-white dark:bg-gray-900'"
          class="absolute z-10 inset-0 transition-transform duration-100"
          :style="placeholder ? `background-color: ${placeholder}` : ''"
        ></div>
      </transition>
      <figure class="h-full">
        <img
          ref="Image"
          v-lazy-load
          :data-src="src"
          :alt="alt"
          :title="title"
          class="!m-0 !w-full h-full"
          @load="load"
        />
        <figcaption v-if="legend" class="dark:text-gray-50 mt-2 mx-2 mb-10">
          {{ legend }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppImg',
  props: {
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    legend: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      init: false,
      loading: true,
      notExist: false,
    }
  },
  watch: {
    src(newValue, oldValue) {
      //   this.setStyle()
      this.loading = true
    },
  },
  mounted() {
    this.setStyle()
  },
  methods: {
    setStyle() {
      /* eslint-disable no-unused-vars */
      const appImg = this.$refs.AppImg
      const placeholder = this.$refs.Placeholder
      const image = this.$refs.Image
      const style = appImg.classList
      style.forEach((s) => {
        // placeholder.classList.add(s)
        image.classList.add(s)
      })
      //   this.init = false
    },
    load() {
      this.loading = false
      //   const appImg = this.$refs.AppImg
      //   appImg.classList = ''
    },
  },
}
</script>

<style lang="postcss" scoped>
.app-img {
  /* &.placeholder {
    @apply ;
  } */
}
</style>
