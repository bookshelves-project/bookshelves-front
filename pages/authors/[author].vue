<script lang="ts" setup>
import type { ApiData, Author, Entity } from '~/types'

const { params } = useRoute()

const [author, books, series] = await Promise.all([
  useHttp<Author>({
    name: '/authors/{author}',
    params: {
      author: params.author,
    },
  }),
  useHttp<ApiData<Entity[]>>({
    name: '/authors/{author}/books',
    params: {
      author: params.author,
    },
    auto: false,
  }),
  useHttp<ApiData<Entity[]>>({
    name: '/authors/{author}/series',
    params: {
      author: params.author,
    },
    auto: false,
  }),
])

const crumbs: string[] = [
  'Authors',
  `${author?.name}`,
]

useMetadata({
  title: `${author?.firstname} ${author?.lastname} · Authors`,
  description: author?.description,
  image: author?.media_social,
})
</script>

<template>
  <main v-if="author" class="main-content">
    <layout-header
      :title="author.name"
      :image="author.media?.url"
      :subtitle="`${author.count?.books} books`"
      :cta="author.link"
      :text="author.description"
      :entity="author"
      :crumbs="crumbs"
      favorite
    >
      <book-cta-download :download="author.download" :files="author.files" />
    </layout-header>
    <div>
      <listing-block
        :entities="series"
        :count="author.count?.series"
        name="Series"
        endpoint="/authors/books"
      />
      <listing-block
        :entities="books"
        :count="author.count?.books"
        name="Books"
        endpoint="/authors/series"
      />
    </div>
    <!-- <entity-review
      :entity="author"
      class="border-t border-gray-400 dark:border-gray-700 pt-6 mt-10"
    /> -->
  </main>
</template>
