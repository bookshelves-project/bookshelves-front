<template>
  <span ref="AppImg" class="relative">
    <span
      :class="init ? 'opacity-100' : 'opacity-100'"
      class="app-img transition-opacity duration-200 h-full"
    >
      <transition name="fade">
        <span
          v-if="loading"
          ref="Placeholder"
          :class="placeholder"
          class="absolute z-10 inset-0 transition-transform duration-100"
          :style="color ? `background-color: ${color}` : ''"
        ></span>
      </transition>
      <figure class="h-full">
        <img
          ref="Image"
          v-lazy-load
          :data-src="src"
          :alt="invisible ? '' : titleData"
          :title="invisible ? '' : titleData"
          class="!m-0 !w-full h-full img"
          @load="load"
        />
        <figcaption v-if="legend" class="dark:text-gray-50 mt-2 mx-2 mb-10">
          {{ legend }}
        </figcaption>
      </figure>
    </span>
  </span>
</template>

<script>
export default {
  name: 'AppImg',
  props: {
    src: {
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
      default: 'bg-gray-100 dark:bg-gray-800',
    },
    color: {
      type: String,
      default: null,
    },
    invisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      init: false,
      loading: true,
      notExist: false,
      altTitle: null,
    }
  },
  computed: {
    titleData() {
      if (!this.title) {
        return this.altTitle
      }
      return this.title
    },
  },
  watch: {
    src(newValue, oldValue) {
      //   this.setStyle()
      this.loading = true
    },
  },
  mounted() {
    this.setup()
    // TODO
    // auto alt and title
  },
  methods: {
    setup() {
      this.setMeta()
      this.setStyle()
    },
    setStyle() {
      try {
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
      } catch (error) {}
    },
    setMeta() {
      try {
        let title = this.src.split('/')
        title = title[title.length - 1]
        title = title.split('.')
        title = title[0]
        this.altTitle = title
      } catch (error) {}
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
