<script setup lang="ts">
const { requestPage, response } = useHttpPage<Serie[]>('/series')
await requestPage()

const title = 'All series available'
const description = 'Discover all series'
const sortOptions = [
  {
    label: "By series' title (default)",
    query: { sort: 'title_sort' },
    value: 'title_sort'
  },
  {
    label: 'By title',
    query: { sort: 'title' },
    value: 'title'
  },
  {
    label: 'Newest uploaded',
    query: { sort: '-created_at' },
    value: '-created_at'
  }
]

useMetadata({
  title,
  description
})
</script>

<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <filters
          language
          type
          :sort="sortOptions"
          paginate
          size
          :total="response?.meta?.total"
        />
      </template>
    </app-header>
    <entity-list :entities="response?.data" type />
    <pagination
      v-if="response?.meta"
      :pages="response?.meta.last_page"
      :current="response?.meta.current_page"
    />
  </div>
</template>
