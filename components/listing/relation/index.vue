<script setup lang="ts">
import type { Language, Publisher, Tag } from '~/types'

const props = defineProps<{
  models?: Tag[] | Language[] | Publisher[] | any[]
  name?: string
  to?: any
  group?: boolean
}>()

const { arrayGroupBy } = useTools()
const bestCount = ref(0)

const listing = arrayGroupBy(props.models || [], 'firstChar')

const { getBestCount } = useRelation(props.to)
bestCount.value = getBestCount(props.models || [])
</script>

<template>
  <div v-if="!group">
    <div
      v-for="(items, char) in listing"
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
    <listing-relation-group :count="bestCount" :items="models" :to="to" />
  </div>
</template>
