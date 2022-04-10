<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import AppContent from '@/components/app/content.vue'

const { nuxtAsyncData } = useFetchable()
const route = useRoute()

const title = ref('')
const summary = ref<string | undefined>()

const page = ref<Page>()

await nuxtAsyncData<Page>('/pages', [route.params.slug]).then((e) => {
  title.value = e.title
  summary.value = e.summary
  page.value = e
})

useHead({
  title: title.value,
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
