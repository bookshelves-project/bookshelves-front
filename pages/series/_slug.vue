<template>
  <main class="container max-w-7xl">
    <div>
      <div class="items-center justify-between mb-8 lg:flex">
        <div class="items-center lg:flex">
          <img
            v-lazy="serie.cover"
            :alt="serie.title"
            class="object-cover object-center w-32 h-32 mx-auto rounded-full lg:w-16 lg:h-16 lg:mx-0"
          />
          <div class="ml-4">
            <h1 class="text-3xl font-semibold text-center lg:text-left">
              {{ serie.title }}
            </h1>
            <nuxt-link
              :to="{
                name: 'authors-slug',
                params: { slug: serie.author.slug },
              }"
              class="text-gray-900 hover:text-gray-500"
            >
              <h2 class="text-xl text-center lg:text-left">
                {{ serie.author.name }}
              </h2>
            </nuxt-link>
          </div>
        </div>
        <div
          class="block mt-5 lg:block md:items-center md:justify-between md:flex lg:mt-0"
        >
          <a
            :href="serie.download"
            class="inline-flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-semibold text-white transition-colors duration-300 bg-blue-600 border border-transparent rounded-md shadow-sm md:mx-0 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 md:w-max"
          >
            <icon name="download" />
            <div class="flex items-center ml-2">
              <div class="mx-1">Download</div>
              <div class="hidden md:mr-1 md:block">
                {{ serie.title }}
              </div>
              <div>({{ serie.size }})</div>
            </div>
          </a>
          <div
            v-if="serie.language"
            class="flex mx-auto lg:ml-auto lg:mx-0 md:items-center lg:flex md:justify-end lg:mt-5 md:mx-0 w-max"
          >
            <span class="font-semibold">Language : </span>
            <img
              :src="serie.language.flag"
              :alt="serie.language.slug"
              class="ml-2"
            />
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
          :cover="book.cover.thumbnail"
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
export default {
  name: 'SeriesSlug',
  components: { entityCard },
  async asyncData({ app, query, error, params, $content, store }) {
    try {
      const [serie] = await Promise.all([
        app.$axios.$get(`/api/series/${params.slug}`),
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
    const title = `${this.serie.title} - Series`
    const description = `Written by ${this.serie.author.name} with ${this.serie.books_number} books.`
    const image = this.serie.cover
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
          href: `${process.env.BASE_URL}/series/${this.serie.slug}`,
        },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped></style>
