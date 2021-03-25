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
            v-lazy="author.picture.base"
            :alt="author.name"
            class="object-cover object-center w-32 h-32 mx-auto rounded-full lg:w-16 lg:h-16 lg:mx-0"
          />
          <h1
            class="mt-2 ml-4 text-3xl font-semibold text-center lg:mt-0 font-handlee lg:text-left"
          >
            {{ author.name }}
          </h1>
        </div>
        <div class="flex mt-5 lg:mt-0">
          <a
            :href="author.download"
            class="inline-flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-semibold text-white transition-colors duration-300 border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500 sm:w-max"
          >
            <icon name="download" />
            <div class="flex items-center ml-2">
              <div class="flex mx-1">
                <span class="lg:mr-1">Download</span>
                <span class="hidden md:block"
                  >{{ author.books_number }} eBooks</span
                >
              </div>
              <div>(ZIP {{ author.size }})</div>
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
      <div class="space-y-6 display-grid sm:space-y-0">
        <entity-card
          v-for="book in author.books"
          :key="book.id"
          :data="book"
          :cover="book.picture"
          :route="{
            name: 'books-slug',
            params: { author: book.author, slug: book.slug },
          }"
        >
          <template #primary>
            {{ $overflow(book.title, 50) }}
          </template>
          <template v-if="book.serie" #secondary>
            {{ book.serie.title }}, vol. {{ book.serie.number }}
          </template>
          <template v-if="book.language" #tertiary>
            <div class="font-semibold">Language &#8212;</div>
            <img :src="book.language.flag" :alt="book.language.slug" />
          </template>
        </entity-card>
      </div>
    </div>
  </main>
</template>

<script>
import entityCard from '~/components/blocks/entity-card.vue'
export default {
  name: 'AuthorsSlug',
  components: { entityCard },
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
    const image = this.author.picture.openGraph
    const author = this.author.name
    const authorFirstname = this.author.firstname
    const authorLastname = this.author.lastname
    const authorUsername = this.author.slug
    const url = `${process.env.BASE_URL}/authors/${this.author.slug}`
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
          hid: 'og:image:type',
          property: 'og:image:type',
          content: 'image/jpg',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        // og author
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'book.author',
        },
        {
          hid: 'book:author',
          property: 'book:author',
          content: author,
        },
        {
          hid: 'profile:first_name',
          property: 'profile:first_name',
          content: authorFirstname,
        },
        {
          hid: 'profile:last_name',
          property: 'profile:last_name',
          content: authorLastname,
        },
        {
          hid: 'profile:username',
          property: 'profile:username',
          content: authorUsername,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url,
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
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
}
</script>
