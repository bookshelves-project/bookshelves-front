<template>
  <transition name="fade">
    <section
      v-if="isDisplay && !isLoading"
      class="
        selected-books selected-entities-swiper
        max-w-7xl
        container
        mx-auto
      "
    >
      <div
        :class="orientation"
        class="text-sm font-semibold tracking-wide uppercase text-primary-600"
      >
        <slot name="ontitle" />
      </div>
      <h2
        :class="orientation"
        class="
          mt-3
          text-3xl
          font-extrabold
          text-gray-700
          dark:text-gray-300
          font-handlee
        "
      >
        <slot name="title" />
      </h2>
      <p
        :class="[orientation, { 'max-w-3xl': orientation === null }]"
        class="mt-5 text-lg text-gray-900 dark:text-gray-100"
      >
        <slot name="text" />
      </p>
      <div class="mt-10">
        <div
          v-if="isLoading"
          class="
            flex
            items-center
            h-64
            w-full
            animate-pulse
            overflow-hidden
            bg-gray-300
            rounded-md
          "
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
                :cover="entity.cover.thumbnail"
                :color="entity.cover.color"
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
                <template #primary>
                  {{ $overflow(entity.title, 50) }}
                </template>
                <template #secondary>
                  {{ capitalize(entity.meta.entity) }}
                </template>
                <template #tertiary>
                  {{ formatAuthors(entity.authors) }}
                </template>
              </blocks-entity-card>
            </swiper-slide>
            <div slot="button-prev" class="swiper-button-prev">
              <svg-icon name="arrow-chevron-right" />
            </div>
            <div slot="button-next" class="swiper-button-next">
              <svg-icon name="arrow-chevron-right" />
            </div>
            <div slot="pagination" class="swiper-pagination"></div>
          </swiper>
        </client-only>
      </div>
    </section>
  </transition>
</template>

<script>
import { capitalize, formatAuthors } from '~/plugins/utils/methods'

export default {
  name: 'SelectedEntities',
  props: {
    endpoint: {
      type: String,
      default: '/books/selection',
    },
    orientation: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      capitalize,
      formatAuthors,
      isLoading: true,
      entities: null,
      isDisplay: true,
      main: {
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
      },
    }
  },
  async mounted() {
    await this.load()
  },
  methods: {
    async load() {
      try {
        const entities = await this.$axios.$get(this.endpoint)
        this.entities = entities.data
        if (!this.entities.length) {
          this.isDisplay = false
        }
        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isDisplay = false
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.selected-entities-swiper::v-deep {
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
