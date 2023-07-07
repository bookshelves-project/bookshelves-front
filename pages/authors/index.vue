<script lang="ts" setup>
import type { Author, FilterOption } from '~/types'

const authors = await useHttpQuery<Author[]>({
  name: '/authors',
})

const title = 'All authors available'
const description = 'Want to find all books written by specific author?'
const sortOptions: FilterOption[] = [
  {
    label: 'By lastname (default)',
    query: { sort: 'lastname' },
    value: 'lastname',
  },
  {
    label: 'By firstname',
    query: { sort: 'firstname' },
    value: 'firstname',
  },
  {
    label: 'Newest created',
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
          :sort="sortOptions"
          paginate
          size
          :total="authors?.meta?.total"
        /> -->
      </template>
    </layout-header>
    <listing :entities="authors?.data" placeholder="/images/no-author.jpg" />
    <pagination
      v-if="authors?.meta"
      :pages="authors?.meta.last_page"
      :current="authors?.meta.current_page"
    />
  </div>
</template>
