<script lang="ts" setup>
const props = defineProps<{
  entity: Book | Author | Serie | Entity
}>()

const rc = useRuntimeConfig()
const reviews = ref<Review[]>()

const { requestRaw } = useHttp()
const endpoint = props.entity.meta.reviews
if (endpoint) {
  const response = await requestRaw<ApiResponse<Review[]>>({
    endpoint,
  })
  reviews.value = response?.body.data
}

const avg = computed(() => {
  let avg
  const ratings: any[] = []
  if (reviews.value) {
    reviews.value.forEach((review) => {
      if (review.rating)
        ratings.push(review.rating)
    })
    const sum = ratings.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    avg = sum / ratings.length || 0
  }

  return avg
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const refresh = async (slug: string) => {
  // try {
  //   const entity = this.$route.name.split('-')[0].slice(0, -1)
  //   const reviews = await this.$axios.$get(`/reviews/${entity}/${slug}`)
  //   this.reviewsList = reviews.data
  // } catch (error) {
  //   console.error(error)
  // }
}
</script>

<template>
  <section v-if="rc.public.moduleSocial" aria-labelledby="book-reviews" class="mt-6">
    <h2
      id="book-heading"
      class="text-2xl font-handlee font-semibold text-primary-600 dark:text-gray-100"
    >
      Reviews
    </h2>
    <div class="flex items-center space-x-3">
      <p class="text-gray">
        {{ reviews ? reviews.length : '0' }} reviews
      </p>
      <div v-if="rc.public.moduleSocialRating && reviews && reviews.length > 5">
        <field-rating-stars :rating="avg" disabled />
      </div>
    </div>

    <div class="lg:grid lg:grid-cols-3 lg:gap-3">
      <entity-review-list :reviews="reviews" class="lg:col-span-2" />
      <form-review class="lg:col-span-1" @refresh="refresh" />
    </div>
  </section>
</template>
