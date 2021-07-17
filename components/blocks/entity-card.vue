<template>
  <nuxt-link :to="route" class="group" :title="title">
    <article
      loading="lazy"
      class="
        relative
        transition-colors
        duration-100
        rounded-md
        sm:grid sm:grid-cols-2 sm:gap-3
        group-hover:bg-gray-100
        dark:group-hover:bg-gray-800
      "
    >
      <div class="h-32 overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
        <app-img :src="cover" :color="color" :title="title" class="cover" />
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
    color: {
      type: String,
      default: '#564fcc',
    },
    title: {
      type: String,
      default: null,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    limitedHeight: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.cover::v-deep {
  & .img {
    @apply rounded-sm object-top;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  }
}
</style>
