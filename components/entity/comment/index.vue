<script setup lang="ts">
import EntityCommentList from '@/components/entity/comment/list.vue'
import FormComment from '@/components/form/comment.vue'
import FieldRatingStars from '@/components/field/rating-stars.vue'

const props = defineProps<{
  entity: Book | Author | Serie | Entity
}>()

const { moduleSocial, moduleSocialRating } = useRuntimeConfig()
const { nuxtFetchBase } = useFetchable()
const comments = ref<CommentData[]>()

const load = async () => {
  if (props.entity.meta.comments) {
    const response = await nuxtFetchBase<ApiPaginateResponse<CommentData[]>>(
      props.entity.meta.comments
    )

    comments.value = response.data
  }
}
await load()

const avg = computed(() => {
  let avg = undefined
  const ratings: any[] = []
  if (comments.value) {
    comments.value.forEach((comment) => {
      if (comment.rating) {
        ratings.push(comment.rating)
      }
    })
    const sum = ratings.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    avg = sum / ratings.length || 0
  }

  return avg
})
const refresh = async (slug: string) => {
  // try {
  //   const entity = this.$route.name.split('-')[0].slice(0, -1)
  //   const comments = await this.$axios.$get(`/comments/${entity}/${slug}`)
  //   this.commentsList = comments.data
  // } catch (error) {
  //   console.error(error)
  // }
}
</script>

<template>
  <section v-if="moduleSocial" aria-labelledby="book-comments" class="mt-6">
    <h2
      id="book-heading"
      class="text-2xl font-handlee font-semibold text-primary-600 dark:text-gray-100"
    >
      Comments
    </h2>
    <div class="flex items-center space-x-3">
      <p class="text-gray-500 dark:text-gray-400">
        {{ comments ? comments.length : '0' }} comments
      </p>
      <div v-if="moduleSocialRating && comments && comments.length > 5">
        <field-rating-stars :rating="avg" disabled />
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <entity-comment-list :comments="comments" class="col-span-2" />
      <form-comment class="col-span-1" @refresh="refresh" />
    </div>
  </section>
</template>
