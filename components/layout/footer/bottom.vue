<script setup lang="ts">
import packageJson from '~/package.json'
import LayoutFooterBackToTop from '@/components/layout/footer/back-to-top.vue'
import LayoutFooterCreativeCommons from '@/components/layout/footer/creative-commons.vue'

const config = useRuntimeConfig()
const date = (begin: number) => {
  const current = new Date().getFullYear()
  const year = `${begin} - ${current}`
  if (begin === current) {
    return begin
  }
  return year
}
</script>

<template>
  <div
    class="footer-bottom relative mt-12 items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-600 lg:flex"
  >
    <div
      class="space-y-2 text-base md:flex md:items-center md:space-y-0 xl:text-center"
    >
      <div class="flex">
        <a
          href="https://creativecommons.org"
          target="_blank"
          rel="noopener noreferrer"
          title="Creative commons"
          aria-label="Creative commons"
          class="mx-auto flex items-center space-x-2 transition-colors duration-100"
        >
          <layout-footer-creative-commons />
          <span>{{ date(2020) }}</span>
        </a>
      </div>
      <span class="flex">
        <span class="mx-auto md:flex">
          <span class="mx-1 hidden md:block">·</span>
          <!-- <router-link
            v-if="team"
            :to="$localePath(`/pages/about`)"
            class="transition-colors duration-100"
            >{{ team }}</router-link
          > -->
          {{ config.metaAuthor }}
          <span class="mx-1 hidden md:block">·</span
          ><a
            v-if="config.linkLicense"
            :href="config.linkLicense"
            target="_blank"
            rel="noopener noreferrer"
            class="block md:flex"
            >{{ packageJson.license }} license</a
          ><span class="hidden md:block">,</span
          ><a
            v-if="config.linkChangelog"
            :href="config.linkChangelog"
            target="_blank"
            rel="noopener noreferrer"
            class="block italic md:ml-1 md:flex"
            >v{{ packageJson.version }}</a
          ><span class="hidden md:block">.</span>
        </span>
      </span>
    </div>
    <div class="mt-6 flex lg:mt-0">
      <layout-footer-back-to-top class="mx-auto" />
    </div>
  </div>
</template>

<style lang="css" scoped>
a {
  @apply hover:!text-gray-800 dark:hover:!text-gray-200;
}
</style>
