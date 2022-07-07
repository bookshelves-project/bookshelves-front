<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import RelationPostCard from '@/components/relation/post/card.vue'
import Pagination from '@/components/pagination/index.vue'

const { nuxtAsyncList } = useFetchable()
const route = useRoute()

const title = 'Guides'
const description = 'To know more about eBooks & eReaders'

const response = ref<ApiPaginateResponse<Post[]>>()
const load = async () => {
  const list = await nuxtAsyncList<Post>('/posts')
  response.value = list
}
await load()

watch(
  () => route.query,
  async (newVal) => {
    await load()
  }
)

useMetadata({
  title,
  description,
})
</script>

<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <relation-post-card
        v-for="post in response?.data"
        :key="post.meta.slug"
        :post="post"
      />
    </div>
    <pagination
      v-if="response?.meta"
      :pages="response?.meta.last_page"
      :current="response?.meta.current_page"
    />
  </main>
</template>
