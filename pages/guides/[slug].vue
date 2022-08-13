<script setup lang="ts">
const route = useRoute()
const { asyncRequest, response } = useHttpPage<Post>({
  endpoint: '/posts',
  params: [route.params.slug]
})
await asyncRequest()

const title = ref<string>()
const summary = ref<string>()
const post = ref<Post>()

post.value = response.value?.data
title.value = post.value?.title
summary.value = post.value?.summary

useMetadata({
  title: title.value,
  description: post.value?.summary,
  image: post.value?.cover
})
</script>

<template>
  <main v-if="post" class="main-content">
    <app-header
      :title="title"
      :subtitle="post.category"
      :text="post.summary"
      :image="post.cover"
    />
    <app-content :body="post.body" />
  </main>
</template>
