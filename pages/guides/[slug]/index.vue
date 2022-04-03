<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import RelationPostToc from '@/components/relation/post/toc.vue'
import '@/assets/css/markdown.css'

const { nuxtAsyncData } = useFetchable()
const { query, params } = useRoute()

const title = ref('')
const summary = ref<string | undefined>()

const post = ref<Post>()

await nuxtAsyncData<Post>('/posts', [params.slug]).then((e) => {
  title.value = e.title
  summary.value = e.summary
  post.value = e
})

useMeta({
  title: title.value,
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
    <div class="flex flex-wrap-reverse w-full xl:col-span-3">
      <div class="prose prose-lg dark:prose-invert nuxt-content">
        <div v-html="post.body"></div>
      </div>
      <div class="relative block w-full lg:mx-auto lg:w-1/4 lg:max-w-prose">
        <div
          class="lg:sticky lg:top-20 h-full lg:h-auto lg:max-h-(screen-5) max-w-xl lg:mx-auto"
        >
          <relation-post-toc :body="post.body" />
        </div>
      </div>
    </div>
  </main>
</template>
