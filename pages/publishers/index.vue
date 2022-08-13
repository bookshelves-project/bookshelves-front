<script setup lang="ts">
const { asyncRequest, paginate } = useHttpPage<Publisher>({
  endpoint: '/publishers',
  query: {
    full: true,
    'filter[negligible]': false
  }
})
await asyncRequest()

const title = 'Publishers'
const description = 'Discover your books by publisher'

useMetadata({
  title,
  description
})
</script>

<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <filters negligible :total="paginate?.data.length" />
      </template>
    </app-header>
    <relation-list
      :entities="paginate?.data"
      name="publishers"
      :route="{
        name: 'publishers-slug',
        paramsList: {
          slug: 'meta.slug',
        },
      }"
    />
  </main>
</template>
