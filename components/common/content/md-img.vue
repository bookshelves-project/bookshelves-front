<template>
  <picture class="flex">
    <div
      v-if="imgFound"
      class="relative p-2 mx-auto rounded-md"
      @mouseover="zoom ? (hover = true) : ''"
      @mouseleave="zoom ? (hover = false) : ''"
    >
      <div
        :class="{ 'cursor-pointer ': zoom }"
        class="transition-transform duration-300"
        @click="openInTab"
      >
        <div
          v-if="zoom"
          :class="hover ? 'opacity-100' : 'opacity-0'"
          class="absolute top-0 right-0 z-10 p-3 leading-5 transition-opacity duration-300 bg-gray-300 bg-opacity-60"
        >
          Click on image
          <br />
          to open it in new tab
        </div>
        <img
          :src="fullPath"
          :alt="legend ? legend : src"
          :title="legend ? legend : src"
          class="mx-auto my-auto shadow-sm"
          loading="lazy"
        />
        <legend v-if="legend" class="mt-2 mb-3 text-sm italic text-center">
          {{ legend }}
        </legend>
      </div>
      <small v-if="from" class="mt-2"
        >From
        <a :href="from" target="_blank" rel="noopener noreferrer">
          {{ getHostname(from) }}
        </a>
      </small>
    </div>
    <div
      v-else
      class="p-5 mx-auto border border-red-400 rounded-md shadow-lg bg-gray-50"
    >
      <div>
        <div class="text-6xl text-center text-red-600">Image not found</div>
        <div class="my-3 text-lg text-center">
          {{ legend ? legend : src }}
        </div>
        <small>
          Search if image exist on:
          <span class="px-1 py-1 bg-gray-200">{{
            `static/${path}/${src}.${ext}`
          }}</span>
        </small>
      </div>
    </div>
  </picture>
</template>

<script>
import { getHostname } from '~/plugins/utils/methods'
export default {
  name: 'MdImg',
  props: {
    src: {
      type: String,
      default: null,
    },
    ext: {
      type: String,
      default: 'webp',
    },
    from: {
      type: String,
      default: null,
    },
    zoom: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      path: null,
      imgFound: true,
      hover: false,
      fullPath: null,
      legend: null,
      getHostname,
    }
  },
  mounted() {
    this.legend = this.$slots.default[0].text.replace(/\n/g, ' ')
    this.getPath()
    this.fullPath = `/images/${this.path}/${this.src}.${this.ext}`
    try {
      require(`~/static/images/${this.path}/${this.src}.${this.ext}`)
    } catch (error) {
      console.error(`<MdImg />\nImage not found, check path ${this.path}`)
      this.imgFound = false
    }
  },
  methods: {
    openInTab() {
      window.open(this.fullPath)
    },
    getPath() {
      let path = this.$route.fullPath.split('/')
      path.splice(0, 1)
      path = path.join('/')
      this.path = path
    },
  },
}
</script>

<style lang="postcss" scoped>
img {
  margin: 0 auto !important;
}
</style>
