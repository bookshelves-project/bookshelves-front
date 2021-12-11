<template>
  <BookSlider
    v-if="book.serie"
    :entities="entities"
    :loaded="loaded"
    :route="{
      name: 'series-author-slug',
      params: {
        author: book.serie.meta.author,
        slug: book.serie.meta.slug,
      },
    }"
  >
    <template #title>{{ book.serie.title }}'s series</template>
    <template #subtitle>Current: vol. {{ book.volume }}, limited to 10 next volumes.</template>
  </BookSlider>
</template>

<script setup lang="ts">
import BookSlider from './slider.vue'
import { ApiEndpoint, ApiResponse, Book, Entity } from '~/types'

const props = defineProps<{
  book: Book
}>()

const { $repository } = useContext()
const entities = ref<Entity[]>()
const loaded = ref(false)

const loadSerie = () => {
  if (props.book.serie !== null) {
    $repository(ApiEndpoint.SerieBook, false).index({}, [
      props.book.volume?.toString(10) as string,
      props.book.serie?.meta.author as string,
      props.book.serie?.meta.slug as string
    ]).then((e: ApiResponse<Entity[]>) => {
      entities.value = e.data
      loaded.value = true
    })
  }
}

onMounted(async () => {
  await loadSerie()
})
</script>
