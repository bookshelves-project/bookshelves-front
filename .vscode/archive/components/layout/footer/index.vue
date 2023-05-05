<template>
  <footer class="footer" aria-labelledby="footerHeading">
    <h2 id="footerHeading" class="sr-only">
      Footer
    </h2>
    <div class="main-content lg:pt-16 lg:pb-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <layout-footer-identity />
        <layout-footer-navigation />
      </div>

      <layout-footer-bottom />
    </div>
  </footer>
</template>

<style lang="css" scoped>
.footer :deep(.footer-bottom) {
  @apply text-gray-500;
}

.footer .footer-bottom :deep(a) {
  @apply transition-colors duration-100 hover:text-gray-900;
}
.footer .dark :deep(.footer-bottom) {
  @apply text-gray-400;
}
.footer .dark :deep(a) {
  @apply hover:text-gray-100;
}
</style>
