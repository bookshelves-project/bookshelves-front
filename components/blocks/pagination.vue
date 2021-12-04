<template>
  <div></div>
  <!-- <nav class="flex justify-between px-4 border-t border-gray-200 dark:border-gray-700 sm:px-0">
    <div class="hidden sm:flex flex-1 w-0 -mt-px item-ext">
      <nuxt-link v-slot="{ navigate }" :to="linkGen(1)" custom>
        <component :is="getTag(1)" class="external-pagination" :to="linkGen(1)" @click="navigate">
          <svg-icon
            name="arrow-narrow-right"
            class="w-5 h-5 mr-3 text-gray-400 rotate-180 my-auto"
          />
          <span class="mb-1">First</span>
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
          >‹</component>
        </nuxt-link>
      </div>
      <div
        class="mx-2 inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent dark:text-gray-100"
      >
        Page
        <span class="ml-1">
          <span v-if="page">{{ page }}</span>
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
          >›</component>
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
          >‹</component>
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
            :title="`Page ${pageNum + startNumber - 1}`"
            aria-label="Next"
            @click="navigate"
          >
            <em class="border-none" style="padding: 0">
              {{
                pageNum + startNumber - 1
              }}
            </em>
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
            :title="`Page ${pages}`"
            aria-label="Next"
            @click="navigate"
          >{{ pages }}</component>
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
          >›</component>
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
          <span class="mb-1">Last</span>
          <svg-icon name="arrow-narrow-right" class="w-5 h-5 ml-3 text-gray-400" />
        </component>
      </nuxt-link>
    </div>
  </nav>-->
</template>

<script lang="ts" setup>import { Query } from '~/types'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  perPage: {
    type: [Number, String],
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    default: 6
  },
  ellipsesThreshold: {
    type: Number,
    default: 3
  }
})

const route = useContext().route.value
const page = useRoute().value.query.page

const linkGen = (pageNum: number) => {
  const newQuery: Query = { ...route.query }
  newQuery.page = pageNum.toString()
  const newRoute = {
    name: route.name || 'index',
    query: { ...newQuery }
  }

  return newRoute
}

const isActive = (pageNum: number) => {
  return props.currentPage === pageNum
}
const getTag = (pageNum: number) => {
  return isActive(pageNum) ? 'span' : 'nuxt-link'
}

const pages = computed((): number => {
  let page = props.perPage
  if (typeof page === 'string') {
    page = parseInt(page, 10)
  }
  return Math.ceil(props.total / page)
})
const displayLastPage = computed(() => {
  let limited = props.limit
  limited = limited - 2
  if (props.currentPage <= pages.value - limited) {
    return true
  }

  return false
})
const showAllPages = computed(() => {
  return pages.value <= props.limit
})
const nearFromBeginning = computed(() => {
  return (
    !showAllPages.value &&
    props.currentPage < props.limit - 1 &&
    props.limit > props.ellipsesThreshold
  )
})
const nearFromEnd = computed(() => {
  return (
    !showAllPages.value &&
    !nearFromBeginning.value &&
    pages.value - props.currentPage + 2 < props.limit &&
    props.limit > props.ellipsesThreshold
  )
})
const isOnTheMiddle = computed(() => {
  return (
    !showAllPages.value &&
    !nearFromBeginning.value &&
    !nearFromEnd.value &&
    props.limit > props.ellipsesThreshold
  )
})
const showFirstDots = computed(() => {
  return nearFromEnd.value || isOnTheMiddle.value
})
const showLastDots = computed(() => {
  return nearFromBeginning.value || isOnTheMiddle.value
})
const numberOfLinks = computed(() => {
  if (showAllPages.value) {
    return pages.value
  }
  if (nearFromBeginning.value || nearFromEnd.value) {
    return props.limit - 1
  }
  if (isOnTheMiddle.value) {
    return props.limit - 2
  }
  return props.limit
})
const startNumber = computed(() => {
  let startNumber = 1
  if (nearFromEnd.value) {
    startNumber = pages.value - numberOfLinks.value + 1
  } else if (isOnTheMiddle.value) {
    startNumber = props.currentPage - Math.floor(numberOfLinks.value / 2)
  }
  if (startNumber < 1) {
    return 1
  }
  if (startNumber > pages.value - numberOfLinks.value) {
    return pages.value - numberOfLinks.value + 1
  }
  return startNumber
})
</script>

<style lang="postcss" scoped>
/* .link {
  @apply mr-1 mb-1 px-4 py-3 text-sm leading-4 border border-primary-300 rounded;

  svg {
    @apply h-4 w-4;
  }

  &[disabled] {
    @apply cursor-not-allowed;

/* .link {
  @apply mr-1 mb-1 px-4 py-3 text-sm leading-4 border border-primary-300 rounded;

  svg {
    @apply h-4 w-4;
  }

  &[disabled] {
    @apply cursor-not-allowed;

    &:not(.active) {
      @apply opacity-25;
    }
  }

  &:not([disabled]) {
    @apply hover:bg-white focus:border-primary-500 focus:text-primary-500;
  }

  &.active {
    @apply bg-primary-600 text-white;
  }
} */

.rotate-180 {
  transform: rotate(180deg);
}
em {
  font-style: normal;
}
.external-pagination {
  @apply inline-flex items-center text-gray-500 dark:text-gray-400 pt-4 border-t-2 border-transparent;
  & span {
    @apply opacity-50;
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
    @apply hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-600;
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
    @apply hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-600;
  }

  &.active {
    & a,
    & span {
      @apply text-primary-600 border-primary-500 dark:text-primary-300 dark:border-primary-300;
    }
    & span {
      @apply opacity-100 font-semibold;
    }
  }
}
