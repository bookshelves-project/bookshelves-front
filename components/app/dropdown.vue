<template>
  <div v-click-outside="() => (open = false)" class="relative">
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
        class="absolute z-50 mt-2 rounded-md shadow-lg dark:rounded-none ring-1 ring-primary-600 ring-opacity-5"
        :class="[alignmentClasses]"
        style="display: none"
        @click="clickClose ? (open = false) : ''"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'Dropdown',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    align: {
      type: String,
      default: 'right'
    },
    arrow: {
      type: Boolean,
      default: false
    },
    clickClose: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      open: false
    }
  },

  computed: {
    alignmentClasses() {
      if (this.align === 'left') {
        return 'origin-top-left left-0'
      } else if (this.align === 'right') {
        return 'origin-top-right right-0'
      } else {
        return 'origin-top'
      }
    }
  },

  created() {
    const closeOnEscape = (e) => {
      if (this.open && e.keyCode === 27) {
        this.open = false
      }
    }

    if (process.client) {
      document.addEventListener('keydown', closeOnEscape)
    }
  },

  unmounted() {
    const closeOnEscape = (e) => {
      if (this.open && e.keyCode === 27) {
        this.open = false
      }
    }

    document.removeEventListener('keydown', closeOnEscape)
  }
}
</script>
