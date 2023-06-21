<script setup lang="ts">
const response = await useHttpFilter<Publisher[]>({
  endpoint: '/publishers',
  query: {
    'full': true,
    'filter[negligible]': false,
  },
})

const title = 'Publishers'
const description = 'Discover your books by publisher'

useMetadata({
  title,
  description,
})
</script>

<template>
  <main class="main-content">
    <layout-header :title="title" :subtitle="description">
      <template #filters>
        <filters negligible :total="response?.data.length" />
      </template>
    </layout-header>
    <relation-list
      :entities="response?.data"
      name="publishers"
      :to="{
        name: 'publishers-publisher_slug',
        params: {
          slug: 'meta.slug',
        },
      }"
    />
  </main>
</template>
