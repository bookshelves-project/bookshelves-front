<script setup lang="ts">
defineProps<{
  authors?: Author[]
  short?: boolean
  lowercase?: boolean
}>()
</script>

<template>
  <div v-if="authors && authors.length" class="mt-2 dark:text-white lg:mt-0">
    <span v-if="!short">
      <span v-if="lowercase">by </span>
      <span v-else>By </span>
    </span>
    <span
      v-for="(author, authorId) in authors"
      :key="authorId"
      class="mr-1 dark:text-gray-100"
    >
      <router-link
        :to="
          $localePath({
            name: 'authors-slug',
            params: { slug: author.meta.slug },
          })
        "
        class="internal-link"
        >{{ author.name }}</router-link
      >
      <span
        v-if="authors.length > 1 && authorId !== authors.length - 1"
        class="text-gray-900 dark:text-gray-100"
      >
        &</span
      >
    </span>
  </div>
</template>
