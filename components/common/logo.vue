<template>
  <nuxt-link
    :to="{ name: route }"
    :class="{ 'no-bg': noBackground }"
    class="flex items-center flex-shrink-0 my-auto"
  >
    <icon
      v-if="haveLogo"
      name="bookshelves"
      :size="40"
      ratio
      :class="`${colorLogo}`"
      svg="transition-colors duration-300"
    />
    <!-- <icon
      v-if="haveTitle"
      name="markdownthis-title"
      :size="160"
      ratio
      :class="`${colorText}`"
      svg="transition-colors duration-300 ml-2"
    /> -->
    <span class="ml-3 text-xl text-black font-handlee"> Bookshelves </span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'MarkdownthisLogo',
  props: {
    colorLogo: {
      type: String,
      default: 'text-primary-400',
    },
    colorText: {
      type: String,
      default: 'text-black',
    },
    noBackground: {
      type: Boolean,
      default: true,
    },
    route: {
      type: String,
      default: 'home',
    },
    haveLogo: {
      type: Boolean,
      default: true,
    },
    haveTitle: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.no-bg {
  @apply bg-transparent !important;
}
.text-padding {
  padding-bottom: 0.15rem;
}
</style>
