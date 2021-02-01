<template>
  <nuxt-link
    v-if="serie"
    :to="{
      name: 'series-slug',
      params: { slug: serie.slug },
    }"
    class="block group"
  >
    <article class="relative">
      <div class="relative">
        <v-lazy-image
          v-if="serie.covers.main"
          :alt="serie.title"
          :src="serie.covers.main"
          src-placeholder="/images/no-cover.webp"
          class="relative z-30 cover"
        />
        <!-- <v-lazy-image
          v-for="(cover, coverId) in serie.covers.extra"
          :key="coverId"
          :src="cover"
          :alt="serie.title"
          :class="[
            { 'z-20 top-0 transform -rotate-6': coverId === 0 },
            { 'z-10 top-0 transform rotate-3': coverId === 1 },
          ]"
          class="absolute cover"
          src-placeholder="/images/no-cover.webp"
        /> -->
      </div>
      <div
        class="flex items-center w-full h-full transition-colors duration-300 md:h-16 group-hover:bg-opacity-50 rounded-b-md group-hover:bg-gray-300"
      >
        <div class="hidden m-auto font-semibold text-center md:block w-max">
          {{ overflow(serie.title) }}
        </div>
        <div class="block mt-2 space-y-2 md:hidden">
          <div class="font-semibold">
            {{ serie.title }}
          </div>
          <!-- <div class="italic">
            {{ book.author.name }}
          </div>
          <div v-if="book.serie">
            {{ book.serie.title }}, vol. {{ book.serie.number }}
          </div> -->
        </div>
      </div>
      <!-- <div
        :class="displayOverlay ? 'opacity-0' : 'opacity-100'"
        class="absolute bottom-0 left-0 right-0 z-30 p-2 font-semibold text-center text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded-b-sm"
      >
        {{ overflow(serie.title) }}
      </div> -->
      <div
        :class="displayOverlay ? 'opacity-100' : 'opacity-0'"
        class="absolute top-0 bottom-0 left-0 right-0 z-30 p-3 text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded-sm"
      >
        <div class="font-semibold">
          {{ serie.title }}
        </div>
        <div class="italic">By {{ serie.author }}</div>
        <div class="mt-5">
          <div class="font-semibold">{{ serie.booksNumber }} books</div>
        </div>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: 'SerieCard',
  props: {
    serie: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      displayOverlay: false,
    }
  },
  computed: {
    download() {
      return ''
    },
  },
  methods: {
    overflow(text, maxLength = 30) {
      let overflow = text.replace(/^(.{30}[^\s]*).*/, '$1')
      if (text.length > maxLength) {
        overflow = `${overflow}...`
      }
      return overflow
    },
  },
}
</script>

<style lang="postcss" scoped>
.cover {
  @apply object-cover w-full h-52 rounded-sm;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  /* transition: transform 0.5s ease; */
}
</style>
