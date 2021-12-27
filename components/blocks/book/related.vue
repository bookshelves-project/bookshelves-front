<template>
  <BookSlider
    v-if="book"
    :entities="entities"
    :loaded="loaded"
    :route="{
      name: 'related-author-slug',
      params: {
        author: book.meta.author,
        slug: book.meta.slug,
      },
    }"
  >
    <template #title>Related books & series</template>
    <template #subtitle>
      Based on tags & genre, not in same series. Limited to 10 first results.
    </template>
  </BookSlider>
</template>

<script setup lang="ts">
import BookSlider from './slider.vue'
import { ApiEndpoint, ApiPaginateResponse, Book, Entity } from '~/types'

const props = defineProps<{
  book: Book
}>()

const { $repository } = useContext()
const entities = ref<Entity[]>()
const loaded = ref(false)

const loadRelated = () => {
  $repository(ApiEndpoint.BookRelated, false)
    .find<Entity[]>({ limit: '10' }, [
      props.book.meta.author as string,
      props.book.meta.slug as string,
    ])
    .then((e) => {
      entities.value = e.data
      loaded.value = true
    })
}

onMounted(async () => {
  await loadRelated()
})
</script>
