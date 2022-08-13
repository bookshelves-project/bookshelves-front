<script setup lang="ts">
defineProps<{
  to: Route
}>()
</script>

<template>
  <div class="main-content relative content-min-height">
    <div
      class="transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <p>
        If you see this page, redirection not work, click below to redirect
        yourself.
      </p>
      <div class="flex mt-6">
        <app-button :to="to" class="mx-auto">
          Manually redirect
        </app-button>
      </div>
    </div>
  </div>
</template>
