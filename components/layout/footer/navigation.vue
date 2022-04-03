<script setup lang="ts">
import LayoutFooterColumn from '@/components/layout/footer/column.vue'
import { useNavigationStore } from '~~/store/navigation'

const navigation = useNavigationStore()
</script>

<template>
  <div
    class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:col-span-2 xl:mt-0"
  >
    <div class="md:grid md:grid-cols-2 md:gap-8">
      <layout-footer-column :column="navigation.footerProject" />
      <layout-footer-column
        class="mt-12 md:mt-0"
        :column="navigation.footerSupport"
      />
    </div>
    <div class="md:grid md:grid-cols-2 md:gap-8">
      <layout-footer-column :column="navigation.footerAdvanced" />
      <layout-footer-column
        class="mt-12 md:mt-0"
        :column="navigation.footerLegal"
      />
    </div>
  </div>
</template>
