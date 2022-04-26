<script setup lang="ts">
import { capitalize } from '@/utils/methods'

defineProps<{
  entity: UseEntity
}>()
</script>

<template>
  <component
    :is="entity.route ? 'router-link' : 'span'"
    :to="entity.route ? $localePath(entity.route) : '/'"
    :class="{
      'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md': entity.route,
    }"
  >
    <div class="relative w-full h-48 rounded-lg overflow-hidden">
      <app-img
        class="h-full w-full object-cover"
        :src="entity.image"
        :color="entity.color"
        :alt="entity.title"
      />
    </div>
    <div class="relative mt-4 px-2 pb-2">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900 dark:text-gray-100">
          {{ entity.title }}
        </h3>
        <div>
          {{ entity.language }}
        </div>
      </div>
      <p class="mt-1 text-sm text-gray">
        {{ entity.authors }}
      </p>
      <div class="mt-1 text-sm italic text-gray">
        <div v-if="entity.entityName">
          {{ entity.entityName }}
        </div>
        <span v-if="entity.serie"
          >{{ entity.serie.title }}, vol. {{ entity.serie.volume }}</span
        >
        {{ entity.count }}
      </div>
    </div>
    <div
      class="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden"
    >
      <div
        aria-hidden="true"
        class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
      ></div>
      <p
        v-if="entity.type"
        class="relative text-lg font-semibold text-white font-handlee"
      >
        {{ entity.type }}
      </p>
    </div>
  </component>
</template>
