<script setup lang="ts">
const { requestPage, response } = useHttpPage<Post[]>('/posts')
await requestPage()

const title = 'Guides'
const description = 'To know more about eBooks & eReaders'

useMetadata({
  title,
  description
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
