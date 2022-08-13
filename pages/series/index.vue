<script setup lang="ts">
const { asyncRequest, paginate } = useHttpPage<Serie>('/series')
await asyncRequest()

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
          :total="paginate?.meta?.total"
        />
      </template>
    </app-header>
    <entity-list :entities="paginate?.data" type />
    <pagination
      v-if="paginate?.meta"
      :pages="paginate?.meta.last_page"
      :current="paginate?.meta.current_page"
    />
  </div>
</template>
