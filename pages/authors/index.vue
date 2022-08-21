<script lang="ts" setup>
const response = await useHttpFilter<Author[]>('/authors')

const title = 'All authors available'
const description = 'Want to find all books written by specific author?'
const sortOptions = [
  {
    label: 'By lastname (default)',
    query: { sort: 'lastname' },
    value: 'lastname'
  },
  {
    label: 'By firstname',
    query: { sort: 'firstname' },
    value: 'firstname'
  },
  {
    label: 'Newest created',
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
    <layout-header :title="title" :subtitle="description">
      <template #filters>
        <filters
          :sort="sortOptions"
          paginate
          size
          :total="response?.meta?.total"
        />
      </template>
    </layout-header>
    <entity-list :entities="response?.data" type />
    <pagination
      v-if="response?.meta"
      :pages="response?.meta.last_page"
      :current="response?.meta.current_page"
    />
  </div>
</template>
