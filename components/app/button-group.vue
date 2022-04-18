<script setup lang="ts">
import AppDropdown from '@/components/app/dropdown.vue'
import SvgIcon from '@/components/svg-icon.vue'

defineProps<{
  action?: string
  deployable?: boolean
  external?: boolean
  download?: boolean
}>()
</script>

<template>
  <span class="relative inline-flex shadow-sm rounded-md w-full">
    <a
      :href="action"
      :target="external ? '_blank' : '_self'"
      :download="download ? download : ''"
      type="button"
      :class="deployable ? 'rounded-l-md' : 'rounded-md'"
      class="button-group !px-5 w-full"
    >
      <slot />
    </a>
    <span v-if="deployable" class="-ml-px relative block">
      <app-dropdown align="right" auto-close>
        <template #trigger>
          <button
            type="button"
            class="button-group rounded-r-md"
            id="option-menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <span class="sr-only">Open options</span>
            <svg-icon name="solid-chevron" class="w-5 h-5" />
          </button>
        </template>
        <template #content>
          <div
            class="origin-top-right absolute right-0 mt-2 -mr-1 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="option-menu-button"
            tabindex="-1"
          >
            <slot name="content" />
          </div>
        </template>
      </app-dropdown>
    </span>
  </span>
</template>

<style lang="css" scoped>
.button-group {
  @apply relative inline-flex items-center px-2 py-2 border border-primary-700 bg-primary-600 text-sm font-medium text-white hover:bg-primary-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 h-full;
}
</style>
