<template>
  <main class="container max-w-7xl">
    <div>
      <div class="items-center justify-between mb-8 lg:flex">
        <div class="items-center lg:flex">
          <img
            v-lazy="serie.image"
            :alt="serie.title"
            class="object-cover object-center w-32 h-32 mx-auto rounded-full lg:w-16 lg:h-16 lg:mx-0"
          />
          <div class="ml-4">
            <h1
              class="text-3xl font-semibold text-center font-handlee lg:text-left"
            >
              {{ serie.title }}
            </h1>
            <div class="mt-2 text-center lg:text-left lg:mt-0">
              <span
                v-for="(author, authorId) in serie.authors"
                :key="authorId"
                class="mr-1"
              >
                <nuxt-link
                  :to="{ name: 'authors-slug', params: { slug: author.slug } }"
                  class="text-gray-900 border-b border-gray-600 dark:border-gray-100 hover:text-gray-500 hover:border-gray-500"
                  >{{ author.name }}</nuxt-link
                >
                <span
                  v-if="
                    serie.authors.length > 1 &&
                    authorId !== serie.authors.length - 1
                  "
                  class="text-gray-900 dark:text-gray-100"
                  >&</span
                >
              </span>
            </div>
          </div>
        </div>
        <div class="block mt-5 lg:block lg:mt-0">
          <div class="flex">
            <a
              :href="serie.download"
              class="inline-flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-semibold text-white transition-colors duration-300 bg-blue-600 border border-transparent rounded-md shadow-sm lg:mx-0 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 sm:w-max"
            >
              <icon name="download" />
              <div class="flex items-center ml-2">
                <div class="mx-1">Download</div>
                <div class="hidden lg:mr-1 lg:block">
                  {{ serie.title }}
                </div>
                <div>(ZIP {{ serie.size }})</div>
              </div>
            </a>
          </div>
          <div class="flex mx-auto w-max">
            <div
              v-if="serie.language"
              class="flex mt-2 w-max lg:ml-auto lg:mx-0 md:items-center lg:flex md:justify-end md:mx-0"
            >
              <span class="font-semibold text-gray-900 dark:text-gray-100"
                >Language :
              </span>
              <img
                :src="serie.language.flag"
                :alt="serie.language.slug"
                class="ml-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="relative mt-5 mb-10">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-2 text-gray-500 bg-white dark:bg-gray-900">
            {{ serie.books_number }} Books
          </span>
        </div>
      </div>
      <div
        class="grid grid-cols-1 gap-4 2xl:grid-cols-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
      >
        <entity-card
          v-for="book in serie.books"
          :key="book.id"
          :data="book"
          :cover="book.image"
          :route="{
            name: 'books-slug',
            params: { author: book.author, slug: book.slug },
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
            <div v-if="book.serie">Vol. {{ book.serie.number }}</div>
          </template>
        </entity-card>
      </div>
    </div>
  </main>
</template>

<script>
import entityCard from '~/components/blocks/entity-card.vue'
export default {
  name: 'SeriesSlug',
  components: { entityCard },
  async asyncData({ app, query, error, params, $content, store }) {
    try {
      const [serie] = await Promise.all([
        app.$axios.$get(`/api/series/${params.author}/${params.slug}`),
      ])

      return {
        serie: serie.data,
      }
    } catch (error) {
      console.error(error)

      return {
        serie: {},
      }
    }
  },
  data() {
    return {
      componentKey: 0,
    }
  },
  head() {
    let authors = ''
    this.serie.authors.forEach((author, authorId) => {
      authors += `${author.name}`
      if (
        this.serie.authors.length > 1 &&
        authorId !== this.serie.authors.length - 1
      ) {
        authors += ' & '
      }
    })
    const title = `${this.serie.title} - Series`
    const description = `Written by ${authors} with ${this.serie.books_number} books.`
    const image = this.serie.imageStandard
    const url = `${process.env.BASE_URL}/series/${this.serie.slug}`
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
        {
          hid: 'og:url',
          property: 'og:url',
          content: url,
        },
        {
          hid: 'book:author',
          property: 'books:author',
          content: authors,
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
