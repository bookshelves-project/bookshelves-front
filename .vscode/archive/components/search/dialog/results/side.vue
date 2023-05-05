<script lang="ts" setup>
import { useSearchStore } from '~~/store/search'

defineProps<{
  selected?: Entity
}>()

const { formatAuthors } = useEntityMethods()
const searchStore = useSearchStore()
const { getDynamicRoute } = useEntityMethods()
</script>

<template>
  <transition>
    <div v-if="selected" class="hidden md:h-96 w-1/2 flex-none flex-col overflow-y-auto sm:flex scrollbar-thin">
      <div class="flex-none p-6 text-center">
        <img :src="selected?.media?.url" :alt="selected.media?.name" class="mx-auto h-16 w-16 rounded-full object-cover">
        <h2 class="mt-3 font-semibold text-gray-900 dark:text-gray-100">
          {{ selected?.title }}
        </h2>
        <p class="text-sm leading-6 text-gray-500 dark:text-gray-400 capitalize">
          {{ selected.meta.entity }}
        </p>
      </div>
      <div class="justify-between px-6">
        <app-button
          :to="getDynamicRoute(selected)"
          align="center"
          full
          @click="searchStore.closeDialog()"
        >
          Show
        </app-button>
        <dl class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-gray-300 mt-5">
          <dt v-if="selected.authors">
            Authors
          </dt>
          <dd v-if="selected.authors">
            {{ formatAuthors(selected.authors) }}
          </dd>
          <dt v-if="selected.language">
            Language
          </dt>
          <dd v-if="selected.language">
            {{ selected.language?.name }}
          </dd>
          <dt v-if="selected.serie">
            Serie
          </dt>
          <dd v-if="selected.serie">
            {{ selected.serie }}, vol.
            {{ selected.volume }}
          </dd>
        </dl>
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
dt {
  @apply col-end-1 font-semibold text-gray-900 dark:text-gray-100;
}
</style>
