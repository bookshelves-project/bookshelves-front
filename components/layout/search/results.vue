<script setup lang="ts">
import { capitalize } from '~/utils/methods'
import AppImg from '@/components/app/img.vue'

defineProps<{
  entities?: Entity[]
  title?: string
}>()

const emit = defineEmits<{
  (e: 'close', status: boolean): void
}>()

const close = () => {
  emit('close', false)
}
</script>

<template>
  <div
    v-if="entities?.length"
    class="border-b border-gray-200 pt-3 dark:border-gray-600"
  >
    <h3 class="mb-3 text-lg italic text-gray-400 dark:text-gray-500">
      {{ title }}
    </h3>
    <transition-group name="list" tag="div">
      <router-link
        v-for="(entity, id) in entities"
        :key="id + 1"
        :to="
          $localePath({
            name:
              entity.meta.entity === 'author'
                ? `authors-slug`
                : `${entity.meta.entity}s-author-slug`,
            params: {
              author: entity.meta.author,
              slug: entity.meta.slug,
            },
          })
        "
        class="mb-6 flex items-center rounded-md p-2 text-left transition-colors duration-75 hover:bg-gray-200 dark:hover:bg-gray-700"
        :title="entity.title"
        @click.native="close"
      >
        <app-img
          :src="entity.cover?.thumbnail"
          class="h-14 w-14 object-cover rounded-md"
        />
        <div class="ml-4 overflow-hidden dark:text-gray-400">
          <div class="wiki-title">
            <div class="font-semibold">{{ entity.title }}</div>
            <div class="italic">
              {{ capitalize(entity.meta.entity) }}
              <span v-if="entity.type"
              >({{ entity.type.toLocaleLowerCase() }})</span
              >
            </div>
          </div>
          <div class="text-sm italic">
            <div v-if="entity.serie">
              {{ entity.serie }}, vol.
              {{ entity.volume }}
            </div>
          </div>
        </div>
      </router-link>
    </transition-group>
  </div>
</template>
