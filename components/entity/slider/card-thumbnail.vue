<script setup lang="ts">
import EntityAuthorsLinks from '@/components/entity/authors-links.vue'
import AppImg from '@/components/app/img.vue'
import AppButton from '@/components/app/button.vue'

defineProps<{
  entity?: Entity
}>()
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
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >Title
        </span>
        <h3 class="font-semibold">
          {{ entity.title }}
        </h3>
      </div>
      <div class="hidden lg:block">
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >Authors
        </span>
        <h3 class="font-semibold">
          <entity-authors-links :authors="entity.authors" short />
        </h3>
      </div>
      <div v-if="entity.volume" class="hidden lg:block">
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >Volume
        </span>
        <h3 class="font-semibold">
          {{ entity.volume }}
        </h3>
      </div>
      <div class="pt-6">
        <app-button
          v-if="$route.params.slug !== entity.meta.slug"
          :color="`white`"
          :to="
            $localePath({
              name: `${entity.meta.entity}s-author-slug`,
              params: {
                author: entity.meta.author,
                slug: entity.meta.slug,
              },
            })
          "
        >
          Refer to {{ entity.meta.entity }}
        </app-button>
        <span v-else class="italic text-gray-500 dark:text-gray-400">
          Current page
        </span>
      </div>
    </div>
  </div>
</template>
