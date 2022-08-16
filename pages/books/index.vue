<script setup lang="ts">
const response = await useHttpFilter<Book[]>('/books')

const title = 'All books available'
const description =
  "Discover all available books sorted by title and serie's title"
const sortOptions: FilterOption[] = [
  {
    label: "By series' title (default)",
    value: 'slug_sort'
  },
  {
    label: 'By title',
    value: 'title'
  },
  {
    label: 'Most recently published',
    value: '-released_on'
  },
  {
    label: 'Newest uploaded',
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
          serie
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
