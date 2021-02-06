<template>
  <section
    aria-labelledby="timeline-title"
    class="xl:col-start-2 xl:col-span-1"
  >
    <div class="px-4 py-5 shadow sm:rounded-lg sm:px-6 dark:bg-gray-800">
      <h2 id="timeline-title" class="text-lg font-medium text-gray-900">
        Series
      </h2>
      <p class="max-w-2xl mt-1 text-sm text-gray-500">
        Current volume {{ book.serie.number }}
      </p>

      <!-- Activity Feed -->
      <div>
        <div v-swiper:mySwiper="swiperOption" class="max-w-2xl">
          <div class="swiper-wrapper">
            <div
              v-for="bookSerie in serie"
              :key="bookSerie.id"
              class="relative swiper-slide"
            >
              <entity-card
                :data="bookSerie"
                :cover="bookSerie.cover.basic"
                :route="{
                  name: 'books-slug',
                  params: {
                    author: bookSerie.author.slug,
                    slug: bookSerie.slug,
                  },
                }"
              >
                <template #title>
                  <div>
                    <div
                      :class="{
                        'absolute top-0 left-0 right-0 bottom-14 rounded-sm bg-purple-200 bg-opacity-50':
                          bookSerie.serie.number === book.serie.number,
                      }"
                    ></div>
                    {{ $overflow(bookSerie.title) }}
                  </div>
                </template>
                <template #hover>
                  <div>
                    <div class="font-semibold">Author &#8212;</div>
                    <div class="italic">
                      {{ bookSerie.author.name }}
                    </div>
                  </div>
                  <div v-if="bookSerie.serie" class="mt-5">
                    <div class="font-semibold">Serie &#8212;</div>
                    <div class="italic break-all">
                      {{ bookSerie.serie.title }}
                    </div>
                    <div>Vol. {{ bookSerie.serie.number }}</div>
                  </div>
                </template>
                <template #title-responsive>
                  <div class="font-semibold">
                    {{ bookSerie.title }}
                  </div>
                  <div class="italic">
                    {{ bookSerie.author.name }}
                  </div>
                  <div v-if="bookSerie.serie">
                    {{ bookSerie.serie.title }}, vol.
                    {{ bookSerie.serie.number }}
                  </div>
                </template>
              </entity-card>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="flex flex-col mt-6 justify-stretch">
        <nuxt-link
          :to="{ name: 'series-slug', params: { slug: book.serie.slug } }"
          class="inline-flex items-center justify-center px-4 py-2 mx-auto text-sm font-medium font-semibold text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:w-max"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
            ></path>
          </svg>
          <span class="mx-1"> See series {{ book.serie.title }} </span>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import entityCard from '../entity-card.vue'
export default {
  name: 'BookSerie',
  components: { entityCard },
  props: {
    serie: {
      type: Array,
      default: () => [],
    },
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      banners: ['/bookshelves.png', '/bookshelves.png', '/bookshelves.png'],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        breakpoints: {
          '@0.75': {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 40,
          },
          '@1.25': {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40,
          },
          '@1.75': {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
          },
        },
        lazy: {
          loadPrevNext: true,
        },
        flipEffect: {
          slideShadows: false,
        },
      },
    }
  },
  mounted() {
    // console.log('Current Swiper instance object', this.mySwiper)
  },
}
</script>

<style lang="postcss" scoped>
.swiper-container {
  @apply pb-10 pt-8 !important;
  cursor: grab;
}

.swiper-pagination {
  @apply bottom-2.5;
}

/deep/ .swiper-pagination-bullet {
  @apply bg-black bg-opacity-50 !important;
}

/deep/ .swiper-pagination-bullet-active {
  @apply bg-black bg-opacity-25 !important;
}
</style>
