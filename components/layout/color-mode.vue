<template>
  <span class="inline-flex items-center group">
    <button
      type="button"
      aria-pressed="false"
      :class="colorMode === 'dark' ? 'bg-primary-600' : 'bg-gray-200'"
      class="
        relative
        inline-flex
        flex-shrink-0
        transition-colors
        duration-100
        ease-in-out
        border-2 border-transparent
        rounded-full
        cursor-pointer
        toggle
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-primary-600
      "
      aria-label="Color Mode"
      @click="switchColorMode()"
    >
      <span class="sr-only">Use setting</span>

      <span
        :class="colorMode === 'dark' ? 'translate-x-5' : 'translate-x-0'"
        class="
          relative
          inline-block
          transition
          duration-100
          ease-in-out
          transform
          bg-white
          rounded-full
          shadow
          toggle-inner
          ring-0
        "
      >
        <span
          :class="
            colorMode === 'dark' ? 'opacity-0 ease-out' : 'opacity-100 ease-in'
          "
          class="
            absolute
            inset-0
            flex
            items-center
            justify-center
            w-full
            h-full
            transition-opacity
            duration-100
          "
          aria-hidden="true"
        >
          <svg-icon
            name="sun"
            class="
              text-gray-400
              transition-colors
              duration-300
              icon-color
              group-hover:text-primary-600
            "
          />
        </span>
        <span
          :class="
            colorMode === 'dark' ? 'opacity-100 ease-in' : 'opacity-0 ease-out'
          "
          class="
            absolute
            inset-0
            flex
            items-center
            justify-center
            w-full
            h-full
            transition-opacity
            duration-100
          "
          aria-hidden="true"
        >
          <svg-icon
            name="moon"
            class="
              text-gray-400
              transition-colors
              duration-300
              icon-color
              group-hover:text-primary-600
            "
          />
        </span>
      </span>
    </button>
  </span>
</template>

<script>
export default {
  name: 'LayoutColorMode',
  computed: {
    colorMode: {
      get() {
        return this.$colorMode.value
      },
      set(newMode) {
        return newMode
      },
    },
  },
  watch: {
    colorMode(newCount, oldCount) {
      this.colorMode = this.$colorMode.value
    },
  },
  mounted() {
    setTimeout(() => {
      this.colorMode = this.$colorMode.value
    }, 100)
  },
  methods: {
    switchColorMode() {
      if (this.$colorMode.value === 'dark') {
        this.$colorMode.preference = 'light'
      } else {
        this.$colorMode.preference = 'dark'
      }
      this.colorMode = this.$colorMode.preference
    },
  },
}
</script>

<style lang="postcss" scoped>
.toggle {
  @apply h-6 w-11;
}
.toggle-inner {
  @apply h-5 w-5;
}
.icon-color {
  @apply h-4 w-4;
}
</style>
