<script setup lang="ts">
const route = useRoute()
const { requestPage, response } = useHttpPage<Page>({
  endpoint: '/pages',
  params: [route.params.slug]
})
await requestPage()

const page = ref<Page>()
page.value = response.value?.data

const crumbs: string[] = [
  `${page.value?.title}`
]

useMetadata({
  title: page.value?.title,
  description: page.value?.summary,
  image: page.value?.cover
})
</script>

<template>
  <main v-if="page" class="main-content">
    <app-header
      :title="page.title"
      :text="page.summary"
      :image="page.cover"
      :crumbs="crumbs"
    />
    <app-content :body="page.body" />
  </main>
</template>
