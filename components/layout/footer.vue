<template>
  <footer class="bg-white dark:bg-gray-900" aria-labelledby="footerHeading">
    <h2 id="footerHeading" class="sr-only">Footer</h2>
    <div class="px-4 pt-12 pb-6 mx-auto max-w-7xl lg:pt-16 lg:pb-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <layout-footer-identity class="space-y-8 xl:col-span-1" />
        <layout-footer-navigation
          class="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 xl:mt-0 xl:col-span-2"
        />
      </div>

      <layout-footer-bottom
        class="relative pt-8 mt-12 border-t border-gray-200 dark:border-gray-600 lg:flex items-center justify-between"
      />
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter',
}
</script>

<style lang="css" scoped>
.footer-bottom::v-deep {
  @apply text-gray-500;
  & a {
    @apply hover:text-gray-900 transition-colors duration-100;
  }
}
.dark {
  & .footer-bottom::v-deep {
    @apply text-gray-400;
    & a {
      @apply hover:text-gray-100;
    }
  }
}
</style>
