<template>
  <nuxt-link :to="route" class="block group" :title="title" :aria-label="title">
    <article
      class="relative transition-colors duration-100 rounded-md sm:grid sm:grid-cols-2 sm:gap-3 group-hover:bg-gray-100 dark:group-hover:bg-gray-800"
    >
      <div class="aspect-w-1 aspect-h-1 sm:aspect-w-2 sm:aspect-h-3">
        <img
          v-lazy="cover"
          :alt="title"
          class="object-cover object-top cover-shadow"
        />
      </div>
      <div>
        <h2 class="font-semibold">
          <slot name="primary" />
        </h2>
        <h3 class="italic">
          <slot name="secondary" />
        </h3>
        <div class="mt-1 text-sm sm:mt-3">
          <slot name="tertiary" />
        </div>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: 'EntityCard',
  props: {
    cover: {
      type: String,
      default: '/images/no-cover.webp',
    },
    route: {
      type: [Object, String],
      default: () => '/',
      required: true,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    limitedHeight: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
  },
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default
    },
    hasImageSlot() {
      return !!this.$slots.image
    },
  },
}
</script>

<style lang="postcss" scoped>
.cover {
  @apply object-cover object-top h-64 w-full rounded-sm transition-all duration-150;
  /* transition: transform 0.5s ease, filter 0.3s; */
}
.cover-shadow {
  @apply rounded-sm;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
}

@variants group-hover, hover, focus {
  .img-hover-zoom img {
    /* transform: scale(1.2); */
    /* filter: blur(2px); */
  }
}
</style>
