<script setup lang="ts">
const route = useRoute()
const { asyncRequest, response } = useHttpPage<Page>({
  endpoint: '/pages',
  params: [route.params.slug]
})
await asyncRequest()

const title = ref<string>()
const summary = ref<string>()
const page = ref<Page>()

page.value = response.value?.data
title.value = page.value?.title
summary.value = page.value?.summary

useMetadata({
  title: title.value,
  description: summary.value,
  image: page.value?.cover
})
</script>

<template>
  <main v-if="page" class="main-content">
    <app-header
      :title="page.title"
      :text="page.summary"
      :image="page.cover"
      :breadcrumb="title"
    />
    <app-content :body="page.body" />
  </main>
</template>
