<template>
  <component
    :is="tag"
    ref="btn"
    :to="to ? localePath(to) : null"
    :target="href ? (download ? '' : '_blank') : null"
    :rel="href ? 'noopener noreferrer' : null"
    :type="tag === 'button' ? type : null"
    :class="[color, { disabled: disabled }]"
    class="btn relative"
    :disabled="disabled"
    :download="download"
    @click="$emit('click')"
  >
    <span class="inline-block" :class="alignment">
      <slot />
    </span>
    <span v-if="href" class="block ml-1">
      <svg-icon name="external-link" class="w-4 h-4" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { Location, ObjectLiteral } from '~/types'

enum ButtonColor {
  secondary = 'secondary',
  primary = 'primary',
  white = 'white',
  danger = 'danger',
}
enum ButtonType {
  button = 'button',
  reset = 'reset',
  submit = 'submit',
}
enum ButtonAlignment {
  left = 'left',
  center = 'center',
  right = 'right',
}

interface Props {
  color: ButtonColor
  type: ButtonType
  align: ButtonAlignment
  href: string
  to: Location
  disabled: boolean
  download: boolean
}
const props = withDefaults(defineProps<Props>(), {
  color: ButtonColor.secondary,
  type: ButtonType.button,
  align: ButtonAlignment.left,
  href: undefined,
  to: undefined,
  disabled: false,
  download: false,
})

const tag = ref('button')
const btn = ref(null)

if (props.href) {
  tag.value = 'a'
}
if (props.to) {
  tag.value = 'nuxt-link'
}

const alignment = computed((): string => {
  const alignements: ObjectLiteral = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
    default: 'mx-auto',
  }
  return alignements[props.align] || alignements.default
})

onMounted(() => {
  if (props.href) {
    const element: any = btn.value
    if (element instanceof HTMLElement) {
      element.setAttribute('href', props.href)
    }
  }
})
</script>

<style lang="css" scoped>
.btn {
  @apply inline-flex items-center px-4 py-2 text-base font-semibold rounded-md transition-colors duration-100 border;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600;
  @apply dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800;
}
.secondary {
  @apply text-primary-600 bg-primary-100 border-transparent hover:bg-primary-200 hover:text-primary-600;
  @apply dark:bg-primary-200 dark:hover:bg-primary-300 dark:text-gray-800;
}
.primary {
  @apply border-transparent shadow-sm text-white bg-primary-600 hover:bg-primary-500;
}
.white {
  @apply border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-primary-100;
  @apply dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700;
}
.danger {
  @apply border-red-300 shadow-sm text-red-700 bg-white hover:bg-red-100;
  @apply dark:border-red-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-red-700;
}

.disabled {
  @apply opacity-70 !important;
  pointer-events: none;
}
</style>
