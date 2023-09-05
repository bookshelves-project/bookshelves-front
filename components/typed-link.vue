<script lang="ts" setup>
const props = defineProps<{
  to: any
}>()

let localePath = function (route: any) {
  return route
}
try {
  localePath = useLocalePath()
}
catch (error) {
  console.error('useLocalePath is not defined')
}

const route = props.to as unknown as any
</script>

<template>
  <NuxtLink :to="to ? localePath(route) : '/'">
    <slot />
  </NuxtLink>
</template>
