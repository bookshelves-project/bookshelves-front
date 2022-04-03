<script setup lang="ts">
import EntityCard from '@/components/entity/card.vue'

defineProps<{
  entities?: Book[] | Serie[] | Author[] | Entity[]
  noType?: boolean
  squareForm?: boolean
  entityName?: boolean
}>()
</script>

<template>
  <div v-if="entities">
    <transition-group name="list" tag="section" class="display-grid">
      <entity-card
        v-for="entity in entities"
        :key="entity.meta.slug"
        class="relative"
        :entity="entity"
        :no-type="noType"
        :square-form="squareForm"
        :entity-name="entityName"
      />
    </transition-group>
  </div>
</template>
