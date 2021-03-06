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
      group: entity.route,
    }"
    class="rounded-lg shadow mx-1 my-1"
  >
    <div class="relative">
      <app-img
        class="w-full h-48 object-cover rounded-t-lg"
        :src="entity.image"
        :color="entity.color"
        :alt="entity.title"
      />
      <div
        class="absolute top-0 inset-x-0 h-full py-2 px-3 flex items-end justify-start overflow-hidden"
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
    </div>
    <div
      :class="{
        'group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-100':
          entity.route,
      }"
      class="pt-2 pb-5 bg-white dark:bg-gray-800 dark:bg-opacity-50 rounded-b-lg"
    >
      <div class="px-3">
        <div class="text-gray flex items-center line-clamp-1">
          <span v-if="entity.language" class="font-semibold">{{
            entity.language
          }}</span
          ><span v-if="entity.serie?.volume" class="italic">
            • vol. {{ entity.serie?.volume }}</span
          >
        </div>
        <h2
          :class="entity.language || entity.serie?.volume ? 'mt-3' : ''"
          class="text-xl line-clamp-1"
        >
          {{ entity.title }}
        </h2>
        <div class="mt-1 text-gray space-x-1 line-clamp-1">
          <span v-if="entity.entityName">{{
            capitalize(entity.entityName)
          }}</span>
          <span v-if="entity.serie">{{ entity.serie.title }}</span>
          <span v-if="entity.count">{{ entity.count }}</span>
          <span v-else><br /></span>
        </div>
      </div>
      <div v-if="entity.authors" class="mt-auto">
        <div class="mt-3 px-3 font-semibold line-clamp-1">
          {{ entity.authors }}
        </div>
      </div>
    </div>
  </component>
</template>
