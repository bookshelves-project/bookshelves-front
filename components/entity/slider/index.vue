<script setup lang="ts">
import SvgIcon from '@/components/svg-icon.vue'
import EntityCard from '@/components/entity/card.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const props = defineProps<{
  selection: SelectedEntities
}>()

const { nuxtAsyncData } = useFetchable()
const attrs = useAttrs()
const emit = defineEmits<{
  (e: 'success', payload: boolean): void
}>()

const isAvailable = ref(true)
const isLoading = ref(true)

const modules = [Pagination, Navigation]

const slides = ref<Entity[]>()
const getData = async () => {
  isLoading.value = true
  slides.value = await nuxtAsyncData<Entity[]>(
    props.selection.endpoint,
    props.selection.paramsList ? props.selection.paramsList : [],
    {}
  ).then((e) => {
    if (e) {
      isLoading.value = false
      return e
    } else {
      isAvailable.value = false
    }
  })
  emit('success', isAvailable.value)
}

const main = {
  loop: false,
  spaceBetween: 10,
  slidesPerView: 1,
  slidesPerGroup: 1,
  grabCursor: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  paginationClickable: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    800: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
  },
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div v-if="isAvailable">
    <client-only>
      <section
        class="selected-books selected-entities-swiper relative mx-auto max-w-7xl"
        v-bind="attrs"
      >
        <div
          :class="selection.right ? 'text-right' : 'text-left'"
          class="text-sm font-semibold uppercase tracking-wide text-primary-600"
        >
          {{ selection.eyebrow }}
        </div>
        <h2
          :class="selection.right ? 'text-right' : 'text-left'"
          class="mt-3 font-handlee text-3xl font-extrabold text-gray-700 dark:text-gray-300"
        >
          {{ selection.title }}
        </h2>
        <p
          :class="selection.right ? 'text-right' : 'text-left'"
          class="mt-5 text-lg text-gray-900 dark:text-gray-100"
        >
          {{ selection.text }}
        </p>
        <div class="mt-10">
          <div
            v-if="isLoading"
            class="flex h-64 w-full animate-pulse items-center overflow-hidden rounded-md bg-gray-300 dark:bg-gray-600"
          ></div>
          <div v-else>
            <swiper
              :space-between="main.spaceBetween"
              grab-cursor
              :pagination="main.pagination"
              :navigation="main.navigation"
              :modules="modules"
              :breakpoints="main.breakpoints"
              class="relative !pb-10"
            >
              <swiper-slide
                v-for="(slide, index) in slides"
                :key="index"
                class="swiper-lazy"
              >
                <entity-card :entity="slide" />
              </swiper-slide>
              <div class="swiper-pagination"></div>
              <div class="swiper-button swiper-button-prev">
                <svg-icon name="chevron-right" />
              </div>
              <div class="swiper-button swiper-button-next">
                <svg-icon name="chevron-right" />
              </div>
            </swiper>
          </div>
        </div>
      </section>
    </client-only>
  </div>
</template>

<style lang="css" scoped>
.selected-entities-swiper {
  & .swiper-button {
    top: unset;
    @apply absolute bottom-0 w-10 rounded-md transition-colors duration-100 hover:bg-gray-300;
  }
  & .swiper-button::after {
    content: none !important;
  }
}
.selected-entities-swiper {
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
  & .selected-entities-swiper {
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
