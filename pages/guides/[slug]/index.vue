<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import AppContent from '@/components/app/content.vue'

const { nuxtAsyncData } = useFetchable()
const route = useRoute()

const title = ref('')
const summary = ref<string | undefined>()

const post = ref<Post>()

await nuxtAsyncData<Post | undefined>('/posts', [route.params.slug]).then(
  (e) => {
    if (e) {
      title.value = e.title
      summary.value = e.summary
      post.value = e
    }
  }
)

useMetadata({
  title: title.value,
  description: post.value?.summary,
  image: post.value?.cover,
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
