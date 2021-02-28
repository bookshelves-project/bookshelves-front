<template>
  <div class="p-5 mt-5 bg-yellow-200 border-2 border-yellow-300 rounded-md">
    <div
      class="flex items-center text-xl font-semibold text-yellow-600 uppercase"
    >
      <icon-exclamation-circle class="w-6 h-6" />
      <span class="ml-1"> Warning </span>
    </div>
    <div class="mt-2 text-yellow-600">
      Bookshelves is in development, if you create an account it will probably
      be deleted in a few days. Features once logged in are quite limited and
      are only useful for testing purposes. Come back later for the final
      version.
    </div>
  </div>
</template>

<script>
import IconExclamationCircle from '../common/icons/IconExclamationCircle.vue'
export default {
  name: 'AlertRegister',
  components: { IconExclamationCircle },
}
</script>

<style lang="postcss" scoped></style>
