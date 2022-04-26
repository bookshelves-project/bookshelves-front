<script setup lang="ts">
const props = defineProps<{
  count: number
  items?: Tag[] | Language[]
  route?: Route
}>()

const { color, getRoute, percent } = useRelation(props.route)
</script>

<template>
  <transition-group
    role="list"
    tag="ul"
    class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
  >
    <li v-for="item in items" :key="item.meta.slug">
      <router-link
        :to="$localePath(getRoute(item))"
        class="col-span-1 flex shadow-sm rounded-md group"
      >
        <div
          :class="color(percent(count, item.count))"
          class="flex-shrink-0 flex items-center justify-center w-16 text-gray-900 dark:text-gray-100 text-sm font-semibold rounded-l-md"
        >
          {{ item.firstChar }}
        </div>
        <div
          class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 rounded-r-md truncate group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:bg-gray-700 transition-colors duration-75"
        >
          <div class="flex-1 px-4 py-2 text-sm truncate">
            <p class="text-gray-900 font-medium dark:text-gray-100">
              {{ item.name }}
            </p>
            <p class="text-gray">{{ item.count }} books</p>
          </div>
        </div>
      </router-link>
    </li>
  </transition-group>
</template>

<style lang="css" scoped>
.yellow {
  @apply bg-yellow-200 dark:bg-yellow-800;
}
.orange {
  @apply bg-orange-200 dark:bg-orange-800;
}
.red {
  @apply bg-red-200 dark:bg-red-800;
}
.purple {
  @apply bg-purple-200 dark:bg-purple-800;
}
.blue {
  @apply bg-blue-200 dark:bg-blue-800;
}
.cyan {
  @apply bg-cyan-200 dark:bg-cyan-800;
}
.green {
  @apply bg-green-200 dark:bg-green-800;
}
</style>
