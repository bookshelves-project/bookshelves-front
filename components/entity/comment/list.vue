<script setup lang="ts">
import EntityCommentCard from '@/components/entity/comment/card.vue'

const props = defineProps<{
  comments?: CommentData[]
}>()

const list = ref<CommentData[]>()
list.value = props.comments

const remove = (id: number) => {
  list.value = list.value?.filter((comment) => comment.id !== id)
  // try {
  //   await this.$axios.$post(`/comments/destroy/${id}`)
  // } catch (error) {
  //   console.error(error)
  // }
}
</script>

<template>
  <div class="space-y-10">
    <div
      v-if="comments && comments.length > 0"
      class="overflow-y-auto max-h-96 scrollbar-thin"
    >
      <transition-group name="list" tag="li">
        <entity-comment-card
          v-for="comment in list"
          :key="comment.id"
          :comment="comment"
          @destroy="remove"
        />
      </transition-group>
    </div>
    <div v-else class="italic text-gray-400 mt-2">No comments available</div>
  </div>
</template>
