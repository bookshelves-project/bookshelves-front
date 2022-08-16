<script setup lang="ts">
const response = await useHttpFilter<Post[]>('/posts')

const title = 'Guides'
const description = 'To know more about eBooks & eReaders'

useMetadata({
  title,
  description
})
</script>

<template>
  <main class="main-content">
    <layout-header :title="title" :subtitle="description" />
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
