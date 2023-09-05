<script setup lang="ts">
defineProps<{
  entity: UseEntity
}>()
</script>

<template>
  <div
    :class="{ 'hover:bg-gray-100 dark:hover:bg-gray-800': entity.route }"
    class="entity-card focus relative flex h-56 items-center space-x-3 rounded-md transition-colors duration-75 m-1"
    :title="entity.title"
  >
    <div class="h-full shrink-0 relative">
      <div class="h-full w-36 relative">
        <app-img
          class="h-full w-36 object-cover rounded-md"
          :src="entity.media?.url"
          :color="entity.media?.color"
          :alt="entity.media?.name"
        />
        <div v-if="!entity.media?.available && entity.entity !== 'author'" class="absolute top-4 text-black right-3 text-right">
          <div class="text-xs uppercase font-semibold line-clamp-1">
            {{ entity.authors }}
          </div>
          <div class="text-sm font-bold mt-6">
            {{ entity.title }}
          </div>
          <div class="mt-2 text-xs font-semibold line-clamp-1">
            {{ entity.serie?.title ?? 'Serie' }}
          </div>
        </div>
      </div>
      <div
        v-if="entity.type"
        class="absolute top-0 inset-x-0 h-full py-2 px-3 flex items-end justify-start overflow-hidden rounded-md"
      >
        <div
          aria-hidden="true"
          class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
        />
        <p class="relative text-lg font-semibold text-white font-handlee">
          {{ entity.type }}
        </p>
      </div>
    </div>
    <div class="mt-2 h-full min-w-0 flex-1">
      <component
        :is="entity.route ? 'typed-link' : 'span'"
        :to="entity.route ? entity.route : { name: 'index' }"
        class="text-black focus:outline-none dark:text-gray-100"
      >
        <span class="absolute inset-0" aria-hidden="true" />
        <h2 class="font-semibold text-lg">
          {{ entity.title }}
        </h2>
        <h3 class="italic mt-2 line-clamp-2">
          {{ entity.authors }}
        </h3>
        <div class="mt-1 text-sm sm:mt-3">
          <div class="italic">
            <div v-if="entity.entityName" class="capitalize">
              {{ entity.entityName }}
            </div>
            <div v-if="entity.serie">
              {{ entity.serie?.title }}, vol. {{ entity.serie?.volume }}
            </div>
            {{ entity.count }}
          </div>
          <div class="mt-1">
            {{ entity.language }}
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
</style>
