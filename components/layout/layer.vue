<template>
  <div v-if="$store.state.layerVisible">
    <div
      :class="$store.state.sidebarOpened ? 'opacity-80' : 'opacity-0'"
      class="fixed inset-0 z-40 transition-opacity duration-300 ease-linear bg-gray-800"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Layer',
}
</script>
