<template>
  <div class="container max-w-7xl">
    <section-heading
      title="Dashboard"
      :subtitle="`Welcome ${this.$auth.user.name}`"
      :image="$auth.$state.user.profile_photo_url"
    />
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="bg-white rounded-md shadow dark:bg-gray-800">
        <div
          class="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6 rounded-t-md"
        >
          <h3
            class="flex items-center text-lg font-medium leading-6 text-gray-900"
          >
            <icon-heart class="text-red-600" :is-full="true" />
            <div class="ml-2">Favorite list</div>
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            All your favorite books will be here.
          </p>
        </div>
        <div class="p-3 lg:p-5">
          <transition name="fade">
            <div v-if="favoriteList.length > 0">
              <div
                v-for="book in favoriteList"
                :key="book.id"
                class="relative flex items-center justify-between p-2 text-gray-900 transition-colors duration-100 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50"
              >
                <nuxt-link
                  :to="{
                    name: 'books-slug',
                    params: { author: book.authorSlug, slug: book.slug },
                  }"
                  class="relative flex items-center"
                >
                  <div class="absolute left-0 w-10">
                    <img
                      v-lazy="book.cover.basic"
                      alt="Book cover"
                      class="object-cover object-center w-full h-12 rounded-sm shadow"
                    />
                  </div>
                  <div class="flex flex-wrap items-center ml-12">
                    <div class="block transition-colors duration-100 w-max">
                      <span class="hidden md:block">
                        {{ book.title }}
                      </span>
                      <span class="hidden sm:block md:hidden">
                        {{ $overflow(book.title, 20) }}
                      </span>
                      <span class="block sm:hidden">
                        {{ $overflow(book.title, 16) }}
                      </span>
                    </div>
                    <div class="flex-wrap hidden md:flex">
                      <span class="ml-1">by</span>
                      <div
                        v-for="(author, authorId) in book.authors"
                        :key="authorId"
                        class="mx-1"
                      >
                        <span>
                          {{ author.name }}
                        </span>
                        <span
                          v-if="
                            book.authors.length > 1 &&
                            authorId !== book.authors.length - 1
                          "
                        >
                          &
                        </span>
                      </div>
                    </div>
                    <div
                      v-if="book.serie"
                      class="flex-wrap items-center hidden md:flex"
                    >
                      <span class="mr-1">in</span>
                      <div class="block transition-colors duration-100 w-max">
                        {{ book.serie.title }}
                      </div>
                    </div>
                  </div>
                </nuxt-link>
                <button
                  class="p-4 text-gray-400 hover:text-gray-500"
                  @click="deleteFavorite('book', book.slug)"
                >
                  <icon-trash />
                </button>
              </div>
            </div>
            <div v-else class="flex flex-wrap items-center text-gray-400">
              Your favorite list is empty, try to favorite any book with
              <icon-heart class="ml-1" :is-full="true" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sectionHeading from '~/components/blocks/section-heading.vue'
import IconHeart from '~/components/icons/icon-heart.vue'
import IconTrash from '~/components/icons/icon-trash.vue'
export default {
  name: 'Dashboard',
  components: { sectionHeading, IconHeart, IconTrash },
  middleware: 'auth',
  async asyncData({ app, query, error, params, $content, store }) {
    try {
      const [books] = await Promise.all([app.$axios.$get(`/api/favorite/book`)])

      return {
        books: books.data,
      }
    } catch (error) {
      console.error(error)

      return {
        books: {},
      }
    }
  },
  data() {
    return {
      favoriteList: [],
    }
  },
  mounted() {
    this.favoriteList = this.books
  },
  methods: {
    async deleteFavorite(model, slug) {
      const books = this.favoriteList.filter((book) => book.slug !== slug)
      this.favoriteList = books
      try {
        await this.$axios.$post(`/api/favorite/${model}/${slug}`)
      } catch (error) {
        console.error(error)
      }
    },
  },
  head() {
    const title = 'Dashboard'
    const description = 'An overview of all your activities on Bookshelves.'
    const image = `${process.env.BASE_URL}/open-graph.png`
    return {
      title,
      titleTemplate: '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}/dashboard`,
        },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped></style>
