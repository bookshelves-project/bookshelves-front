<template>
  <nuxt-link
    :to="{
      name: 'books-slug',
      params: { author: book.author.slug, slug: book.slug },
    }"
    class="block group"
  >
    <article class="relative">
      <!-- <nuxt-image
        :src="book.cover.thumbnail"
        :alt="book.title"
        class="bg-gray-600 bg-opacity-25 cover"
        placeholder
      /> -->
      <!-- <img :src="book.cover.thumbnail" :alt="book.title" class="cover" /> -->
      <div class="relative">
        <div class="overflow-hidden group-hover:img-hover-zoom">
          <v-lazy-image
            :alt="book.title"
            :src="book.cover.thumbnail"
            src-placeholder="/images/no-cover.webp"
            class="cover"
          />
        </div>
        <div
          class="absolute top-0 bottom-0 left-0 right-0 hidden p-3 text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded-sm opacity-0 md:block group-hover:opacity-100"
        >
          <div>
            <div class="font-semibold">Author &#8212;</div>
            <div class="italic">
              {{ book.author.name }}
            </div>
          </div>
          <div v-if="book.serie" class="mt-5">
            <div class="font-semibold">Serie &#8212;</div>
            <div class="italic break-all">
              {{ book.serie.title }}
            </div>
            <div>Vol. {{ book.serie.number }}</div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center w-full h-full transition-colors duration-300 md:h-16 group-hover:bg-opacity-50 rounded-b-md group-hover:bg-gray-300"
      >
        <div class="hidden m-auto font-semibold text-center md:block w-max">
          {{ overflow(book.title) }}
        </div>
        <div class="block mt-2 space-y-2 md:hidden">
          <div class="font-semibold">
            {{ book.title }}
          </div>
          <div class="italic">
            {{ book.author.name }}
          </div>
          <div v-if="book.serie">
            {{ book.serie.title }}, vol. {{ book.serie.number }}
          </div>
        </div>
      </div>
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
  @apply object-cover w-full h-52 rounded-sm;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  transition: transform 0.5s ease;
}

@variants group-hover, hover, focus {
  .img-hover-zoom img {
    transform: scale(1.2);
    filter: blur(2px);
  }
}
</style>
