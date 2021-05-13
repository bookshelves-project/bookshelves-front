<template>
  <nav
    class="flex items-center justify-between px-4 border-t border-gray-200 sm:px-0"
  >
    <div class="flex flex-1 w-0 -mt-px">
      <nuxt-link
        :tag="getTag(1)"
        :to="linkGen(1)"
        active-class="pagination-active"
        exact-active-class="pagination-exact-active"
        class="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
      >
        <svg-icon
          name="arrow-narrow-right"
          class="w-5 h-5 mr-3 text-gray-400 rotate-180"
        />
        First
      </nuxt-link>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <div class="item">
        <nuxt-link
          :tag="getTag(1)"
          :to="linkGen(currentPage - 1)"
          active-class="pagination-active"
          exact-active-class="pagination-exact-active"
          title="Previous"
          aria-label="Previous"
        >
          ‹
        </nuxt-link>
      </div>
      <div v-if="showFirstDots" class="item">
        <span>...</span>
      </div>
      <div
        v-for="pageNum in numberOfLinks"
        :key="pageNum + startNumber - 1"
        :class="{ active: isActive(pageNum + startNumber - 1) }"
        class="item"
      >
        <nuxt-link
          :tag="getTag(pageNum + startNumber - 1)"
          :to="linkGen(pageNum + startNumber - 1)"
          active-class="pagination-active"
          exact-active-class="pagination-exact-active"
        >
          <span class="border-none" style="padding: 0">{{
            pageNum + startNumber - 1
          }}</span>
        </nuxt-link>
      </div>
      <div v-if="showLastDots" class="item">
        <span>...</span>
      </div>
      <div class="item">
        <nuxt-link
          :tag="getTag(pages)"
          :to="linkGen(currentPage + 1)"
          active-class="pagination-active"
          exact-active-class="pagination-exact-active"
          title="Next"
          aria-label="Next"
        >
          ›
        </nuxt-link>
      </div>
    </div>
    <div class="flex justify-end flex-1 w-0 -mt-px item">
      <nuxt-link
        :tag="getTag(pages)"
        :to="linkGen(pages)"
        active-class="pagination-active"
        exact-active-class="pagination-exact-active"
        class="inline-flex items-center pt-4 pl-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
      >
        Last
        <svg-icon
          name="arrow-narrow-right"
          class="w-5 h-5 ml-3 text-gray-400"
        />
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 4,
    },
    linkGen: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {
      ellipsesThreshold: 3,
    }
  },
  computed: {
    showAllPages() {
      return this.pages <= this.limit
    },
    nearFromBeginning() {
      return (
        !this.showAllPages &&
        this.currentPage < this.limit - 1 &&
        this.limit > this.ellipsesThreshold
      )
    },
    nearFromEnd() {
      return (
        !this.showAllPages &&
        !this.nearFromBeginning &&
        this.pages - this.currentPage + 2 < this.limit &&
        this.limit > this.ellipsesThreshold
      )
    },
    isOnTheMiddle() {
      return (
        !this.showAllPages &&
        !this.nearFromBeginning &&
        !this.nearFromEnd &&
        this.limit > this.ellipsesThreshold
      )
    },
    showFirstDots() {
      return this.nearFromEnd || this.isOnTheMiddle
    },
    showLastDots() {
      return this.nearFromBeginning || this.isOnTheMiddle
    },
    startNumber() {
      let startNumber = 1

      if (this.nearFromEnd) {
        startNumber = this.pages - this.numberOfLinks + 1
      } else if (this.isOnTheMiddle) {
        startNumber = this.currentPage - Math.floor(this.numberOfLinks / 2)
      }

      if (startNumber < 1) {
        return 1
      }

      if (startNumber > this.pages - this.numberOfLinks) {
        return this.pages - this.numberOfLinks + 1
      }
      return startNumber
    },
    numberOfLinks() {
      if (this.showAllPages) {
        return this.pages
      }
      if (this.nearFromBeginning || this.nearFromEnd) {
        return this.limit - 1
      }
      if (this.isOnTheMiddle) {
        // return this.limit - 2
        return this.limit
      }
      return this.limit
    },
  },
  methods: {
    isActive(pageNum) {
      return this.currentPage === pageNum
    },
    getTag(pageNum) {
      return this.isActive(pageNum) ? 'span' : 'a'
    },
  },
}
</script>

<style lang="postcss" scoped>
.rotate-180 {
  transform: rotate(180deg);
}
.item {
  & a,
  & span {
    /* @apply block w-10 text-center border-r py-2; */
    @apply inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 hover:text-gray-700 hover:border-gray-300 border-transparent dark:text-gray-100;
  }

  & a:hover {
    /* @apply text-white bg-gray-500; */
  }

  &:first-child {
    & a,
    & span {
      /* @apply rounded-l; */
    }
  }

  &:last-child {
    & a,
    & span {
      /* @apply border-r-0 rounded-r; */
    }
  }

  &.active {
    & a,
    & span {
      @apply text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-300;
    }
  }
}
</style>
