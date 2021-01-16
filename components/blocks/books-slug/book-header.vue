<template>
  <div
    class="max-w-3xl px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 xl:max-w-7xl xl:px-8"
  >
    <div class="flex items-center space-x-5">
      <div class="flex-shrink-0">
        <div class="relative">
          <div class="w-full h-full">
            <nuxt-image
              v-if="book.cover.thumbnail"
              :alt="book.title"
              :src="book.cover.thumbnail"
              class="w-16 h-16 rounded-md"
              placeholder
            />
            <nuxt-image
              v-else
              src="/images/no-cover.webp"
              alt="bookshelves-default"
              class="w-16 h-16 rounded-md"
              placeholder
            />
          </div>
          <span
            class="absolute inset-0 rounded-full shadow-inner"
            aria-hidden="true"
          ></span>
        </div>
      </div>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ book.title }}
        </h1>
        <p class="text-sm font-medium text-gray-500">
          By {{ book.author.name }}
          <span v-if="book.serie">
            in {{ book.serie.title }}, n°{{ book.serie.number }}
          </span>
        </p>
      </div>
    </div>
    <div
      class="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
    >
      <a
        :href="book.epub.download"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors duration-300 bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="mx-1">Download</span>
        <span> ({{ book.epub.size }}) </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookHeader',
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="postcss" scoped></style>
