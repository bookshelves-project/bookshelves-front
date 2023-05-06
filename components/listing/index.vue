<script setup lang="ts">
import type { Author, Book, Entity, Serie } from '~/types'

interface Props {
  entities?: Book[] | Serie[] | Author[] | Entity[]
  type?: boolean
  entityName?: boolean
  card?: 'book' | 'full'
}

withDefaults(defineProps<Props>(), {
  entities: () => [],
  type: false,
  entityName: false,
})
</script>

<template>
  <div v-if="entities && entities.length">
    <transition-group name="list" tag="section" class="display-grid">
      <listing-card
        v-for="entity in entities"
        :key="entity.meta.slug"
        :entity="entity"
      />
    </transition-group>
  </div>
  <div v-else class="text-center italic min-h-[10vh]">
    <div>There is no entries here!</div>
  </div>
</template>
