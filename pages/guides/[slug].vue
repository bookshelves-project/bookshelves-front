<script setup lang="ts">
const route = useRoute()
const response = await useHttpFilter<Post>({
  endpoint: '/posts',
  params: [route.params.slug]
})

const post = ref<Post>()
post.value = response.value?.data

useMetadata({
  title: `${post.value?.title} · Guides`,
  description: post.value?.summary,
  image: post.value?.cover
})
</script>

<template>
  <main v-if="post" class="main-content">
    <app-header
      :title="post.title"
      :subtitle="post.category"
      :text="post.summary"
      :image="post.cover"
    />
    <app-content :body="post.body" />
  </main>
</template>
