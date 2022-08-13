<script setup lang="ts">
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue'
import { Pagination, Navigation, FreeMode, Thumbs } from 'swiper'
import { Swiper as SwiperInterface } from 'swiper/types'
import SvgIcon from '@/components/svg-icon.vue'
import EntitySliderCardThumbnail from '@/components/entity/group/slider-thumbnail.vue'
import AppImg from '@/components/app/img.vue'
import AppButton from '@/components/app/button.vue'

const props = defineProps<{
  entities?: Entity[]
  loaded: boolean
  route: Route
}>()

const isLoaded = ref(false)
const main = {
  loop: false,
  spaceBetween: 10,
  grabCursor: true,
  modules: [FreeMode, Navigation, Thumbs],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}
const thumbs = {
  loop: false,
  spaceBetween: 10,
  slideToClickedSlide: true,
  slidesPerView: 1,
  grabCursor: true,
  paginationClickable: true,
  modules: [Pagination, FreeMode, Navigation, Thumbs],
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    600: {
      slidesPerView: 2
    },
    900: {
      slidesPerView: 5
    },
    1300: {
      slidesPerView: 5
    }
  }
}
const swiperMain = ref<SwiperInterface>()
const swiperThumbs = ref<SwiperInterface>()
const thumbsSwiper = ref<SwiperInterface>()
const setThumbsSwiper = (swiper: SwiperInterface) => {
  thumbsSwiper.value = swiper
}

watch(
  () => props.loaded,
  (newVal) => {
    isLoaded.value = newVal
  }
)
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
          <div class="bg-gray-300 dark:bg-gray-700 h-96 w-64 rounded-md" />
          <div class="mt-4 space-y-4">
            <div class="h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-700" />
            <div class="h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-700" />
            <div class="h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
        <div class="mt-6 flex items-center space-x-6">
          <div
            v-for="(i, id) in 5"
            :key="id"
            class="bg-gray-300 dark:bg-gray-700 h-20 w-20 rounded-md"
          />
        </div>
      </div>
      <div v-else>
        <client-only>
          <section class="books-slider-swiper">
            <swiper
              ref="swiperMain"
              :loop="main.loop"
              :space-between="main.spaceBetween"
              :navigation="main.navigation"
              :thumbs="{ swiper: thumbsSwiper }"
              :modules="main.modules"
              class="h-96 w-full"
            >
              <swiper-slide
                v-for="(entity, id) in entities"
                :key="id"
                class="swiper-lazy"
              >
                <entity-group-card-thumbnail :entity="entity" />
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
              :loop="thumbs.loop"
              :space-between="thumbs.spaceBetween"
              :slides-per-view="thumbs.slidesPerView"
              :breakpoints="thumbs.breakpoints"
              :free-mode="true"
              :watch-slides-progress="true"
              :modules="thumbs.modules"
              class="h-28 w-full thumbs mt-6 hidden md:block"
              @swiper="setThumbsSwiper"
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
              <div class="swiper-pagination" />
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
