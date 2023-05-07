<script lang="ts" setup>
import type { EntityList, UseEntity } from '~/types'

const props = defineProps<{
  entity: EntityList
}>()

const entity: UseEntity = useEntity(props.entity)
</script>

<template>
  <article class="flex gap-4 flex-row group relative m-2 h-56">
    <app-img
      class="aspect-[4/5] w-32 flex-none rounded-md object-cover group-hover:shadow transition-all transform group-hover:scale-[1.02] duration-200"
      :src="entity.media?.url"
      :color="entity.media?.color"
      :alt="entity.media?.name"
    />
    <div class="flex-auto relative">
      <p class="mt-1 text-sm text-gray-600">
        {{ entity.authors }}
      </p>
      <h3
        class="text-lg mt-1 font-semibold text-gray-900 line-clamp-2 hyphens-auto h-14 my-auto"
        lang="en"
      >
        {{ entity.title }}
      </h3>
      <div class="mt-1 text-sm sm:mt-3 italic text-gray-600">
        <div v-if="entity.entityName" class="capitalize">
          {{ entity.entityName }}
        </div>
        <div v-if="entity.serie">
          <div>{{ entity.serie?.title }}</div>
          <div class="text-xs mt-2">
            Vol. {{ entity.serie?.volume }}
          </div>
        </div>
        {{ entity.count }}
      </div>
      <div class="absolute left-0 bottom-2 text-sm italic text-gray-600">
        {{ entity.language }}
      </div>
    </div>
    <typed-link
      :to="entity.route ? entity.route : { name: 'index' }"
      :title="entity.title"
      class="absolute inset-0 z-10"
    />
  </article>
</template>
