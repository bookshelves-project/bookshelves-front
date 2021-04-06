<template>
  <section
    aria-labelledby="timeline-title"
    class="xl:col-start-2 xl:col-span-1 book-serie"
  >
    <div class="px-4 py-5 shadow sm:rounded-lg sm:px-6 dark:bg-gray-800">
      <h2 id="timeline-title" class="text-lg font-medium text-gray-900">
        Series
      </h2>
      <p class="max-w-2xl mt-1 text-sm text-gray-500">
        Current: vol. {{ book.serieVolume }}
      </p>
      <div class="mt-5">
        <agile
          ref="main"
          class="main"
          :options="options1"
          :as-nav-for="asNavFor1"
        >
          <div
            v-for="(bookSerie, index) in serie"
            :key="index"
            class="slide"
            :class="`slide--${index}`"
          >
            <div class="grid w-full h-full grid-cols-2">
              <div class="col-span-1">
                <img
                  v-lazy="bookSerie.picture.original"
                  class="object-cover object-top w-full h-full"
                />
              </div>
              <div class="col-span-1 mt-3 ml-0 space-y-2 lg:ml-3 lg:mt-0">
                <div>
                  <span
                    class="text-sm font-medium text-gray-500 dark:text-gray-500"
                    >Title
                  </span>
                  <h3 class="font-semibold text-black">
                    {{ bookSerie.title }}
                  </h3>
                </div>
                <div>
                  <div>
                    <span
                      class="text-sm font-medium text-gray-500 dark:text-gray-500"
                      >Authors
                    </span>
                    <h3 class="font-semibold">
                      <span
                        v-for="(author, authorId) in bookSerie.authors"
                        :key="authorId"
                        class="mr-1"
                      >
                        <nuxt-link
                          :to="{
                            name: 'authors-slug',
                            params: { slug: bookSerie.author },
                          }"
                          class="text-gray-900 transition-colors duration-100 border-b border-gray-500 dark:border-gray-100 dark:hover:border-gray-400 hover:border-gray-400 hover:text-gray-400"
                          >{{ author.name }}</nuxt-link
                        >
                        <span
                          v-if="
                            book.authors.length > 1 &&
                            authorId !== book.authors.length - 1
                          "
                          >&</span
                        >
                      </span>
                    </h3>
                  </div>
                </div>
                <div>
                  <span
                    class="text-sm font-medium text-gray-500 dark:text-gray-500"
                    >Volume
                  </span>
                  <h3 class="font-semibold text-black">
                    {{ bookSerie.serieVolume }}
                  </h3>
                </div>
                <div class="pt-6">
                  <v-button
                    v-if="$route.params.slug !== bookSerie.slug"
                    :color="`white`"
                    :component="`nuxt-link`"
                    :link="{
                      name: 'books-slug',
                      params: {
                        author: bookSerie.author,
                        slug: bookSerie.slug,
                      },
                    }"
                    >Refer to book</v-button
                  >
                  <span v-else class="italic text-gray-500">Current page</span>
                </div>
              </div>
            </div>
          </div>
          <template slot="prevButton">
            <icon-chevron-left class="w-8 h-8 m-auto text-gray-900" />
          </template>
          <template slot="nextButton">
            <icon-chevron-right class="w-8 h-8 m-auto text-gray-900" />
          </template>
        </agile>
        <agile
          ref="thumbnails"
          class="thumbnails"
          :options="options2"
          :as-nav-for="asNavFor2"
        >
          <div
            v-for="(bookSerie, index) in serie"
            :key="index"
            class="slide slide--thumbniail"
            :class="`slide--${index}`"
            @click="$refs.thumbnails.goTo(index)"
          >
            <img
              v-lazy="bookSerie.picture.base"
              class="object-cover object-center w-full h-full"
            />
          </div>
        </agile>
      </div>
      <div class="flex flex-col mt-6 justify-stretch">
        <nuxt-link
          :to="{
            name: 'series-slug',
            params: { author: book.serie.author, slug: book.serie.slug },
          }"
          class="inline-flex items-center justify-center px-4 py-2 mx-auto text-sm font-medium font-semibold text-white transition-colors duration-100 border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 md:w-max"
        >
          <icon-collection />
          <span class="mx-1"> Refer to series page </span>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import IconCollection from '~/components/icons/icon-collection.vue'
import IconChevronLeft from '~/components/icons/icon-chevron-left.vue'
import IconChevronRight from '~/components/icons/icon-chevron-right.vue'
import VButton from '~/components/special/v-button.vue'
export default {
  name: 'BookSerie',
  components: {
    IconCollection,
    IconChevronLeft,
    IconChevronRight,
    VButton,
  },
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
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: true,
        infinite: false,
      },

      options2: {
        autoplay: false,
        centerMode: true,
        dots: true,
        navButtons: false,
        infinite: true,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5,
            },
          },

          {
            breakpoint: 900,
            settings: {
              navButtons: false,
            },
          },
        ],
      },
    }
  },
  mounted() {
    if (this.book.serie) {
      this.$refs.main.goTo(this.book.serieVolume - 1)
      this.asNavFor1.push(this.$refs.thumbnails)
      this.asNavFor2.push(this.$refs.main)
    }
  },
}
</script>

<style lang="postcss">
.slide--thumbniail {
  transition: opacity 0.3s !important;
}
.book-serie {
  & .thumbnails {
    @apply mt-5;
    & .agile__nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    & .agile__nav-button:hover {
      color: #888;
    }
    & .agile__nav-button--prev {
      left: -45px;
    }
    & .agile__nav-button--next {
      right: -45px;
    }
    & .slide--thumbniail {
      cursor: pointer;
      height: 100px;
      padding: 0 5px;
      & :hover {
        opacity: 0.75;
      }
    }
    & .agile__actions {
      @apply w-full mt-6;
    }
  }
  & .agile__nav-button {
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 24px;
    transition-duration: 0.3s;
  }
  & .agile__dots {
    @apply w-full flex-wrap justify-center;
  }
  & .agile__dot {
    & button {
      @apply border mx-2 my-1 border-solid border-primary-600 rounded-full bg-transparent cursor-pointer block h-3 w-3 duration-300;
    }
  }
  & .agile__dot--current button,
  & .agile__dot:hover button {
    @apply bg-primary-600;
  }

  & .main {
    & .agile__actions {
      @apply w-full;
    }
    & .agile__nav-button {
      @apply h-16 w-16 duration-300 bg-transparent border-none cursor-pointer text-2xl relative lg:bottom-0 lg:absolute;
    }
    & .slide {
      @apply h-96;
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
