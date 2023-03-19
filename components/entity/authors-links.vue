<script setup lang="ts">
defineProps<{
  authors?: Author[]
  short?: boolean
  lowercase?: boolean
}>()
</script>

<template>
  <div v-if="authors && authors.length" class="flex items-center">
    <span v-if="!short">
      <span v-if="lowercase">by </span>
      <span v-else>By </span>
    </span>
    <span
      v-for="(author, authorId) in authors"
      :key="authorId"
      class="flex md:contents max-w-max"
    >
      <app-link
        :to="{
          name: 'authors-slug',
          params: { slug: author.meta.slug },
        }"
        class="ml-1 internal-link"
      >{{ author.name }}</app-link>
      <span
        v-if="
          authors.length > 1
            && authorId !== authors.length - 2
            && authorId !== authors.length - 1
        "
        class="mr-1"
      >,</span><span v-if="authorId === authors.length - 2" class="ml-1">&</span>
    </span>
  </div>
</template>
