<template>
  <section v-if="isDisplay" class="selected-books max-w-7xl container mx-auto">
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
        <agile
          v-if="entities && entities.length > 1"
          ref="slider"
          class="slider overflow-hidden"
          :options="options"
        >
          <entity-card
            v-for="(entity, index) in entities"
            :key="index"
            :cover="entity.picture.thumbnail"
            :color="entity.picture.color"
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
          </entity-card>
          <template slot="prevButton">
            <svg-icon
              name="arrow-chevron-right"
              class="
                w-8
                h-8
                m-auto
                text-gray-900
                dark:text-gray-400
                arrow-rotate
              "
            />
          </template>
          <template slot="nextButton">
            <svg-icon
              name="arrow-chevron-right"
              class="w-8 h-8 m-auto text-gray-900 dark:text-gray-400"
            />
          </template>
        </agile>
      </client-only>
    </div>
  </section>
</template>

<script>
// https://github.com/lukaszflorczak/vue-agile
import { VueAgile } from 'vue-agile'
import EntityCard from './entity-card.vue'
import { capitalize, formatAuthors } from '~/plugins/utils/methods'

export default {
  name: 'SelectedEntities',
  components: {
    agile: VueAgile,
    EntityCard,
  },
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
      options: {
        autoplay: false,
        centerMode: true,
        dots: true,
        navButtons: true,
        infinite: true,
        slidesToShow: 1,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              navButtons: true,
            },
          },
        ],
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

<style lang="postcss">
.arrow-rotate {
  transform: rotate(180deg);
}
.slide--thumbniail {
  transition: opacity 0.3s !important;
}
.selected-books {
  img {
    @apply rounded-sm;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  }
  & .slider {
    @apply mt-5;
    & .agile__actions {
      @apply w-full mt-6 relative;
      & .agile__nav-button {
        @apply cursor-pointer hover:bg-gray-200 hover:bg-opacity-80;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      & .agile__nav-button:hover {
        color: #888;
      }
      & .agile__nav-button--prev {
        left: 0;
        bottom: -1.5rem;
      }
      & .agile__nav-button--next {
        right: 0;
        bottom: -1.5rem;
      }
      & .slide--thumbniail {
        cursor: grab;
        padding: 0 5px;
        & :hover {
          opacity: 0.75;
        }
      }
    }
  }
  & .agile__nav-button {
    background: transparent;
    border: none;
    color: #ccc;
    cursor: grab;
    font-size: 24px;
    transition-duration: 0.3s;
  }
  & .agile__dots {
    @apply w-full flex-wrap justify-center;
  }
  & .agile__dot {
    & button {
      @apply border mx-2 my-1 border-solid border-primary-600 dark:border-primary-300 rounded-full bg-transparent cursor-pointer block h-3 w-3 duration-300;
    }
  }
  & .agile__dot--current button,
  & .agile__dot:hover button {
    @apply bg-primary-600 dark:bg-primary-300;
  }

  & .main {
    & .agile__actions {
      @apply w-full;
    }
    & .agile__nav-button {
      @apply h-16 w-16 duration-300 bg-transparent border-none cursor-pointer text-2xl relative lg:bottom-0 lg:absolute;
    }
    & .slide {
      align-items: center;
      box-sizing: border-box;
      color: #fff;
      display: flex;
      justify-content: center;
      padding: 0 5px;
    }
    & .agile__nav-button:hover {
      background-color: rgba(0, 0, 0, 0.3);
      opacity: 1;
    }
    & .agile__nav-button--prev {
      @apply right-0 lg:right-20;
    }
    & .agile__nav-button--next {
      right: 0;
    }
  }
}
</style>
