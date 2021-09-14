<template>
  <nav class="flex justify-between px-4 border-t border-gray-200 sm:px-0">
    <div class="hidden sm:flex flex-1 w-0 -mt-px item-ext">
      <nuxt-link v-slot="{ navigate }" :to="linkGen(1)" custom>
        <component
          :is="getTag(1)"
          class="external-pagination"
          :to="linkGen(1)"
          @click="navigate"
        >
          <svg-icon
            name="arrow-narrow-right"
            class="w-5 h-5 mr-3 text-gray-400 rotate-180 my-auto"
          />
          First
        </component>
      </nuxt-link>
    </div>
    <div class="md:hidden flex justify-between">
      <div class="item">
        <nuxt-link v-slot="{ navigate }" :to="linkGen(1)" custom>
          <component
            :is="getTag(1)"
            class="external-pagination"
            :to="linkGen(currentPage - 1)"
            title="Previous"
            aria-label="Previous"
            @click="navigate"
          >
            ‹
          </component>
        </nuxt-link>
      </div>
      <div
        class="
          mx-2
          inline-flex
          items-center
          px-4
          pt-4
          text-sm
          font-medium
          text-gray-500
          border-t-2 border-transparent
          dark:text-gray-100
        "
      >
        Page
        <span class="ml-1">
          <span v-if="$route.query.page">{{ $route.query.page }}</span>
          <span v-else>1</span>
        </span>
      </div>
      <div class="item">
        <nuxt-link v-slot="{ navigate }" :to="linkGen(1)" custom>
          <component
            :is="getTag(pages)"
            class="external-pagination"
            :to="linkGen(currentPage + 1)"
            title="Next"
            aria-label="Next"
            @click="navigate"
          >
            ›
          </component>
        </nuxt-link>
      </div>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <div class="item">
        <nuxt-link v-slot="{ navigate }" :to="linkGen(1)" custom>
          <component
            :is="getTag(1)"
            class="external-pagination"
            :to="linkGen(currentPage - 1)"
            title="Previous"
            aria-label="Previous"
            @click="navigate"
          >
            ‹
          </component>
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
        <nuxt-link v-slot="{ navigate }" :to="linkGen(1)" custom>
          <component
            :is="getTag(pageNum + startNumber - 1)"
            class="external-pagination"
            :to="linkGen(pageNum + startNumber - 1)"
            title="Next"
            aria-label="Next"
            @click="navigate"
          >
            <em class="border-none" style="padding: 0">{{
              pageNum + startNumber - 1
            }}</em>
          </component>
        </nuxt-link>
      </div>
      <div v-if="showLastDots" class="item">
        <span>...</span>
      </div>
      <div v-if="showLastDots && displayLastPage" class="item">
        <nuxt-link v-slot="{ navigate }" :to="linkGen(1)" custom>
          <component
            :is="getTag(pages)"
            class="external-pagination"
            :to="linkGen(pages)"
            title="Next"
            aria-label="Next"
            @click="navigate"
          >
            {{ pages }}
          </component>
        </nuxt-link>
      </div>
      <div class="item">
        <nuxt-link v-slot="{ navigate }" :to="linkGen(1)" custom>
          <component
            :is="getTag(pages)"
            class="external-pagination"
            :to="linkGen(currentPage + 1)"
            title="Next"
            aria-label="Next"
            @click="navigate"
          >
            ›
          </component>
        </nuxt-link>
      </div>
    </div>
    <div class="hidden sm:flex justify-end flex-1 w-0 -mt-px item-ext">
      <nuxt-link v-slot="{ navigate }" :to="linkGen(pages)" custom>
        <component
          :is="getTag(pages)"
          class="external-pagination"
          :to="linkGen(pages)"
          @click="navigate"
        >
          Last
          <svg-icon
            name="arrow-narrow-right"
            class="w-5 h-5 ml-3 text-gray-400"
          />
        </component>
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
    linkGen: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {
      ellipsesThreshold: 3,
      limit: 5,
    }
  },
  computed: {
    displayLastPage() {
      let limit = this.limit
      limit = limit - 2
      if (this.currentPage <= this.pages - limit) {
        return true
      }

      return false
    },
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
  created() {
    if (this.pages >= 8) {
      const limit = this.pages / 3
      if (limit <= 8) {
        this.limit = limit
      } else {
        this.limit = 8
      }
    }
  },
  methods: {
    isActive(pageNum) {
      return this.currentPage === pageNum
    },
    getTag(pageNum) {
      return this.isActive(pageNum) ? 'span' : 'nuxt-link'
    },
  },
}
</script>

<style lang="postcss" scoped>
.rotate-180 {
  transform: rotate(180deg);
}
em {
  font-style: normal;
}
.external-pagination {
  @apply inline-flex items-center text-gray-500 pt-4 border-t-2 border-transparent;
  & span {
    @apply opacity-50;
  }
  & a {
    @apply hover:text-gray-700 hover:border-gray-300;
  }
}
.item-ext {
  & a,
  span {
    @apply inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent;
  }
  & span {
    @apply opacity-50;
  }
  & a {
    @apply hover:text-gray-700 hover:border-gray-300;
  }
}
.item {
  & a,
  & span {
    @apply inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent dark:text-gray-100;
  }
  & span {
    @apply opacity-50;
  }
  & a {
    @apply hover:text-gray-700 hover:border-gray-300;
  }

  &.active {
    & a,
    & span {
      @apply text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-300;
    }
    & span {
      @apply opacity-100 font-semibold;
    }
  }
}
</style>
