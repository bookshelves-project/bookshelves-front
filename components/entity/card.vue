<script setup lang="ts">
interface Props {
  entity?: EntityList
  type?: boolean
  entityName?: boolean
  card?: 'book' | 'square' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  entity: undefined,
  type: false,
  entityName: false,
  card: 'book',
})

const entity: UseEntity = useEntity(props.entity, props.type, props.entityName)
</script>

<template>
  <component :entity="entity" :is="`entity-card-${card}`" />
</template>
