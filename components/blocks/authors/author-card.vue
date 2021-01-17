<template>
  <nuxt-link
    v-if="author"
    :to="{
      name: 'authors-slug',
      params: { slug: author.slug },
    }"
    class="block"
  >
    <article
      class="relative h-full transition-shadow duration-300 hover:shadow"
      @mouseover="displayOverlay = true"
      @mouseleave="displayOverlay = false"
    >
      <div class="w-full h-full">
        <!-- <nuxt-image
          v-if="book.cover.thumbnail"
          :alt="book.title"
          :lazy="false"
          :src="book.cover.thumbnail"
          class="cover"
          placeholder
        /> -->
        <!-- <img
          v-if="book.cover.thumbnail"
          v-lazy="book.cover.thumbnail"
          :alt="book.title"
          class="cover"
          placeholder
        /> -->
        <v-lazy-image
          v-if="author.cover"
          :alt="author.name"
          :src="author.cover"
          src-placeholder="/images/no-cover.webp"
          class="cover"
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
        class="absolute bottom-0 left-0 right-0 p-2 font-semibold text-center text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded-b-sm"
      >
        {{ overflow(author.name) }}
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: 'AuthorCard',
  props: {
    author: {
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
  @apply object-cover w-full h-full rounded-sm;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
}
</style>
