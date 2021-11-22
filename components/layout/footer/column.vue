<template>
  <div v-if="navigation">
    <h3
      class="
        text-sm
        font-semibold
        tracking-wider
        text-gray-400
        uppercase
        dark:text-gray-500
      "
    >
      {{ $t(`nav.${navigation.title}`) }}
    </h3>
    <ul class="mt-4 space-y-4">
      <li
        v-for="link in navigation.links"
        :key="link.id"
        class="
          text-base text-gray-500
          hover:text-gray-900
          dark:text-gray-100 dark:hover:text-gray-400
        "
      >
        <nuxt-link :to="localePath(link.route)" class="block">
          {{ $t(`nav.${link.label}`) }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooterColumn',
  props: {
    navigation: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
