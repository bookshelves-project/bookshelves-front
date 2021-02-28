<template>
  <nuxt-link :to="route" class="block group">
    <article class="relative">
      <div class="relative">
        <div
          :class="{ 'cover-shadow': shadow }"
          class="flex overflow-hidden group-hover:img-hover-zoom"
        >
          <span v-if="hasImageSlot" class="mx-auto">
            <slot name="image" />
          </span>
          <span v-else class="w-full mx-auto">
            <img v-lazy="cover" :alt="imageAlt" class="cover" />
          </span>
        </div>
        <div
          class="absolute top-0 bottom-0 left-0 right-0 hidden p-3 text-white transition-all duration-300 bg-black bg-opacity-50 rounded-sm opacity-0 md:block group-hover:opacity-75 group-hover:bg-black"
        >
          <slot name="hover" />
        </div>
      </div>
      <div
        :class="{ 'md:h-14': limitedHeight }"
        class="flex items-center w-full h-full p-1 pb-3 transition-colors duration-300 group-hover:bg-opacity-50 rounded-b-md"
      >
        <div class="hidden m-auto text-center md:block w-max">
          <div class="font-semibold">
            <slot name="title" />
          </div>
          <div>
            <slot name="subtitle" />
          </div>
        </div>
        <div class="block mt-2 space-y-2 md:hidden">
          <slot name="title-responsive" />
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
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    limitedHeight: {
      type: Boolean,
      default: true,
    },
    imageAlt: {
      type: String,
      default: null,
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
  @apply object-cover object-top h-64 w-full rounded-sm;
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
