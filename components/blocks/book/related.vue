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
    <template #title>
      Related books & series
    </template>
    <template #subtitle>
      Based on tags & genre, not in same series. Limited to 10 first
      results.
    </template>
  </BookSlider>
</template>

<script setup lang="ts">
import BookSlider from './slider.vue'
import { ApiEndpoint } from '~/composables/repository'
import { ApiPaginateResponse, Book, Entity } from '~/types'

const props = defineProps<{
  book: Book
}>()

const { $repository } = useContext()
const entities = ref<Entity[]>()
const loaded = ref(false)

const loadSerie = () => {
  if (props.book.serie !== null) {
    $repository(ApiEndpoint.BookRelated, false).index({ limit: '10' }, [
      props.book.meta.author as string,
      props.book.meta.slug as string
    ])
      .then((e: ApiPaginateResponse<Entity>) => {
        entities.value = e.data
        loaded.value = true
      })
  }
}

onMounted(async () => {
  await loadSerie()
})
</script>
