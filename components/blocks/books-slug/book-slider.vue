<template>
  <section aria-labelledby="book-slider">
    <div
      class="shadow sm:rounded-lg dark:bg-gray-800 relative book-books max-w-full overflow-hidden"
    >
      <div class="px-4 py-5 sm:px-6">
        <h2
          id="book-slider"
          class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
        >
          <slot name="title" />
        </h2>
        <p class="max-w-2xl mt-1 text-sm italic text-gray-500">
          <slot name="subtitle" />
        </p>
      </div>
      <div
        class="px-4 py-5 border-t border-gray-200 dark:border-gray-700 sm:px-6"
      >
        <div v-if="isLoaded" class="mt-5">
          <agile
            v-if="books.length"
            ref="main"
            class="main"
            :options="options1"
            :as-nav-for="asNavFor1"
          >
            <div
              v-for="(book, index) in books"
              :key="index"
              class="slide"
              :class="`slide--${index}`"
            >
              <div class="w-full h-full lg:grid lg:grid-cols-2">
                <div class="col-span-1">
                  <app-img
                    :src="book.picture.original"
                    :color="book.picture.color"
                    :title="book.title"
                    class="object-cover object-top w-32 h-32 rounded-full lg:rounded-none lg:w-full lg:h-full"
                  />
                </div>
                <div class="col-span-1 mt-3 ml-0 space-y-2 lg:ml-3 lg:mt-0">
                  <div>
                    <span
                      class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >Title
                    </span>
                    <h3 class="font-semibold text-black">
                      {{ book.title }}
                    </h3>
                  </div>
                  <div>
                    <div>
                      <span
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >Authors
                      </span>
                      <h3 class="font-semibold">
                        <span
                          v-for="(author, authorId) in book.authors"
                          :key="authorId"
                          class="mr-1"
                        >
                          <nuxt-link
                            :to="{
                              name: 'authors-slug',
                              params: { slug: author.meta.slug },
                            }"
                            class="text-gray-900 transition-colors duration-100 border-b border-gray-500 dark:border-gray-100 dark:hover:border-gray-400 hover:border-gray-400 hover:text-gray-400"
                            >{{ author.name }}</nuxt-link
                          >
                          <span
                            v-if="
                              bookData.authors.length > 1 &&
                              authorId !== bookData.authors.length - 1
                            "
                            >&</span
                          >
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div v-if="book.volume">
                    <span
                      class="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >Volume
                    </span>
                    <h3 class="font-semibold text-black">
                      {{ book.volume }}
                    </h3>
                  </div>
                  <div class="pt-6">
                    <app-button
                      v-if="$route.params.slug !== book.meta.slug"
                      :color="`white`"
                      :to="{
                        name: `${book.meta.entity}s-slug`,
                        params: {
                          author: book.meta.author,
                          slug: book.meta.slug,
                        },
                      }"
                      >Refer to {{ book.meta.entity }}</app-button
                    >
                    <span v-else class="italic text-gray-500 dark:text-gray-400"
                      >Current page</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <template slot="prevButton">
              <svg-icon
                name="arrow-chevron-right"
                class="w-8 h-8 m-auto text-gray-900 dark:text-gray-400 arrow-rotate"
              />
            </template>
            <template slot="nextButton">
              <svg-icon
                name="arrow-chevron-right"
                class="w-8 h-8 m-auto text-gray-900 dark:text-gray-400"
              />
            </template>
          </agile>
          <agile
            v-if="books.length > 1"
            ref="thumbnails"
            class="thumbnails"
            :options="options2"
            :as-nav-for="asNavFor2"
          >
            <div
              v-for="(book, index) in books"
              :key="index"
              class="slide slide--thumbniail"
              :class="`slide--${index}`"
              @click="$refs.thumbnails.goTo(index)"
            >
              <app-img
                :src="book.picture.base"
                :color="book.picture.color"
                :title="book.title"
                class="object-cover object-center w-full h-full"
              />
            </div>
          </agile>
        </div>
        <div v-else class="pt-10 pb-10">
          <div
            class="absolute transform -translate-x-1/2 translate-y-1/2 top-1/2 left-1/2"
          >
            <loading class="w-6 h-6" />
          </div>
        </div>
        <div
          v-if="!books.length"
          class="px-2 text-sm italic text-gray-400 dark:text-gray-200"
        >
          No results.
        </div>
        <div class="mt-6">
          <slot name="link" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// https://github.com/lukaszflorczak/vue-agile
import { VueAgile } from 'vue-agile'

export default {
  name: 'BookSlider',
  components: {
    agile: VueAgile,
  },
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
  },
  data() {
    return {
      isLoaded: false,
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
  watch: {
    loaded(newValue, oldValue) {
      this.isLoaded = newValue
      if (this.isLoaded) {
        setTimeout(() => {
          // this.$refs.main.goTo(this.bookData.volume - 1)
          this.asNavFor1.push(this.$refs.thumbnails)
          this.asNavFor2.push(this.$refs.main)
        }, 300)
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
.book-books {
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
