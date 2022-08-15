<script lang="ts" setup>
const { requestPage, response } = useHttpPage<Language[]>('/languages')
await requestPage()

const title = 'Languages of books and series'
const description =
  'You can read your books in many languages, browse each possibilities!'

useMetadata({
  title,
  description
})
</script>

<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="description" />
    <relation-list
      :entities="response?.data"
      name="languages"
      :route="{
        name: 'books',
        queryList: {
          'filter[languages]': 'meta.slug',
        },
      }"
      group
    />
  </main>
</template>
