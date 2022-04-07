<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import EntityBlock from '@/components/entity/block.vue'
import EntityComment from '@/components/entity/comment/index.vue'
import DownloadButton from '@/components/entity/download-button.vue'
const { params } = useRoute()
const { nuxtAsyncData, nuxtAsyncList } = useFetchable()

const title = ref('Author')

const author = ref<Author>()
const series = ref<ApiPaginateResponse<Entity[]>>()
const books = ref<ApiPaginateResponse<Entity[]>>()

const load = async () => {
  const [entity, listBook, listSerie] = await Promise.all([
    nuxtAsyncData<Author>('/authors', [params.slug]),
    nuxtAsyncList<Entity>('/authors/books', [params.slug]),
    nuxtAsyncList<Entity>('/authors/series', [params.slug]),
  ])
  author.value = entity
  series.value = listSerie
  books.value = listBook
  title.value = `${entity.firstname} ${entity.lastname}`
}
await load()

useMeta({
  title: title.value,
})
</script>

<template>
  <main v-if="author" class="main-content">
    <app-header
      :title="author.name"
      :image="author.cover?.thumbnail"
      :subtitle="`${author.count?.books} books`"
      :cta="author.link"
      :text="author.description"
      :entity="author"
      :breadcrumb="title"
      favorite
    >
      <download-button :download="author.download" :files="author.files" />
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
    <entity-comment
      :entity="author"
      class="border-t border-gray-400 dark:border-gray-700 pt-6 mt-10"
    />
  </main>
</template>
