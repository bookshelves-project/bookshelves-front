<template>
  <div>
    <fields-toggle v-model="toggled" alt="Switch color mode" enabled="moon" disabled="sun" />
  </div>
</template>

<script setup lang="ts">
const { $colorMode } = useContext()
const toggled = ref(false)

watch(() => toggled.value, (newVal) => {
  if (toggled.value) {
    $colorMode.preference = 'dark'
  } else {
    $colorMode.preference = 'light'
  }
})
watch(() => $colorMode.value, (newVal) => {
  if ($colorMode.value === 'dark') {
    toggled.value = true
  } else {
    toggled.value = false
  }
})
</script>
