<script setup lang="ts">
import AppToast from '@/components/app/toast.vue'
import { useToastStore } from '~/store/toast'

// from: https://blog.aspiresys.pl/technology/toast-toasts-in-vue/
const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts as Toast[])
</script>

<template>
  <div class="fixed top-0 right-0 z-50">
    <transition-group name="list" tag="section">
      <div v-for="(toast, id) in toasts" :key="id + 1">
        <app-toast :toast="toast" />
      </div>
    </transition-group>
  </div>
</template>
