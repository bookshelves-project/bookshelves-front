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
      {{ navigation.title }}
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
        <nuxt-link :to="link.route" class="block">
          {{ link.label }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooterColumn',
  props: {
    navigation: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
