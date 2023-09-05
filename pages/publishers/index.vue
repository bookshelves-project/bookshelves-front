<script lang="ts" setup>
import type { Publisher } from '~/types'

const publishers = await useHttp<Publisher[]>({
  name: '/publishers',
  query: {
    'filter[negligible]': false,
    'full': true,
  },
})

const crumbs: string[] = [
  'Publishers',
]

useMetadata({
  title: 'Publishers',
  description: 'Discover your books by publisher',
})
</script>

<template>
  <main v-if="publishers" class="main-content">
    <layout-header
      title="Publishers"
      subtitle="Discover your books by publisher"
      :crumbs="crumbs"
    />
    <listing-relation
      :models="publishers"
      :to="{
        name: 'publishers-publisher_slug',
        params: {
          publisher_slug: 'meta.slug',
        },
      }"
    />
  </main>
</template>
