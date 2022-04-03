<script setup lang="ts">
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper'
import SvgIcon from '@/components/svg-icon.vue'
import EntityBookSliderCard from '@/components/entity/book/slider-card.vue'
import AppImg from '@/components/app/img.vue'
import AppButton from '@/components/app/button.vue'
import { Swiper as SwiperInterface } from 'swiper/types'

const props = defineProps<{
  entities?: Entity[]
  loaded: boolean
  route: object
}>()

const isLoaded = ref(false)
const main = {
  loop: false,
  spaceBetween: 10,
  grabCursor: true,
  modules: [Navigation],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}
const thumbs = {
  loop: false,
  spaceBetween: 10,
  slideToClickedSlide: true,
  slidesPerView: 1,
  grabCursor: true,
  paginationClickable: true,
  modules: [Pagination],
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
}
const swiperMain = ref<SwiperInterface>()
const swiperThumbs = ref<SwiperInterface>()

watch(
  () => props.loaded,
  (newVal) => {
    isLoaded.value = newVal
  }
)

const mainChange = () => {
  // if (swiperMain.value && swiperThumbs.value) {
  //   swiperThumbs.value.slideTo(swiperMain.value.activeIndex)
  // }
}
const thumbsChange = () => {
  if (swiperThumbs.value) {
    thumbsEvent(swiperThumbs.value.activeIndex)
  }
}
const thumbsEvent = (index: number) => {
  if (swiperMain.value) {
    swiperMain.value.slideTo(index)
  }
}
</script>

<template>
  <div class="books-slider relative book-books max-w-full overflow-hidden">
    <div class="py-5">
      <h2
        class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
      >
        <slot name="title" />
      </h2>
      <div lass="max-w-2xl mt-1 text-sm italic text-gray-500">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="py-5">
      <div v-if="!isLoaded" class="pt-2 pb-2 animate-pulse">
        <div class="flex space-x-6">
          <div class="bg-gray-300 dark:bg-gray-700 h-96 w-64 rounded-md"></div>
          <div class="mt-4 space-y-4">
            <div class="h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-700"></div>
            <div class="h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-700"></div>
            <div class="h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
        <div class="mt-6 flex items-center space-x-6">
          <div
            v-for="(i, id) in 5"
            :key="id"
            class="bg-gray-300 dark:bg-gray-700 h-20 w-20 rounded-md"
          ></div>
        </div>
      </div>
      <div v-else>
        <client-only>
          <section class="books-slider-swiper">
            <swiper
              ref="swiperMain"
              :space-between="main.spaceBetween"
              grab-cursor
              :navigation="main.navigation"
              :modules="main.modules"
              class="h-96 w-full"
              @slideChange="mainChange"
            >
              <swiper-slide
                v-for="(entity, id) in entities"
                :key="id"
                class="swiper-lazy"
              >
                <entity-book-slider-card :entity="entity" />
              </swiper-slide>
              <div class="swiper-button swiper-button-prev">
                <svg-icon name="chevron-right" />
              </div>
              <div class="swiper-button swiper-button-next">
                <svg-icon name="chevron-right" />
              </div>
            </swiper>
            <swiper
              ref="swiperThumbs"
              :space-between="thumbs.spaceBetween"
              grab-cursor
              :pagination="thumbs.pagination"
              :modules="thumbs.modules"
              :breakpoints="thumbs.breakpoints"
              class="h-28 w-full thumbs mt-6"
              @click-slide="thumbsEvent"
              @slideChange="thumbsChange"
            >
              <swiper-slide
                v-for="(entity, id) in entities"
                :key="id"
                class="hover:opacity-60 transition-opacity duration-100"
              >
                <app-img
                  class="w-full h-20 object-cover"
                  :src="entity.cover?.original"
                  :color="entity.cover?.color"
                  :title="entity.title"
                />
              </swiper-slide>
              <div class="swiper-pagination"></div>
            </swiper>
            <div v-if="route" class="mt-6">
              <app-button
                :to="route"
                class="w-full"
                color="white"
                align="center"
              >
                View all results
              </app-button>
            </div>
          </section>
        </client-only>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.books-slider {
  overflow: hidden;
}

.books-slider-swiper {
  & .swiper-button {
    top: unset;
    @apply absolute bottom-0 w-10 rounded-md transition-colors duration-100 hover:bg-gray-300;
  }
  & .swiper-button::after {
    content: none !important;
  }
  & .swiper-button-prev {
    left: unset !important;
    @apply right-14 rotate-180 transform;
  }
  & .swiper-button-prev,
  & .swiper-button-next {
    @apply absolute bottom-0 w-10 rounded-md text-primary-500 transition-colors duration-100 hover:bg-gray-300;
    & svg {
      @apply m-auto h-8 w-8 text-gray-900;
    }
  }
  & :deep(.swiper-pagination) {
    @apply bottom-1 cursor-default;
    & .swiper-pagination-bullet {
      @apply bg-primary-600;
    }
    & .swiper-pagination-bullet-active {
      @apply bg-primary-600;
    }
  }
}
.dark {
  & .books-slider-swiper {
    & .swiper-button-prev,
    & .swiper-button-next {
      @apply hover:bg-gray-700;
      & svg {
        @apply text-gray-400;
      }
    }
    & .swiper-pagination {
      & .swiper-pagination-bullet {
        @apply bg-primary-600 opacity-60;
      }
      & .swiper-pagination-bullet-active {
        @apply bg-primary-300 opacity-100;
      }
    }
  }
}
</style>
