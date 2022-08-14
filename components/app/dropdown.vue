<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

interface Props {
  align?: 'left' | 'right'
  arrow?: boolean
  autoClose?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  align: 'right',
  arrow: false,
  autoClose: false
})

const open = ref(false)
const target = ref<HTMLElement>()

onClickOutside(target, () => (open.value = false))

const alignmentClasses = computed((): string => {
  if (props.align === 'left') {
    return 'origin-top-left left-0'
  } else if (props.align === 'right') {
    return 'origin-top-right right-0'
  } else {
    return 'origin-top'
  }
})
</script>

<template>
  <div ref="target" class="relative h-full">
    <button class="h-full rounded-md" type="button" @click="open = !open">
      <slot name="trigger" />
    </button>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="open"
        class="absolute top-8 z-50 mt-2 rounded-md shadow-lg ring-1 ring-primary-600 ring-opacity-5 dark:rounded-none"
        :class="[alignmentClasses]"
        style="display: none"
        @click="autoClose ? (open = false) : ''"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>
