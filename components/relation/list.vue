<script setup lang="ts">
import { groupBy } from '~/utils/methods'
import RelationGroup from '@/components/relation/group.vue'

const props = defineProps<{
  entities?: Tag[] | Language[]
  name?: string
  route?: Route
  group?: boolean
}>()

const bestCount = ref(0)

const entitiesByChar = computed((): Record<string, Language[] | Tag[]> => {
  return groupBy(props.entities!, 'firstChar')
})

const { getBestCount } = useRelation(props.route)
bestCount.value = getBestCount(props.entities!)
</script>

<template>
  <div v-if="!group">
    <div
      v-for="(items, char) in entitiesByChar"
      :id="`${name}-${char}`"
      :key="char"
      class="mt-6"
    >
      <h2
        class="text-gray-500 dark:text-gray-400 text-base font-medium uppercase tracking-wide"
      >
        {{ char }}
      </h2>
      <relation-group :count="bestCount" :items="items" :route="route" />
    </div>
  </div>
  <div v-else>
    <relation-group :count="bestCount" :items="entities" :route="route" />
  </div>
</template>
