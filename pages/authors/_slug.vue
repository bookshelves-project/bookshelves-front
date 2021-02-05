<template>
  <main class="container max-w-7xl">
    <div>
      <div class="mx-auto mb-8">
        <!-- <nuxt-picture
          :src="authorPicture"
          :alt="author.name"
          class="object-cover object-center w-32 h-32 mx-auto rounded-full"
          placeholder="/images/author-no-cover.png"
        /> -->
        <img
          v-lazy="authorPicture"
          :alt="author.name"
          class="object-cover object-center w-32 h-32 mx-auto rounded-full"
        />
        <div class="text-3xl font-semibold text-center">
          {{ author.name }}
        </div>
        <div class="flex justify-center mt-5">
          <a
            :href="author.download"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
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
            <span class="mx-1">Download all books of {{ author.name }}</span>
            <span> ({{ author.size }}) </span>
          </a>
        </div>
      </div>
      <div class="relative mb-8">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-3 text-lg font-medium text-gray-900 bg-white">
            {{ author.books_number }} Books
          </span>
        </div>
      </div>
      <div
        class="grid grid-cols-1 gap-4 2xl:grid-cols-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
      >
        <entity-card
          v-for="book in author.books"
          :key="book.id"
          :data="book"
          :cover="book.cover.thumbnail"
          :route="{
            name: 'books-slug',
            params: { author: book.author.slug, slug: book.slug },
          }"
        >
          <template #title>
            {{ $overflow(book.title) }}
          </template>
          <template #hover>
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
          </template>
          <template #title-responsive>
            <div class="font-semibold">
              {{ book.title }}
            </div>
            <div class="italic">
              {{ book.author.name }}
            </div>
            <div v-if="book.serie">
              {{ book.serie.title }}, vol. {{ book.serie.number }}
            </div>
          </template>
        </entity-card>
      </div>
    </div>
  </main>
</template>

<script>
import entityCard from '~/components/blocks/entity-card.vue'
// import booksGrid from '~/components/blocks/books-grid.vue'
export default {
  name: 'AuthorsSlug',
  components: { entityCard },
  // components: { booksGrid },
  async asyncData({ app, query, error, params, $content, store }) {
    try {
      const [author] = await Promise.all([
        app.$axios.$get(`/authors/${params.slug}`),
      ])

      console.log(author)
      return {
        author: author.data,
      }
    } catch (error) {
      console.error(error)

      return {
        author: {},
      }
    }
  },
  data() {
    return {
      authorPicture: '/images/author-no-picture.png',
      componentKey: 0,
    }
  },
  created() {
    this.getAuthorPicture()
  },
  methods: {
    async getAuthorPicture() {
      let authorName = this.author.name
      authorName = authorName.replaceAll(' ', '%20')
      const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&titles=${authorName}&prop=pageimages&format=json&pithumbsize=512`

      console.log(url)
      const result = await this.$http.$get(url)
      const source = result.query.pages[Object.keys(result.query.pages)[0]]
      let picture = `${process.env.BASE_URL}/images/author-no-picture.png`
      try {
        picture = source.thumbnail.source
      } catch (error) {}
      console.log(picture)
      this.authorPicture = picture
      // return picture
    },
  },
  head() {
    const title = `${this.author.name} - Authors`
    const description = `${this.author.name} author on Bookshelves with ${this.author.books_number} books available.`
    const image = this.authorPicture
    return {
      title,
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
      links: [
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}/authors/${this.author.slug}`,
        },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped></style>
