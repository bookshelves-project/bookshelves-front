<script setup lang="ts">
const props = defineProps<{
  reviews?: Review[]
}>()

const list = ref<Review[]>()
list.value = props.reviews

const remove = (id: number) => {
  list.value = list.value?.filter(review => review.id !== id)
  // try {
  //   await this.$axios.$post(`/reviews/destroy/${id}`)
  // } catch (error) {
  //   console.error(error)
  // }
}
</script>

<template>
  <div class="space-y-10">
    <div
      v-if="reviews && reviews.length > 0"
      class="overflow-y-auto max-h-96 scrollbar-thin"
    >
      <transition-group name="list" tag="li">
        <entity-review-card
          v-for="review in list"
          :key="review.id"
          :review="review"
          @destroy="remove"
        />
      </transition-group>
    </div>
    <div v-else class="italic text-gray-400 mt-2">
      No reviews available
    </div>
  </div>
</template>
