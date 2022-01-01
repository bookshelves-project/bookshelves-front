<template>
  <div class="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8 pb-16">
    <div class="transform scale-110 -rotate-6">
      <img src="/images/built-with/laravel.svg" alt="" />
    </div>
    <div
      class="col-start-3 transform scale-75 rotate-6 translate-x-2 translate-y-15"
    >
      <img src="/images/built-with/nuxt.svg" alt="" />
    </div>
    <div class="transform scale-150 translate-y-11">
      <img src="/images/built-with/tailwind.svg" alt="" />
    </div>
    <div class="transform translate-y-24">
      <img src="/images/built-with/typescript.svg" alt="" />
    </div>
    <div
      class="row-start-1 col-start-2 col-span-2 transform translate-x-20 translate-y-4"
    >
      <img src="/images/built-with/typescript.svg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
const technologies = ['laravel', 'nuxt', 'tailwind', 'typescript']
</script>

<style scoped></style>
