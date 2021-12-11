<template>
  <div :class="text ? 'space-y-6 sm:space-y-0' : ''" class="display-grid">
    <div v-for="i in 4" :key="i.id" class="pt-10 pb-10 animate-pulse">
      <div class="flex space-x-3">
        <div class="bg-gray-300 h-52 w-36 rounded-md"></div>
        <div v-if="text" v class="mt-3 space-y-4">
          <div
            v-for="j in 2"
            :key="j.id"
            class="h-6 w-28 rounded-md bg-gray-300"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    text: {
      type: Boolean,
      default: true
    }
  }
}
</script>
