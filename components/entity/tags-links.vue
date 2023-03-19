<script setup lang="ts">
interface Props {
  tags?: Tag[]
  short?: boolean
}

withDefaults(defineProps<Props>(), {
  tags: () => [] as Tag[],
  short: false,
})
</script>

<template>
  <div v-if="tags && tags.length" class="lg:flex">
    <h2 v-if="!short" class="mr-1">
      Tags:
    </h2>
    <ul>
      <li
        v-for="(tag, id) in tags"
        :key="id"
        class="inline-block dark:text-gray-100"
      >
        <app-link
          :to="{
            name: 'tags-slug',
            params: { slug: tag.meta.slug },
          }"
          class="internal-link"
        >
          {{ tag.name }}
        </app-link><span
          v-if="tags.length > 1 && id !== tags.length - 1"
          class="mr-1 text-gray-900 dark:text-gray-100"
        >,</span>
      </li>
    </ul>
  </div>
</template>
