<script setup lang="ts">
const props = defineProps<{
  book: Book
}>()

const { request } = useHttp()
const entities = ref<Entity[]>()
const isAvailable = ref(true)
const loaded = ref(false)

const load = async () => {
  if (props.book && props.book.serie !== null) {
    const response = await request<Entity[]>({
      endpoint: '/series/books',
      params: [
        props.book.volume?.toString(10) as string,
        props.book.serie?.meta.author,
        props.book.serie?.meta.slug
      ]
    })

    if (response.success) {
      entities.value = response.body
      loaded.value = true
    } else {
      isAvailable.value = false
    }
  }
}

onMounted(async () => {
  await load()
})
</script>

<template>
  <entity-group-slider-thumbnail
    v-if="book.serie"
    :loaded="loaded"
    :entities="entities"
    :route="{
      name: 'series-author-slug',
      params: {
        author: book.serie.meta.author,
        slug: book.serie.meta.slug,
      },
    }"
  >
    <template #title>
      {{ book.serie.title }}'s series
    </template>
    <template #subtitle>
      Current: vol. {{ book.volume }}, limited to 10 next volumes.
    </template>
  </entity-group-slider-thumbnail>
</template>
