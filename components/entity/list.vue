<script setup lang="ts">
import EntityCard from '@/components/entity/card.vue'

defineProps<{
  entities?: Book[] | Serie[] | Author[] | Entity[]
  noType?: boolean
  square?: boolean
  entityName?: boolean
}>()
</script>

<template>
  <div v-if="entities && entities.length">
    <transition-group name="list" tag="section" class="display-grid">
      <entity-card
        v-for="entity in entities"
        :key="entity.meta.slug"
        class="relative"
        :entity="entity"
        :no-type="noType"
        :square="square"
        :entity-name="entityName"
      />
    </transition-group>
  </div>
  <div v-else class="text-center italic min-h-[10vh]">
    <div>There is no entries here!</div>
  </div>
</template>
