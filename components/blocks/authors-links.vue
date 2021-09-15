<template>
  <div
    v-if="authors.length"
    class="mt-2 text-center lg:text-left lg:mt-0 dark:text-white"
  >
    By
    <span
      v-for="(author, authorId) in authors"
      :key="authorId"
      class="mr-1 dark:text-gray-100"
    >
      <nuxt-link
        :to="{
          name: 'authors-slug',
          params: { slug: author.meta.slug },
        }"
        class="
          text-gray-900
          border-b border-gray-600
          dark:border-gray-100
          hover:text-gray-500 hover:border-gray-500
        "
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
  },
}
</script>
