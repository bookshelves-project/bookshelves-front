<template>
  <section>
    <div
      class="
        books-slider
        sm:rounded-lg
        relative
        book-books
        max-w-full
        overflow-hidden
      "
    >
      <div class="py-5">
        <h2
          class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
        >
          <slot name="title" />
        </h2>
        <p class="max-w-2xl mt-1 text-sm italic text-gray-500">
          <slot name="subtitle" />
        </p>
      </div>
      <div class="py-5">
        <client-only v-if="isLoaded">
          <section class="books-slider-swiper">
            <swiper
              ref="swiperMain"
              :options="main"
              class="h-96 w-full"
              @slideChange="mainChange"
            >
              <swiper-slide v-for="book in books" :key="book.id">
                <blocks-book-slider-card :book="book" />
              </swiper-slide>
              <div slot="button-prev" class="swiper-button-prev">
                <svg-icon name="arrow-chevron-right" />
              </div>
              <div slot="button-next" class="swiper-button-next">
                <svg-icon name="arrow-chevron-right" />
              </div>
            </swiper>
            <swiper
              ref="swiperThumbs"
              :options="thumbs"
              class="h-28 w-full thumbs mt-6"
              @click-slide="thumbsEvent"
              @slideChange="thumbsChange"
            >
              <swiper-slide
                v-for="book in books"
                :key="book.id"
                class="hover:opacity-60 transition-opacity duration-100"
              >
                <app-img
                  class="w-full h-20 object-cover"
                  :src="book.cover.original"
                  :color="book.cover.color"
                  :title="book.title"
                />
              </swiper-slide>
              <div slot="pagination" class="swiper-pagination"></div>
            </swiper>
          </section>
        </client-only>
        <div v-else class="pt-2 pb-2 animate-pulse">
          <div class="flex space-x-6">
            <div class="bg-gray-300 h-96 w-64 rounded-md"></div>
            <div class="mt-4 space-y-4">
              <div class="h-8 w-48 rounded-md bg-gray-300"></div>
              <div class="h-8 w-48 rounded-md bg-gray-300"></div>
              <div class="h-8 w-48 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div class="mt-6 flex items-center space-x-6">
            <div
              v-for="i in 5"
              :key="i.id"
              class="bg-gray-300 h-20 w-20 rounded-md"
            ></div>
          </div>
        </div>
        <div
          v-if="!isLoaded && !books.length"
          class="px-2 text-sm italic text-gray-400 dark:text-gray-200"
        >
          No results.
        </div>
        <div v-if="link" class="mt-6">
          <app-button
            :to="localePath(link)"
            class="w-full"
            color="white"
            align="center"
          >
            View full results
          </app-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BookSlider',
  props: {
    bookData: {
      type: Object,
      default: () => {},
    },
    loaded: {
      type: Boolean,
      default: false,
    },
    books: {
      type: Array,
      default: () => [],
    },
    link: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    return {
      isLoaded: false,
      main: {
        loop: false,
        spaceBetween: 10,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      thumbs: {
        loop: false,
        spaceBetween: 10,
        slideToClickedSlide: true,
        slidesPerView: 1,
        grabCursor: true,
        paginationClickable: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          500: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        },
      },
    }
  },
  watch: {
    loaded(newValue, oldValue) {
      this.isLoaded = newValue
    },
  },
  methods: {
    mainChange() {
      const main = this.$refs.swiperMain.$swiper
      const thumbs = this.$refs.swiperThumbs.$swiper
      thumbs.slideTo(main.activeIndex)
    },
    thumbsChange() {
      const thumbs = this.$refs.swiperThumbs.$swiper
      this.thumbsEvent(thumbs.activeIndex)
    },
    thumbsEvent(index) {
      const main = this.$refs.swiperMain.$swiper
      main.slideTo(index)
    },
  },
}
</script>

<style lang="postcss" scoped>
.books-slider::v-deep {
  overflow: hidden;
}
.books-slider-swiper::v-deep {
  & .swiper-button-prev {
    left: unset !important;
    @apply right-14 transform rotate-180 !important;
  }
  & .swiper-button-prev,
  & .swiper-button-next {
    @apply absolute w-10 bottom-0 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-100 rounded-md !important;
    & .icon {
      @apply w-8 h-8 m-auto text-gray-900 dark:text-gray-400 !important;
    }
  }
  & .swiper-pagination {
    @apply cursor-default bottom-1;
    & .swiper-pagination-bullet {
      @apply bg-primary-600 dark:bg-primary-600 dark:opacity-60;
    }
    & .swiper-pagination-bullet-active {
      @apply bg-primary-600 dark:bg-primary-300 dark:opacity-100;
    }
  }
}
</style>
