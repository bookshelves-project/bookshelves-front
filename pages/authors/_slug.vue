<template>
  <main class="container mt-5 max-w-7xl">
    <div>
      <div class="mx-auto mb-8">
        <v-lazy-image
          :src="authorPicture"
          :alt="author.name"
          class="object-cover object-center w-32 h-32 mx-auto rounded-full"
        />
        <div class="text-3xl font-semibold text-center">
          {{ author.name }}
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
      authorPicture: '/images/author-no-picture.svg',
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
      let picture = '/images/author-no-picture.svg'
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
    }
  },
}
</script>

<style lang="postcss" scoped></style>
