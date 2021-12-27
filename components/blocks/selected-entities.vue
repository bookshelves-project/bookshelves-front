<template>
  <transition name="fade">
    <section
      v-if="isDisplay && !isLoading && entities"
      class="selected-books selected-entities-swiper max-w-7xl container mx-auto"
    >
      <div
        :class="selection.right ? 'text-right' : 'text-left'"
        class="text-sm font-semibold tracking-wide uppercase text-primary-600"
      >
        {{ selection.eyebrow }}
      </div>
      <h2
        :class="selection.right ? 'text-right' : 'text-left'"
        class="mt-3 text-3xl font-extrabold text-gray-700 dark:text-gray-300 font-handlee"
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
          class="flex items-center h-64 w-full animate-pulse overflow-hidden bg-gray-300 rounded-md"
        ></div>
        <client-only v-else>
          <swiper
            v-if="entities && entities.length > 1"
            ref="swiperMain"
            :options="main"
            class="h-64 w-full"
          >
            <swiper-slide v-for="(entity, index) in entities" :key="index">
              <blocks-entity-card
                :cover="entity.cover?.thumbnail"
                :color="entity.cover?.color"
                :title="entity.title"
                :route="{
                  name:
                    entity.meta.entity === 'author'
                      ? `authors-slug`
                      : `${entity.meta.entity}s-author-slug`,
                  params: {
                    author: entity.meta.author,
                    slug: entity.meta.slug,
                  },
                }"
                class="slide slide--thumbniail"
                :class="`slide--${index}`"
              >
                <template #title>
                  <div class="line-clamp-2">
                    {{ entity.title }}
                  </div>
                </template>
                <template #subtitle>
                  {{ capitalize(entity.meta.entity) }}
                </template>
                <template #extra>{{ formatAuthors(entity.authors) }}</template>
              </blocks-entity-card>
            </swiper-slide>
            <div slot="button-prev" class="swiper-button-prev">
              <svg-icon name="chevron-right" />
            </div>
            <div slot="button-next" class="swiper-button-next">
              <svg-icon name="chevron-right" />
            </div>
            <div slot="pagination" class="swiper-pagination"></div>
          </swiper>
        </client-only>
      </div>
    </section>
  </transition>
</template>

<script setup lang="ts">
import { ApiEndpoint, ApiResponse, Entity, SelectedEntities } from '~/types'
import { capitalize, formatAuthors, overflow } from '~/utils/methods'

const props = defineProps<{
  selection: SelectedEntities
}>()

const { $repository } = useContext()

const isLoading = ref(true)
const entities = ref<Entity[]>()
const isDisplay = ref(true)
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

const load = async () => {
  try {
    const api: ApiResponse<Entity[]> = await $repository(
      props.selection.endpoint as ApiEndpoint
    ).find()
    entities.value = api.data

    if (entities.value) {
      if (!entities.value.length) {
        isDisplay.value = false
      }
      isLoading.value = false
    }
  } catch (error) {
    console.error(error)
    isDisplay.value = false
  }
}

onMounted(() => {
  load()
})
</script>

<style lang="css" scoped>
.selected-entities-swiper::v-deep {
  & .swiper-button-prev {
    left: unset !important;
    @apply right-14 transform rotate-180;
  }
  & .swiper-button-prev,
  & .swiper-button-next {
    @apply absolute w-10 bottom-0 hover:bg-gray-300 transition-colors duration-100 rounded-md;
    & .icon {
      @apply w-8 h-8 m-auto text-gray-900;
    }
  }
  & .swiper-pagination {
    @apply cursor-default bottom-1;
    & .swiper-pagination-bullet {
      @apply bg-primary-600;
    }
    & .swiper-pagination-bullet-active {
      @apply bg-primary-600;
    }
  }
}

.dark {
  & .selected-entities-swiper::v-deep {
    & .swiper-button-prev,
    & .swiper-button-next {
      @apply hover:bg-gray-700;
      & .icon {
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
