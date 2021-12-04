<template>
  <div class="relative mt-6 statistics">
    <div class="absolute bottom-0 w-full h-80">
      <div class="h-full">
        <img
          v-lazy-load
          class="object-cover w-full h-full opacity-25"
          src="/images/library.webp"
        >
        <div
          aria-hidden="true"
          class="
            absolute
            inset-x-0
            top-0
            h-32
            bg-gradient-to-b
            from-white
            dark:from-gray-900
          "
        />
      </div>
    </div>
    <div class="px-4 mx-auto sm:px-6 max-w-7xl">
      <div class="relative pt-12 pb-64 sm:pt-24 sm:pb-64">
        <h2
          class="text-sm font-semibold tracking-wide uppercase text-primary-600"
        >
          {{ statistics.eyebrow }}
        </h2>
        <p
          class="
            mt-3
            text-3xl
            font-extrabold
            text-gray-700
            dark:text-gray-300
            font-handlee
          "
        >
          {{ statistics.title }}
        </p>
        <div class="max-w-3xl mt-5 text-lg text-gray-900 dark:text-gray-100">
          {{ statistics.text }}
        </div>
        <div
          class="
            grid grid-cols-1
            mt-12
            gap-y-12 gap-x-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          <div
            v-for="(metric, id) in statistics.list"
            :key="id"
            class="
              transition-colors
              duration-100
              rounded-md
              hover:bg-gray-300
              dark:hover:bg-gray-600
              hover:bg-opacity-50
            "
          >
            <div class="block p-2">
              <span
                class="
                  block
                  text-2xl
                  font-bold
                  text-gray-700
                  dark:text-gray-300
                "
              >
                {{ metric.count }}
              </span>
              <span
                class="block mt-1 text-base text-gray-900 dark:text-gray-100"
              ><span class="font-medium text-gray-700 dark:text-gray-300">
                {{ metric.label }}
              </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Statistics } from '~/types/cms/home-page'

@Component
export default class HomeStatistics extends Vue {
  @Prop({ type: Object, required: true }) statistics!: Statistics
}
</script>

<!-- <script>
export default {
  name: 'Statistics',
  data() {
    return {
      isLoading: true,
      metrics: {
        books: {
          route: { name: 'books' },
          data: 0,
          textTitle: 'eBooks',
          text: `available on ${this.$config.appName}`,
        },
        series: {
          route: { name: 'series' },
          data: 0,
          textTitle: 'Series',
          text: 'of eBooks',
        },
        authors: {
          route: { name: 'authors' },
          data: 0,
          textTitle: 'Authors',
          text: 'who wrote these eBooks',
        },
        booksFr: {
          route: { name: 'books', query: { 'filter[languages]': 'fr' } },
          data: 0,
          textTitle: '',
          text: 'eBooks in french',
        },
        booksEn: {
          route: { name: 'books', query: { 'filter[languages]': 'en' } },
          data: 0,
          textTitle: '',
          text: 'eBooks in english',
        },
      },
    }
  },
  async mounted() {
    await this.getStats()
  },
  methods: {
    async getStats() {
      try {
        const count = await this.$axios.$get(
          '/count?entities=book,serie,author&languages=fr,en'
        )

        const entities = count.data.entities
        const languages = count.data.languages

        this.metrics.books.data = entities.book
        this.metrics.series.data = entities.serie
        this.metrics.authors.data = entities.author

        this.metrics.booksFr.data = languages.fr
        this.metrics.booksEn.data = languages.en
      } catch (error) {
        console.error(error)
      }

      this.isLoading = false
    },
  },
}
</script> -->
