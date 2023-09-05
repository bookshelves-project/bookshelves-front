<script setup lang="ts">
import type { SelectedEntities } from '~/types'

const props = defineProps<{
  selection: SelectedEntities
  right?: boolean
}>()

const emit = defineEmits<{
  (e: 'success', payload: boolean): void
}>()

const { getData, isAvailable, isLoading, slides } = useEntityGroup(
  props.selection,
)

watch(
  () => isAvailable.value,
  () => {
    emit('success', isAvailable.value)
  },
)

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div v-if="isAvailable">
    <section class="selected-books selected-entities-swiper relative mx-auto">
      <div
        :class="right ? 'text-right' : 'text-left'"
        class="text-sm font-semibold uppercase tracking-wide text-primary-600"
      >
        {{ selection.eyebrow }}
      </div>
      <h2
        :class="right ? 'text-right' : 'text-left'"
        class="mt-3 font-handlee text-3xl font-extrabold text-gray-700 dark:text-gray-300"
      >
        {{ selection.title }}
      </h2>
      <p
        :class="right ? 'text-right' : 'text-left'"
        class="mt-5 text-lg text-gray-900 dark:text-gray-100"
      >
        {{ selection.text }}
      </p>
      <div class="mt-10">
        <div
          v-if="isLoading"
          class="flex h-64 w-full animate-pulse items-center overflow-hidden rounded-md bg-gray-300 dark:bg-gray-600"
        />
        <div v-else>
          <div
            class="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14 slider-css scrollbar-thin"
          >
            <div v-for="slide in slides" :key="slide.meta.slug" class="card">
              <entity-card
                :entity="slide"
                class="card__entity"
                type
                entity-name
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped>
.slider-css {
  & .card {
    @apply snap-always snap-center shrink-0;
  }
  & .card__entity {
    @apply shrink-0 w-80;
  }
}
</style>
