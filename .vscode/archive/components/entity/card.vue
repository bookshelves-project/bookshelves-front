<script setup lang="ts">
interface Props {
  entity?: EntityInstance
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
  <component :is="`entity-card-${card}`" :entity="entity" />
</template>
