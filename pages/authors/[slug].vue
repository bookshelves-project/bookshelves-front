<script lang="ts" setup>
const route = useRoute()
const { request } = useHttp()

const title = ref('Author')
const author = ref<Author>()
const series = ref<ApiResponse<Entity[]>>()
const books = ref<ApiResponse<Entity[]>>()

const [authorRaw, booksRaw, seriesRaw] = await Promise.all([
  request<Author>({
    endpoint: '/authors',
    params: [
      route.params.slug
    ],
    extractData: true
  }),
  request<ApiResponse<Entity[]>>({
    endpoint: '/authors/books',
    params: [
      route.params.slug
    ]
  }),
  request<ApiResponse<Entity[]>>({
    endpoint: '/authors/series',
    params: [
      route.params.slug
    ]
  })
])

author.value = authorRaw.body
books.value = booksRaw.body
series.value = seriesRaw.body
title.value = `${author.value?.firstname} ${author.value?.lastname}`

useMetadata({
  title: title.value,
  description: author.value?.description,
  image: author.value?.media_social
})
</script>

<template>
  <main v-if="author" class="main-content">
    <app-header
      :title="author.name"
      :image="author.media?.url"
      :subtitle="`${author.count?.books} books`"
      :cta="author.link"
      :text="author.description"
      :entity="author"
      :breadcrumb="title"
      favorite
    >
      <entity-download-button :download="author.download" :files="author.files" />
    </app-header>
    <div>
      <entity-block
        :entities="series"
        :count="author.count?.series"
        name="Series"
        :endpoint="'/authors/books'"
      />
      <entity-block
        :entities="books"
        :count="author.count?.books"
        name="Books"
        :endpoint="'/authors/series'"
      />
    </div>
    <entity-review
      :entity="author"
      class="border-t border-gray-400 dark:border-gray-700 pt-6 mt-10"
    />
  </main>
</template>
