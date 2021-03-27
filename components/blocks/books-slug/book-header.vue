<template>
  <div
    class="max-w-3xl px-4 mx-auto md:px-6 xl:flex xl:items-center xl:justify-between xl:space-x-5 xl:max-w-7xl xl:px-8"
  >
    <div class="flex items-center space-x-5">
      <div class="flex-shrink-0">
        <div class="relative">
          <img
            v-if="book.picture.base"
            v-lazy="book.picture.base"
            alt="Book cover"
            class="object-cover w-16 h-16 rounded-full"
          />
          <span
            class="absolute inset-0 rounded-full shadow-inner"
            aria-hidden="true"
          ></span>
        </div>
      </div>
      <div class="flex items-center">
        <h1 class="text-2xl font-bold text-gray-900 font-handlee">
          {{ book.title }}
        </h1>
        <button
          v-if="$auth.$state.loggedIn"
          class="ml-3"
          @click="toggleFavorite('book')"
        >
          <icon-heart
            title="Favorite"
            class="text-red-600"
            :is-full="isFavorite"
          />
        </button>
      </div>
    </div>
    <div
      class="flex flex-col-reverse items-center mt-6 space-y-4 space-y-reverse justify-stretch md:flex-row-reverse md:justify-end md:space-x-reverse md:space-y-0 md:space-x-3 xl:mt-0 xl:flex-row xl:space-x-3"
    >
      <button
        class="inline-flex items-center justify-center px-4 py-2 space-x-2 text-sm font-semibold text-white transition-colors duration-100 border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        @click="displayCover"
      >
        <icon-picture class="w-5 h-5" />
        <div>See cover</div>
      </button>
      <a
        :href="book.epub.download"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white transition-colors duration-100 border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500"
      >
        <icon name="download" />
        <span class="mx-1">Download</span>
        <span> (EPUB {{ book.epub.size }}) </span>
      </a>
    </div>
    <div
      v-if="modalCoverDisplay"
      v-click-outside="closeModalCover"
      class="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow top-1/2 left-1/2"
    >
      <div class="relative">
        <img
          v-if="book.picture.original"
          :src="book.picture.original"
          alt="Book cover"
          class="h-full w-96"
        />
      </div>
      <div
        class="absolute flex w-6 h-6 transition-colors duration-100 rounded-md top-2 right-2 bg-gray-50 bg-opacity-60 hover:bg-gray-100"
      >
        <button class="m-auto" @click="closeModalCover">
          <icon-cross />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

import iconHeart from '~/components/icons/icon-heart.vue'
import IconPicture from '~/components/icons/icon-picture.vue'
import favorites from '~/mixins/favorites'
import IconCross from '~/components/icons/icon-cross.vue'
export default {
  name: 'BookHeader',
  components: { iconHeart, IconPicture, IconCross },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  mixins: [favorites],
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      buyLink: false,
      modalCoverDisplay: false,
    }
  },
  methods: {
    displayCover() {
      setTimeout(() => {
        this.$store.commit('overlay/setIsVisible', true)
        this.modalCoverDisplay = true
      }, 150)
    },
    closeModalCover() {
      this.$store.commit('overlay/setIsVisible', false)
      this.modalCoverDisplay = false
    },
  },
}
</script>
