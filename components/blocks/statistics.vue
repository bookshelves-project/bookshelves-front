<template>
  <div class="relative bg-white">
    <div class="absolute bottom-0 w-full h-80">
      <div class="h-full">
        <img
          class="object-cover w-full h-full opacity-25"
          src="/images/library.webp"
          alt="Library"
        />
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white"
        ></div>
      </div>
    </div>
    <div class="px-4 mx-auto sm:px-6 max-w-7xl">
      <div class="relative pt-12 pb-64 sm:pt-24 sm:pb-64">
        <h2
          class="text-sm font-semibold tracking-wide text-indigo-700 uppercase"
        >
          A quick tour
        </h2>
        <p class="mt-3 text-3xl font-extrabold text-gray-700">
          Lots of ebooks for ever more insatiable readers
        </p>
        <p class="mt-5 text-lg text-gray-900">
          Rhoncus sagittis risus arcu erat lectus bibendum. Ut in adipiscing
          quis in viverra tristique sem. Ornare feugiat viverra eleifend fusce
          orci in quis amet. Sit in et vitae tortor, massa. Dapibus laoreet amet
          lacus nibh integer quis. Eu vulputate diam sit tellus quis at.
        </p>
        <div class="grid grid-cols-1 mt-12 gap-y-12 gap-x-6 sm:grid-cols-3">
          <p
            v-for="metric in metrics"
            :key="metric.id"
            class="transition-colors duration-100 rounded-md hover:bg-gray-300 hover:bg-opacity-50"
          >
            <nuxt-link :to="{ name: metric.route }" class="block p-2">
              <span class="block text-2xl font-bold text-gray-700">
                {{ metric.data }}
              </span>
              <span class="block mt-1 text-base text-gray-900"
                ><span class="font-medium text-gray-700">
                  {{ metric.textTitle }}
                </span>
                {{ metric.text }}
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
  props: {
    books: {
      type: Number,
      default: 0,
    },
    series: {
      type: Number,
      default: 0,
    },
    authors: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      metrics: [
        {
          route: 'books',
          data: this.books,
          textTitle: 'eBooks',
          text: 'available on Bookshelves',
        },
        {
          route: 'series',
          data: this.series,
          textTitle: 'Series',
          text: 'of eBooks',
        },
        {
          route: 'authors',
          data: this.authors,
          textTitle: 'Authors',
          text: 'who write these eBooks',
        },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped></style>
