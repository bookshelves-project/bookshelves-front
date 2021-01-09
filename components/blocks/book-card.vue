<template>
  <nuxt-link
    :to="{
      name: 'book-slug',
      params: { author: book.author.slug, slug: book.slug },
    }"
    class="block"
  >
    <article
      class="relative h-full transition-shadow duration-300 hover:shadow"
      @mouseover="displayOverlay = true"
      @mouseleave="displayOverlay = false"
    >
      <!-- <a :href="book.epubPath" rel="noopener noreferrer"> -->
      <div class="w-full h-full">
        <nuxt-image
          v-if="book.coverPath"
          :alt="book.title"
          :src="book.coverPath"
          class="cover"
          placeholder
        />
        <nuxt-image
          v-else
          src="/images/no-cover.webp"
          alt="bookshelves-default"
          class="bg-gray-600 bg-opacity-25 cover"
          placeholder
        />
      </div>
      <div
        :class="displayOverlay ? 'opacity-0' : 'opacity-100'"
        class="absolute bottom-0 left-0 right-0 p-2 font-semibold text-center text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded-b-md"
      >
        {{ overflow(book.title) }}
      </div>
      <div
        :class="displayOverlay ? 'opacity-100' : 'opacity-0'"
        class="absolute top-0 bottom-0 left-0 right-0 p-3 text-white transition-opacity duration-300 bg-black bg-opacity-75 rounded-md"
      >
        <div class="font-semibold">
          {{ book.title }}
        </div>
        <div class="italic">By {{ book.author.name }}</div>
        <div v-if="book.serie" class="mt-5">
          <div class="font-semibold">
            {{ book.serie }}
          </div>
          <div>N°{{ book.serieNumber }}</div>
        </div>
      </div>
      <!-- </a> -->
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
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
      return this.book.path
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
  @apply object-cover w-full h-full rounded-md;
}
</style>
