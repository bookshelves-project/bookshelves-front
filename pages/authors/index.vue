<script lang="ts" setup>
const { asyncRequest, paginate } = useHttpPage<Author>('/authors')
await asyncRequest()

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
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <filters
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
