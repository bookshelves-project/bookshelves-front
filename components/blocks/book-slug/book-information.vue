<template>
  <div class="space-y-6 xl:col-start-1 xl:col-span-2">
    <!-- Description list-->
    <section aria-labelledby="applicant-information-title">
      <div class="bg-white shadow sm:rounded-lg">
        <div v-if="book.serie" class="px-4 py-5 sm:px-6">
          <h2
            id="applicant-information-title"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            Serie: {{ book.serie }}
          </h2>
          <p class="max-w-2xl mt-1 text-sm text-gray-500">
            Volume: {{ book.serieNumber }}
          </p>
        </div>
        <div
          :class="{ 'border-t border-gray-200': book.serie }"
          class="px-4 py-5 sm:px-6"
        >
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Author</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ book.author.lastname }}, {{ book.author.firstname }}
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Publisher</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ book.publisher }} ({{ getDate(book.publishDate) }})
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Language</dt>
              <dd class="flex items-center mt-1 text-sm text-gray-900">
                <img
                  :src="`https://www.countryflags.io/${book.language}/flat/32.png`"
                  alt=""
                />
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">ISBN</dt>
              <dd class="mt-1 text-sm text-gray-900">
                <span v-if="isbn">
                  {{ book.isbn }}
                </span>
                <span class="italic text-gray-400">Undefined</span>
              </dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">About</dt>
              <dd
                v-if="book.description"
                class="mt-1 text-sm text-gray-900 word-wraping"
              >
                {{ book.description }}...
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import isbn from 'node-isbn'
export default {
  name: 'BookInformation',
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isbn: null,
    }
  },
  mounted() {
    this.checkIsbn()
  },
  methods: {
    getDate(date) {
      date = new Date(date)
      // define options
      let userLang = 'en'
      // for Nuxt
      if (process.client) {
        userLang = navigator.language || navigator.userLanguage
      }

      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      const dateToStringLocale = date.toLocaleString(userLang, dateOptions)

      return dateToStringLocale
    },
    checkIsbn() {
      // eslint-disable-next-line no-unused-vars
      const isbnNumber = this.book.isbn
      isbn
        .resolve(isbnNumber)
        .then(function (book) {
          console.log('Book found %j', book)
          this.isbn = book
        })
        .catch(function (err) {
          console.log('Book not found', err)
        })
    },
  },
}
</script>

<style lang="postcss" scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
