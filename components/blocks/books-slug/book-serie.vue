<template>
  <section aria-labelledby="notes-title" class="mt-5">
    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div class="px-4 py-5 sm:px-6">
          <h2 id="notes-title" class="text-lg font-medium text-gray-900">
            Serie
          </h2>
        </div>
        <div class="px-4 py-6 sm:px-6">
          <div v-swiper:mySwiper="swiperOption" class="max-w-2xl">
            <div class="swiper-wrapper">
              <div v-for="book in serie" :key="book.id" class="swiper-slide">
                <entity-card
                  :data="book"
                  :cover="book.cover.basic"
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
            <div class="swiper-pagination"></div>
          </div>
        </div>
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
