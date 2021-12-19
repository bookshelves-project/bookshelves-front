<template>
  <component
    :is="component"
    ref="btn"
    :to="to ? localePath(to) : null"
    :target="href !== null ? (download ? '' : '_blank') : null"
    :rel="href !== null ? 'noopener noreferrer' : null"
    :type="component === 'button' ? type : null"
    :class="[color, { disabled: disabled }, overrideClass]"
    class="btn relative"
    :disabled="disabled"
    :download="download"
    @click="$emit('click')"
  >
    <div class="inline-block" :class="alignData">
      <slot />
    </div>
    <span v-if="external" class="hidden md:block absolute right-3">
      <svg-icon name="external-link" class="w-4 h-4" />
    </span>
  </component>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    color: {
      type: String,
      default: 'secondary',
      validator: (val) =>
        ['secondary', 'primary', 'white', 'danger'].includes(val),
    },
    href: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object],
      default: null,
    },
    // Only for true hackers & trickers
    overrideComponent: {
      type: String,
      default: null,
    },
    overrideClass: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
      validator: (val) => ['button', 'reset', 'submit'].includes(val),
    },
    external: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: 'left',
      validator: (val) => ['left', 'center', 'right'].includes(val),
    },
    download: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      component: 'button',
    }
  },
  computed: {
    alignData() {
      const alignements = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
        default: 'mx-auto',
      }
      return alignements[this.align] || alignements.default
    },
  },
  created() {
    if (this.href !== null) {
      this.component = 'a'
    }
    if (this.to !== null) {
      this.component = 'nuxt-link'
    }
    if (this.overrideComponent) {
      this.component = this.overrideComponent
    }
  },
  mounted() {
    if (this.href) {
      const btn = this.$refs.btn
      btn.setAttribute('href', this.href)
    }
  },
}
</script>

<!-- <template>
  <div>
    <component :is="'button'" />
    <div
      ref="btn"
      :target="href ? (download ? '' : '_blank') : null"
      :rel="href ? 'noopener noreferrer' : null"
      :type="component === 'button' ? type : null"
      :class="[color, { disabled: disabled }]"
      class="btn relative"
      :disabled="disabled"
      :download="download"
      @click="$emit('click')"
    >
      <div class="inline-block" :class="alignment">
        <slot />
        {{ component }}
      </div>
      <span v-if="href" class="block ml-1">
        <svg-icon name="external-link" class="w-4 h-4" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ObjectLiteral, Route } from '~/types'

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
  to: Route
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

const component = ref('button')
const isButton = ref(true)
const btn = ref(null)

if (props.href) {
  component.value = 'a'
}
if (props.to) {
  component.value = 'nuxt-link'
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
</script> -->

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
