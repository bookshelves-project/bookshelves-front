<script setup lang="ts">
const props = defineProps<{
  book: Book
  css?: boolean
}>()

const emit = defineEmits<{
  (e: 'success', payload: boolean): void
}>()

const isAvailable = ref(true)

const related: SelectedEntities = {
  key: 'selection',
  endpoint: '/entities/related',
  paramsList: [props.book.meta.author, props.book.meta.slug],
  eyebrow: 'Do you want more?',
  right: false,
  title: 'Related books & series',
  text: 'Based on tags & genre, not in same series. Limited to 10 first results.'
}
const success = (payload: boolean) => {
  isAvailable.value = payload
  emit('success', payload)
}
</script>

<template>
  <div class="mt-8">
    <div v-if="isAvailable">
      <component
        :is="css ? 'entity-group-snap' : 'entity-group-slider'"
        :selection="related"
        @success="success"
      />
      <div class="mt-6 flex">
        <app-button
          :to="{
            name: 'related-author-slug',
            params: {
              author: book.meta.author,
              slug: book.meta.slug,
            },
          }"
          class="mx-auto"
          color="white"
          align="center"
        >
          View all results
        </app-button>
      </div>
    </div>
  </div>
</template>
