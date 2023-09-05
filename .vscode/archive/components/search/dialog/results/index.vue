<script lang="ts" setup>
defineProps<{
  search?: Search
}>()

const selected = ref<Entity>()
const selectedId = ref('')
const selectResult = (item: Entity) => {
  selected.value = item
  selectedId.value = `${item.meta.entity}-${item.meta.slug}`
}
</script>

<template>
  <div>
    <div class="flex divide-x divide-gray-100 dark:divide-gray-700">
      <!-- Preview Visible: "sm:h-96" -->
      <div class="h-[90vh] md:h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4 scrollbar-thin">
        <!-- Results, show/hide based on command palette state. -->
        <ul id="options" class="-mx-2 text-sm text-gray-700 dark:text-gray-300" role="listbox">
          <div
            v-if="search?.count"
            class="text-sm pt-2 pb-3 text-gray-600 dark:text-gray-400"
          >
            {{ search?.count }} results with "{{ search.query }}"
          </div>
          <transition-group name="list" tag="div">
            <li v-for="(collection, collectionId) in search?.results" :key="collectionId">
              <div v-if="collection?.length" class="mb-6">
                <div class="capitalize-first">
                  {{ collectionId }}
                </div>
                <ul class="space-y-1 mt-2">
                  <!-- Active: "bg-gray-100 text-gray-900" -->
                  <li
                    v-for="(item, itemId) in collection"
                    id="option-1"
                    :key="itemId"
                    :class="selectedId === `${item.meta.entity}-${item.meta.slug}` ? 'bg-gray-100 dark:bg-gray-700' : ''"
                    class="group flex cursor-pointer select-none items-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-100 justify-between"
                    role="option"
                    tabindex="-1"
                    @click="selectResult(item)"
                  >
                    <div class="flex items-center">
                      <app-img :src="item.media?.url" :alt="item.media?.name" :color="item.media?.color" class="h-10 w-10 flex-none rounded-full object-cover" />
                      <div class="ml-3">
                        <span class="block line-clamp-1">{{ item.title }}</span>
                        <span class="block line-clamp-1 text-sm text-gray-500 dark:text-gray-400 italic space-x-1">
                          <span class="capitalize">{{ item.meta.entity }}</span>
                          <span v-if="item.type" class="lowercase">({{ item.type }})</span>
                        </span>
                      </div>
                    </div>
                    <!-- Not Active: "hidden" -->
                    <!-- Heroicon name: solid/chevron-right -->
                    <svg class="ml-3 h-5 w-5 flex-none text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </li>
                </ul>
              </div>
            </li>
          </transition-group>
        </ul>
      </div>

      <!-- Active item side-panel, show/hide based on active state -->
      <search-dialog-results-side :selected="selected" />
    </div>
  </div>
</template>
