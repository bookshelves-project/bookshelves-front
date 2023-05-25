<script lang="ts" setup>
import type { EntityInstance } from '~/types'

const props = defineProps<{
  entity: EntityInstance
}>()

const entity = useEntityCard(props.entity)
</script>

<template>
  <article class="flex gap-4 flex-row group relative m-2 h-56 group">
    <div class="group-hover:shadow transition-all transform group-hover:scale-[1.02] duration-200 h-full relative">
      <app-img
        class="aspect-[4/5] w-36 flex-none rounded-md object-cover h-full"
        :src="entity.media?.url"
        :color="entity.media?.color"
        :alt="entity.media?.name"
      />
      <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
    </div>
    <div class="flex-auto relative">
      <p v-if="entity.subtitle" class="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {{ entity.subtitle }}
      </p>
      <h3
        class="text-base mt-1 font-semibold text-gray-900 line-clamp-3 hyphens-auto dark:text-gray-100 group-hover:underline"
        lang="en"
      >
        {{ entity.title }}
      </h3>
      <div class="absolute left-0 bottom-2 text-sm italic text-gray-600 dark:text-gray-400">
        <div v-if="entity.text">
          <!-- <div v-if="entity.entityName" class="capitalize">
            {{ entity.entityName }}
          </div>
          <div v-if="entity.serie">
            <div>{{ entity.serie?.title }}</div>
            <div class="text-xs mt-2">
              Vol. {{ entity.serie?.volume }}
            </div>
          </div>
          {{ entity.count }} -->
          {{ entity.text }}
        </div>
        <div v-if="entity.details" class="mt-5">
          {{ entity.details }}
        </div>
      </div>
    </div>
    <typed-link
      :to="entity.route ? entity.route : { name: 'index' }"
      :title="entity.title"
      class="absolute inset-0 z-10"
    />
  </article>
</template>
