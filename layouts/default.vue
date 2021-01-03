<template>
  <div>
    <Nuxt />
    <client-only>
      <tailwind-helper sneak />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
}
</script>
