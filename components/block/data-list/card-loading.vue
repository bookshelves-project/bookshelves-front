<template>
  <div class="px-4 py-6 flex space-x-4">
    <div
      class="w-20 h-20 rounded-md animate-pulse bg-gray-300 dark:bg-gray-400"
    ></div>
    <div class="w-full">
      <div
        class="w-24 h-4 rounded-md animate-pulse bg-gray-300 dark:bg-gray-400"
      ></div>
      <div class="w-full mt-2">
        <div
          class="
            w-32
            lg:w-64
            h-4
            rounded-md
            animate-pulse
            bg-gray-300
            dark:bg-gray-400
          "
        ></div>
        <div
          class="
            mt-2
            w-32
            lg:w-64
            h-4
            rounded-md
            animate-pulse
            bg-gray-300
            dark:bg-gray-400
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardLoading'
}
</script>
