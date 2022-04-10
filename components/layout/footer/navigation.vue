<script setup lang="ts">
import LayoutFooterColumn from '@/components/layout/footer/column.vue'
import { useNavigationStore } from '~~/store/navigation'

const {
  getFooterAdvanced,
  getFooterLegal,
  getFooterProject,
  getFooterSupport,
} = useNavigationStore()
</script>

<template>
  <div
    class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:col-span-2 xl:mt-0"
  >
    <div class="md:grid md:grid-cols-2 md:gap-8">
      <layout-footer-column :column="getFooterProject" />
      <layout-footer-column class="mt-12 md:mt-0" :column="getFooterSupport" />
    </div>
    <div class="md:grid md:grid-cols-2 md:gap-8">
      <layout-footer-column :column="getFooterAdvanced" />
      <layout-footer-column class="mt-12 md:mt-0" :column="getFooterLegal" />
    </div>
  </div>
</template>
