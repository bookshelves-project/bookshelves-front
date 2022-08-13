<script setup lang="ts">
const { asyncRequest, paginate } = useHttpPage<Post>('/posts')
await asyncRequest()

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
        v-for="post in paginate?.data"
        :key="post.meta.slug"
        :post="post"
      />
    </div>
    <pagination
      v-if="paginate?.meta"
      :pages="paginate?.meta.last_page"
      :current="paginate?.meta.current_page"
    />
  </main>
</template>
