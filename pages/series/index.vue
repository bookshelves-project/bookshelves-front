<script lang="ts" setup>
import type { FilterOption, Serie } from '~/types'

const series = await useHttpQuery<Serie[]>({
  name: '/series',
})

const title = 'All series available'
const description = 'Discover all series'
const sortOptions: FilterOption[] = [
  {
    label: 'By series\' title (default)',
    query: { sort: 'title_sort' },
    value: 'title_sort',
  },
  {
    label: 'By title',
    query: { sort: 'title' },
    value: 'title',
  },
  {
    label: 'Newest uploaded',
    query: { sort: '-created_at' },
    value: '-created_at',
  },
]

useMetadata({
  title,
  description,
})
</script>

<template>
  <div class="main-content">
    <layout-header :title="title" :subtitle="description">
      <template #filters>
        <!-- <filters
          language
          type
          :sort="sortOptions"
          paginate
          size
          :total="series?.meta?.total"
        /> -->
      </template>
    </layout-header>
    <listing :entities="series?.data" />
    <pagination
      v-if="series?.meta"
      :pages="series?.meta.last_page"
      :current="series?.meta.current_page"
    />
  </div>
</template>
