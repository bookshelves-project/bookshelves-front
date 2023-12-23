<script setup lang="ts">
const props = defineProps<{
  pages: number
  current: number
}>()

const {
  startNumber,
  numberOfLinks,
  linkGen,
  init,
  pages,
  current,
  showFirstDots,
  showLastDots,
  isActive,
  getTag,
  displayLastPage,
} = usePagination()

init(props.pages, props.current)

watch(
  () => props.current,
  () => {
    init(props.pages, props.current)
  },
)
watch(
  () => props.pages,
  () => {
    init(props.pages, props.current)
  },
)
</script>

<template>
  <div v-if="pages !== 1" class="my-10 max-w-7xl">
    <nav
      class="flex items-center justify-between border-t border-gray-200 px-4 dark:border-gray-700 sm:px-0"
    >
      <div class="-mt-px flex w-0 flex-1">
        <nuxt-link :to="linkGen(1)" class="item extreme-link">
          <SvgIcon name="arrow-narrow-right" class="mr-1 w-5 h-5 rotate-180" />
          First
        </nuxt-link>
      </div>
      <div class="hidden md:-mt-px md:flex">
        <nuxt-link v-slot="{ navigate }" :to="linkGen(current - 1)" custom>
          <component
            :is="getTag(1)"
            :to="linkGen(current - 1)"
            class="item page-link cursor-pointer"
            title="Previous"
            aria-label="Previous"
            @click="navigate"
          >
            <SvgIcon name="chevron-right" class="w-5 h-5 rotate-180" />
          </component>
        </nuxt-link>
        <div v-if="showFirstDots" class="item dots">
          ...
        </div>
        <span v-for="pageNum in numberOfLinks" :key="pageNum + startNumber - 1">
          <nuxt-link
            :to="linkGen(pageNum + startNumber - 1)"
            :title="`Page ${pageNum + startNumber - 1}`"
            :aria-label="pageNum + startNumber - 1"
            class="item page-link"
            :class="{ active: isActive(pageNum + startNumber - 1) }"
          >
            {{ pageNum + startNumber - 1 }}
          </nuxt-link>
        </span>
        <div v-if="showLastDots" class="item dots">
          ...
        </div>
        <nuxt-link
          v-if="showLastDots && displayLastPage"
          v-slot="{ navigate }"
          :to="linkGen(pages)"
        >
          <component
            :is="getTag(pages)"
            class="item page-link"
            :to="linkGen(pages)"
            :title="`Page ${pages}`"
            aria-label="Next"
            @click="navigate"
          >
            {{ pages }}
          </component>
        </nuxt-link>
        <nuxt-link v-slot="{ navigate }" :to="linkGen(current + 1)" custom>
          <component
            :is="getTag(pages)"
            class="item page-link cursor-pointer"
            :to="linkGen(current + 1)"
            title="Next"
            aria-label="Next"
            @click="navigate"
          >
            <SvgIcon name="chevron-right" class="w-5 h-5" />
          </component>
        </nuxt-link>
      </div>
      <div class="-mt-px flex w-0 flex-1 justify-end">
        <nuxt-link :to="linkGen(pages)" class="item extreme-link">
          Last
          <SvgIcon name="arrow-narrow-right" class="ml-1 w-5 h-5" />
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>

<style lang="css" scoped>
.item {
  @apply inline-flex items-center border-t-2 border-transparent pt-4 text-sm font-medium text-gray-500;
}
.dots {
  @apply px-4;
}
.page-link {
  @apply px-4 hover:border-gray-300 hover:text-gray-700 transition-colors duration-75 dark:hover:border-gray-700 dark:hover:text-gray-300;
}
.active {
  @apply border-primary-500 text-primary-600 dark:text-primary-500;
}
.extreme-link {
  @apply pr-1 hover:border-gray-300 hover:text-gray-700 transition-colors duration-75 dark:hover:border-gray-700 dark:hover:text-gray-300;
}
em {
  font-style: normal;
  @apply opacity-60 hover:!border-transparent;
}
</style>
