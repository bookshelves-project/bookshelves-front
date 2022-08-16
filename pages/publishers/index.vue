<script setup lang="ts">
const response = await useHttpFilter<Publisher[]>({
  endpoint: '/publishers',
  query: {
    full: true,
    'filter[negligible]': false
  }
})

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
        <filters negligible :total="response?.data.length" />
      </template>
    </app-header>
    <relation-list
      :entities="response?.data"
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
