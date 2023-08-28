<script setup lang="ts">
import LayoutFooterColumn from '@/components/layout/footer/column.vue'
import { useNavigationStore } from '~~/stores/navigation'

const {
  getFooterAdvanced,
  getFooterLegal,
  getFooterSupport,
} = useNavigationStore()
</script>

<template>
  <div
    class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:col-span-2 xl:mt-0"
  >
    <LayoutFooterColumn :column="getFooterSupport" />
    <LayoutFooterColumn :column="getFooterAdvanced" />
    <LayoutFooterColumn :column="getFooterLegal" />
  </div>
</template>
