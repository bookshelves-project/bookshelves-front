<script setup lang="ts">
import AppImg from '@/components/app/img.vue'
import { capitalize } from '@/utils/methods'

const props = defineProps<{
  entity: EntityList
  noType?: boolean
  squareForm?: boolean
  entityName?: boolean
}>()

const {
  title,
  image,
  color,
  route,
  authors,
  serie,
  language,
  count,
  type,
  entity,
} = useEntity(props.entity)
</script>

<template>
  <component
    v-if="squareForm"
    :is="route ? 'router-link' : 'span'"
    :to="route ? $localePath(route) : '/'"
    :class="{
      'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md': route,
    }"
  >
    <div class="relative w-full h-72 rounded-lg overflow-hidden">
      <app-img
        class="h-full w-full object-cover"
        :src="image"
        :color="color"
        :alt="title"
      />
    </div>
    <div class="relative mt-4 px-2 pb-2">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900 dark:text-gray-100">
          {{ title }}
        </h3>
        <div>
          {{ language }}
        </div>
      </div>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ authors }}
      </p>
      <div class="mt-1 text-sm italic text-gray-500 dark:text-gray-400">
        <div v-if="entityName">
          {{ entity }}
        </div>
        {{ serie }}
        {{ count }}
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
        v-if="!noType"
        class="relative text-lg font-semibold text-white font-handlee"
      >
        {{ type }}
      </p>
    </div>
  </component>
  <div
    v-else
    :class="{ 'hover:bg-gray-100 dark:hover:bg-gray-800': route }"
    class="entity-card focus relative flex h-56 items-center space-x-3 rounded-sm transition-colors duration-75 m-1"
    :title="title"
  >
    <div class="h-full shrink-0 relative">
      <app-img
        class="h-full w-36 object-cover"
        :src="image"
        :color="color"
        :alt="title"
      />
      <div
        class="absolute top-0 inset-x-0 h-full py-2 px-3 flex items-end justify-start overflow-hidden"
      >
        <div
          aria-hidden="true"
          class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
        ></div>
        <p
          v-if="!noType"
          class="relative text-lg font-semibold text-white font-handlee"
        >
          {{ type }}
        </p>
      </div>
    </div>
    <div class="mt-2 h-full min-w-0 flex-1">
      <component
        :is="route ? 'router-link' : 'span'"
        :to="route ? $localePath(route) : '/'"
        class="text-black focus:outline-none dark:text-gray-100"
      >
        <span class="absolute inset-0" aria-hidden="true"></span>
        <h2 class="font-semibold">
          {{ title }}
        </h2>
        <h3 class="italic">
          {{ authors }}
        </h3>
        <div class="mt-1 text-sm sm:mt-3">
          <div class="italic">
            <div v-if="entityName">
              {{ capitalize(entity) }}
            </div>
            {{ serie }}
            {{ count }}
          </div>
          <div class="mt-1">
            {{ language }}
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<style lang="css" scoped>
.focus {
  @apply focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 dark:ring-offset-gray-700;
}
.dark :deep(.focus) {
  @apply focus-within:ring-primary-800 focus-within:ring-offset-gray-900;
}

.entity-card :deep(.app-img) {
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
}
</style>
