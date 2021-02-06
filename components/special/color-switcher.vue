<template>
  <span class="inline-flex">
    <button
      class="transition duration-150 ease-in-out rounded-md hover:text-primary-500 focus:outline-none group"
      aria-label="Color Mode"
      @click="
        $colorMode.value === 'dark'
          ? ($colorMode.preference = 'light')
          : ($colorMode.preference = 'dark')
      "
    >
      <client-only>
        <IconSun v-if="$colorMode.value === 'light'" class="w-6 h-6" />
        <IconMoon
          v-else
          class="w-6 h-6 text-white transition-colors duration-300 group-hover:text-gray-300"
        />
      </client-only>
    </button>
  </span>
</template>

<script>
export default {
  name: 'ColorSwitcher',
}
</script>
