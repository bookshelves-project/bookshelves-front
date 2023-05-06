<script setup lang="ts">
interface Props {
  modelValue?: number
  rating?: number
  max?: number
  disabled?: boolean
}

const {
  modelValue,
  rating = 0,
  max = 5,
  disabled = false,
} = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
const stars = ref(0)
const current = ref(0)
const currentColor = ref([1, 2, 3, 4, 5])
const currentRating = ref(0)

stars.value = max
currentRating.value = modelValue || rating

function set(id: number) {
  current.value = id
  currentColor.value = Array(current.value)
    .fill(current.value, 1)

    .map((x, i) => i)
}
function save(id: number) {
  currentRating.value = id
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="inline-block">
    <label
      v-if="!disabled"
      for="rating"
      class="sr-only block text-sm font-medium text-gray-700 dark:text-gray-100 sm:mt-px sm:pt-2"
    >
      Rating
    </label>
    <div @mouseleave="disabled ? '' : set(0)">
      <div
        id="rating"
        name="rating"
        class="flex items-center space-x-1"
        :class="{ 'py-2': !disabled }"
      >
        <div
          v-for="(star, id) in stars"
          :key="id"
          class="text-gray-400 dark:text-gray-300 relative"
          :class="[
            {
              star: currentColor.includes(id + 1),
            },
            { 'cursor-pointer': !disabled },
          ]"
          @mouseover="disabled ? '' : set(id + 1)"
          @click="disabled ? '' : save(id + 1)"
        >
          <SvgIcon
            v-if="currentRating >= star"
            name="star-full"
            :class="[disabled ? 'w-5 h-5' : 'w-8 h-8']"
            class="star absolute inset-0"
          />
          <SvgIcon name="star" :class="[disabled ? 'w-5 h-5' : 'w-8 h-8']" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.star {
  @apply text-gray-900 dark:text-gray-100;
}
</style>
