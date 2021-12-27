<template>
  <div
    v-if="authors.length"
    class="mt-2 text-center lg:text-left lg:mt-0 dark:text-white"
  >
    <span v-if="!short">By</span>
    <span
      v-for="(author, authorId) in authors"
      :key="authorId"
      class="mr-1 dark:text-gray-100"
    >
      <nuxt-link
        :to="
          localePath({
            name: 'authors-slug',
            params: { slug: author.meta.slug },
          })
        "
        class="internal-link"
        >{{ author.name }}</nuxt-link
      >
      <span
        v-if="authors.length > 1 && authorId !== authors.length - 1"
        class="text-gray-900 dark:text-gray-100"
        >&</span
      >
    </span>
  </div>
</template>

<script>
export default {
  name: 'AuthorsLinks',
  props: {
    authors: {
      type: Array,
      default: () => [],
    },
    short: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
