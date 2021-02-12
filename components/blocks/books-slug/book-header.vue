<template>
  <div
    class="max-w-3xl px-4 mx-auto sm:px-6 xl:flex xl:items-center xl:justify-between xl:space-x-5 xl:max-w-7xl xl:px-8"
  >
    <div class="flex items-center space-x-5">
      <div class="flex-shrink-0">
        <div class="relative">
          <!-- <nuxt-picture
            :src="book.cover.thumbnail"
            alt="Book cover"
            class="object-cover w-16 h-16 rounded-full"
            placeholder="/images/no-cover.webp"
          /> -->
          <img
            v-lazy="book.cover.thumbnail"
            alt="Book cover"
            class="object-cover w-16 h-16 rounded-full"
          />
          <span
            class="absolute inset-0 rounded-full shadow-inner"
            aria-hidden="true"
          ></span>
        </div>
      </div>
      <div class="flex items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            {{ book.title }}
          </h1>
          <div class="flex flex-wrap text-sm font-medium text-gray-500">
            Written by
            <div
              v-for="(author, authorId) in book.authors"
              :key="authorId"
              class="mx-1"
            >
              <nuxt-link
                :to="{ name: 'authors-slug', params: { slug: author.slug } }"
                class="text-gray-900 hover:text-gray-500"
              >
                {{ author.name }}
              </nuxt-link>
              <span
                v-if="
                  book.authors.length > 1 &&
                  authorId !== book.authors.length - 1
                "
              >
                &
              </span>
            </div>
            <span v-if="book.serie !== null">
              in
              <nuxt-link
                :to="{ name: 'series-slug', params: { slug: book.serie.slug } }"
                class="text-gray-900 hover:text-gray-500"
              >
                {{ book.serie.title }}
              </nuxt-link>
              (vol. {{ book.serie.number }})
            </span>
          </div>
        </div>
        <div v-if="$auth.$state.loggedIn" class="ml-5">
          <button @click="toggleFavorite">
            <icon-heart
              title="Favorite"
              class="text-red-600"
              :is-full="isFavorite"
            />
          </button>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col-reverse items-center mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 xl:mt-0 xl:flex-row xl:space-x-3"
    >
      <component
        :is="buyLink ? 'a' : 'span'"
        href="#"
        :class="buyLink ? 'hover:bg-gray-50 ' : 'bg-gray-300'"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          ></path>
        </svg>
        <span class="mx-1">Buy</span>
      </component>
      <a
        :href="book.epub.download"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        <icon name="download" />
        <span class="mx-1">Download</span>
        <span> ({{ book.epub.size }}) </span>
      </a>
    </div>
  </div>
</template>

<script>
import iconHeart from '~/components/icons/icon-heart.vue'
export default {
  name: 'BookHeader',
  components: { iconHeart },
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      buyLink: false,
      isFavorite: false,
    }
  },
  mounted() {
    this.isFavorite = this.book.isFavorite
  },
  methods: {
    async toggleFavorite() {
      this.isFavorite = !this.isFavorite
      const model = 'book'
      const slug = this.$route.params.slug
      try {
        await this.$axios.$post(`/api/favorite/${model}/${slug}`)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
