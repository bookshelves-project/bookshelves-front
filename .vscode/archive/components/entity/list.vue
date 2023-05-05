<script setup lang="ts">
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
  card: 'book',
})
</script>

<template>
  <div v-if="entities && entities.length">
    <transition-group name="list" tag="section" class="display-grid">
      <entity-card
        v-for="entity in entities"
        :key="entity.meta.slug"
        class="relative"
        :entity="entity"
        :card="card"
        :type="type"
        :entity-name="entityName"
      />
    </transition-group>
  </div>
  <div v-else class="text-center italic min-h-[10vh]">
    <div>There is no entries here!</div>
  </div>
</template>
