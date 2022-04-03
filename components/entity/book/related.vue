<script setup lang="ts">
import EntityBookSlider from '@/components/entity/book/slider.vue'

const props = defineProps<{
  book: Book
}>()

const { nuxtAsyncData } = useFetchable()
const entities = ref<Entity[]>()
const isAvailable = ref(true)
const loaded = ref(false)

const load = async () => {
  if (props.book !== null) {
    const list = await nuxtAsyncData<Entity[]>('/entities/related', [
      props.book.meta.author as string,
      props.book.meta.slug as string,
    ])
      .then((e) => {
        entities.value = e
        loaded.value = true
      })
      .catch(() => {
        isAvailable.value = false
      })
  }
}

onMounted(async () => {
  await load()
})
</script>

<template>
  <entity-book-slider
    v-if="book && isAvailable"
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
  </entity-book-slider>
</template>
