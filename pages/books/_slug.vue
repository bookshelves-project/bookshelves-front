<template>
  <div class="max-w-3xl mx-auto lg:grid lg:grid-cols-3 lg:max-w-7xl">
    <main class="col-span-2 py-10 mx-auto sm:px-6">
      <book-header :book="book" />
      <div class="mt-10">
        <book-information :book="book" />
      </div>
    </main>
    <aside class="col-span-1">
      <div class="fixed hidden right-32 lg:block">
        <div class="book-container">
          <div class="book">
            <img :src="book.cover.original" />
          </div>
        </div>
        <div class="justify-center hidden pt-5 lg:flex">
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
    </aside>
  </div>
</template>

<script>
import bookHeader from '~/components/blocks/books-slug/book-header.vue'
import BookInformation from '~/components/blocks/books-slug/book-information.vue'
export default {
  name: 'BooksSlug',
  components: { bookHeader, BookInformation },
  async asyncData({ app, query, params, error, $content, store }) {
    try {
      const [book] = await Promise.all([
        app.$axios.$get(`books/${params.author}/${params.slug}`),
      ])

      return {
        book: book.data,
      }
    } catch (error) {
      console.error(error)

      return {
        book: [],
      }
    }
  },
}
</script>

<style lang="postcss" scoped>
.book-container {
  width: 200px;
  height: 300px;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 400px;
}

.book {
  transform: rotateY(-30deg);
  position: relative;
  transform-style: preserve-3d;
  width: 200px;
  height: 300px;
  transition: transform 1s ease;
  animation: 1s ease 0s 1 initAnimation;
}

.book:hover {
  transform: rotate(0deg);
}

@keyframes initAnimation {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-30deg);
  }
}

.book > :first-child {
  position: absolute;
  background: #0d47a1aa;
  width: 200px;
  height: 300px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 2px 2px 5px #666;
}

.book::before {
  content: ' ';
  background: #fff;
  height: calc(300px - 2 * 3px);
  width: 50px;
  top: 3px;
  position: absolute;
  transform: translateX(calc(200px - 50px / 2 - 3px)) rotateY(90deg)
    translateX(calc(50px / 2));
}

.book::after {
  content: ' ';
  position: absolute;
  left: 0;
  width: 200px;
  height: 300px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background: #01060f;
  transform: translateZ(-50px);
  box-shadow: -5px 0 25px 5px #666;
}
</style>
