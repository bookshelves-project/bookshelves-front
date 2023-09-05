<script lang="ts" setup>
import type { Book, FilterOption } from '~/types'

const books = await useHttpQuery<Book[]>({
  name: '/books',
})

const title = 'All books available'
const description = 'Discover all available books sorted by title and serie\'s title'
const sortOptions: FilterOption[] = [
  {
    label: 'By series\' title (default)',
    value: 'slug_sort',
  },
  {
    label: 'By title',
    value: 'title',
  },
  {
    label: 'Most recently published',
    value: '-released_on',
  },
  {
    label: 'Newest uploaded',
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
          serie
          language
          type
          :sort="sortOptions"
          paginate
          size
          :total="books?.meta?.total"
        /> -->
      </template>
    </layout-header>
    <listing :entities="books?.data" />
    <pagination
      v-if="books?.meta"
      :pages="books?.meta.last_page"
      :current="books?.meta.current_page"
    />
  </div>
</template>
