<template>
  <div v-click-outside="closeDropdown" class="relative">
    <span @click="open = !open">
      <slot name="trigger"></slot>
    </span>

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
        class="
          absolute
          z-40
          mt-2
          rounded-md
          shadow-lg
          ring-1 ring-primary-600 ring-opacity-5
        "
        :class="[
          alignmentClasses,
          contentClasses,
          large ? 'w-full' : widthClass,
        ]"
        style="display: none"
        @click="open = false"
      >
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'DropdownTemplate',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    align: {
      type: String,
      default: 'right',
    },
    width: {
      type: Number,
      default: 48,
    },
    contentClasses: {
      type: Array,
      default: () => ['bg-gray-100', 'dark:bg-gray-700'],
    },
    large: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      open: false,
    }
  },

  computed: {
    widthClass() {
      return `w-${this.width}`
    },

    alignmentClasses() {
      if (this.align === 'left') {
        return 'origin-top-left left-0'
      } else if (this.align === 'right') {
        return 'origin-top-right right-0'
      } else {
        return 'origin-top'
      }
    },
  },

  created() {
    const closeOnEscape = (e) => {
      if (this.open && e.keyCode === 27) {
        this.open = false
      }
    }

    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
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
  },

  methods: {
    closeDropdown(event) {
      this.open = false
    },
  },
}
</script>
