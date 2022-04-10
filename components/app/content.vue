<script setup lang="ts">
import RelationPostToc from '@/components/relation/post/toc.vue'
import '@/assets/css/markdown.css'

defineProps<{
  body?: string
}>()
</script>

<template>
  <div v-if="body" class="flex flex-wrap-reverse w-full xl:col-span-3">
    <div class="prose prose-lg dark:prose-invert nuxt-content">
      <div v-html="body"></div>
    </div>
    <div class="relative block w-full lg:mx-auto lg:w-1/4 lg:max-w-prose">
      <div
        class="lg:sticky lg:top-20 h-full lg:h-auto lg:max-h-(screen-5) max-w-xl lg:mx-auto"
      >
        <relation-post-toc :body="body" />
      </div>
    </div>
  </div>
</template>
