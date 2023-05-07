<script setup lang="ts">
import type { Language, Tag } from '~/types'

const props = defineProps<{
  entities?: Tag[] | Language[]
  name?: string
  to?: AppRoute
  group?: boolean
}>()

const { arrayGroupBy } = useTools()
const bestCount = ref(0)

const entitiesByChar = computed((): Record<string, Language[] | Tag[]> => {
  return arrayGroupBy(props.entities!, 'first_char')
})

const { getBestCount } = useRelation(props.to)
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
      <h2 class="text-gray text-base font-medium uppercase tracking-wide">
        {{ char }}
      </h2>
      <listing-relation-group :count="bestCount" :items="items" :to="to" />
    </div>
  </div>
  <div v-else>
    <listing-relation-group :count="bestCount" :items="entities" :to="to" />
  </div>
</template>
