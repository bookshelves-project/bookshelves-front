<template>
  <main class="container max-w-7xl">
    <div>
      <div class="items-center justify-between mb-8 lg:flex">
        <div class="items-center lg:flex">
          <!-- <nuxt-picture
          :src="author.picture"
          :alt="author.name"
          class="object-cover object-center w-32 h-32 mx-auto rounded-full"
          placeholder="/images/author-no-cover.png"
        /> -->
          <img
            v-lazy="author.image"
            :alt="author.name"
            class="object-cover object-center w-32 h-32 mx-auto rounded-full lg:w-16 lg:h-16 lg:mx-0"
          />
          <h1 class="ml-4 text-3xl font-semibold text-center lg:text-left">
            {{ author.name }}
          </h1>
        </div>
        <div class="flex mt-5 lg:mt-0">
          <a
            :href="author.download"
            class="inline-flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-semibold text-white transition-colors duration-300 bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 md:w-max"
          >
            <icon name="download" />
            <div class="items-center ml-2 sm:flex">
              <div class="mx-1">Download {{ author.books_number }} eBooks</div>
              <div>({{ author.size }})</div>
            </div>
          </a>
        </div>
      </div>
      <div class="relative mt-5 mb-10">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-2 text-gray-500 bg-white dark:bg-gray-900">
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
          :cover="book.image"
          :route="{
            name: 'books-slug',
            params: { author: book.authorSlug, slug: book.slug },
          }"
        >
          <template #title>
            {{ $overflow(book.title) }}
          </template>
          <template #hover>
            <div>
              <div class="font-semibold">Author &#8212;</div>
              <div class="italic">
                <span
                  v-for="(author, authorId) in book.authors"
                  :key="authorId"
                >
                  <span>{{ author.name }}</span>
                  <span
                    v-if="
                      book.authors.length > 1 &&
                      authorId !== book.authors.length - 1
                    "
                  >
                    ,
                  </span>
                </span>
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
              <span v-for="(author, authorId) in book.authors" :key="authorId">
                <span>{{ author.name }}</span>
                <span
                  v-if="
                    book.authors.length > 1 &&
                    authorId !== book.authors.length - 1
                  "
                >
                  ,
                </span>
              </span>
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
        app.$axios.$get(`/api/authors/${params.slug}`),
      ])

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
      componentKey: 0,
    }
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
      link: [
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
