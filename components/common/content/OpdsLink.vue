<template>
  <span class="flex">
    <app-button
      :color="`secondary`"
      :href="`${$config.apiURL}/ereader`"
      class="mx-auto"
    >
      Discover OPDS for eReaders
    </app-button>
  </span>
</template>

<script>
export default {
  name: 'OpdsLink',
}
</script>
