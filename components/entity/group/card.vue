<script setup lang="ts">
defineProps<{
  entity?: Entity
}>()

const { getDynamicRoute } = useEntityMethods()
</script>

<template>
  <div v-if="entity" class="md:flex p-4 md:p-0 h-full slider-card">
    <div>
      <app-img
        class="w-32 h-32 md:w-64 mx-auto md:h-full md:rounded-none rounded-full object-cover object-top cover"
        :src="entity.cover?.original"
        :color="entity.cover?.color"
        :title="entity.title"
      />
    </div>
    <div
      class="pt-6 md:p-5 text-center md:text-left space-y-4 w-full dark:text-gray-100"
    >
      <div>
        <span class="text-sm font-medium text-gray">Title </span>
        <h3 class="font-semibold">
          {{ entity.title }}
        </h3>
      </div>
      <div class="hidden lg:block">
        <span class="text-sm font-medium text-gray">Authors </span>
        <h3 class="font-semibold">
          <entity-authors-links :authors="entity.authors" short />
        </h3>
      </div>
      <div v-if="entity.volume" class="hidden lg:block">
        <span class="text-sm font-medium text-gray">Volume </span>
        <h3 class="font-semibold">
          {{ entity.volume }}
        </h3>
      </div>
      <div class="pt-6">
        <app-button
          v-if="$route.params.slug !== entity.meta.slug"
          :color="`white`"
          :to="getDynamicRoute(entity)"
        >
          Refer to {{ entity.meta.entity }}
        </app-button>
        <span v-else class="italic text-gray"> Current page </span>
      </div>
    </div>
  </div>
</template>
