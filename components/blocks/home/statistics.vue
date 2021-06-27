<template>
  <div class="relative mt-6 statistics">
    <div class="absolute bottom-0 w-full h-80">
      <div class="h-full">
        <img
          class="object-cover w-full h-full opacity-25"
          src="/images/library.webp"
          alt="Library"
          loading="lazy"
        />
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white dark:from-gray-900"
        ></div>
      </div>
    </div>
    <div class="px-4 mx-auto sm:px-6 max-w-7xl">
      <div class="relative pt-12 pb-64 sm:pt-24 sm:pb-64">
        <h2
          class="text-sm font-semibold tracking-wide uppercase text-primary-600"
        >
          A quick tour of eBooks count
        </h2>
        <p
          class="mt-3 text-3xl font-extrabold text-gray-700 dark:text-gray-300 font-handlee"
        >
          Lots of ebooks for ever more insatiable readers
        </p>
        <p class="max-w-3xl mt-5 text-lg text-gray-900 dark:text-gray-100">
          More and more eBooks for more and more reading, each day brings its
          own novelties (or almost). Don't hesitate to come back from time to
          time to discover the new books.
        </p>
        <div
          class="grid grid-cols-1 mt-12 gap-y-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <p
            v-for="metric in metrics"
            :key="metric.id"
            class="transition-colors duration-100 rounded-md hover:bg-gray-300 hover:bg-opacity-50"
          >
            <nuxt-link :to="metric.route" class="block p-2">
              <span
                class="block text-2xl font-bold text-gray-700 dark:text-gray-300"
              >
                {{ metric.data }}
              </span>
              <span
                class="block mt-1 text-base text-gray-900 dark:text-gray-100"
                ><span class="font-medium text-gray-700 dark:text-gray-300">
                  {{ metric.textTitle }}
                </span>
                <span v-html="metric.text"></span>
              </span>
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  data() {
    return {
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
          route: { name: 'books', query: { lang: 'fr' } },
          data: 0,
          textTitle: '',
          text: 'eBooks in french',
        },
        booksEn: {
          route: { name: 'books', query: { lang: 'en' } },
          data: 0,
          textTitle: '',
          text: 'eBooks in english',
        },
      },
    }
  },
  created() {
    this.getStats()
  },
  methods: {
    async getStats() {
      let booksCount = 0
      let seriesCount = 0
      let authorsCount = 0
      let countBooksFr = 0
      let countBooksEn = 0
      if (!this.$store.state.statistics) {
        try {
          ;[
            booksCount,
            seriesCount,
            authorsCount,
            countBooksFr,
            countBooksEn,
          ] = await Promise.all([
            this.$axios.$get('/count?entity=book'),
            this.$axios.$get('/count?entity=serie'),
            this.$axios.$get('/count?entity=author'),
            this.$axios.$get('/count?entity=book&lang=fr'),
            this.$axios.$get('/count?entity=book&lang=en'),
          ])

          this.$store.commit('setStatistics', {
            booksCount,
            seriesCount,
            authorsCount,
            countBooksFr,
            countBooksEn,
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        const stats = this.$store.state.statistics

        booksCount = stats.booksCount
        seriesCount = stats.seriesCount
        authorsCount = stats.authorsCount
        countBooksFr = stats.countBooksFr
        countBooksEn = stats.countBooksEn
      }

      this.metrics.books.data = booksCount
      this.metrics.series.data = seriesCount
      this.metrics.authors.data = authorsCount
      this.metrics.booksFr.data = countBooksFr
      this.metrics.booksEn.data = countBooksEn
    },
  },
}
</script>

<style lang="postcss" scoped></style>
