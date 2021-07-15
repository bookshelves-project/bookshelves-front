<template>
  <span class="inline-flex items-center group">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <!-- On: "", Off: "" -->
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
      <!-- On: "translate-x-5", Off: "translate-x-0" -->
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
        <!-- On: "opacity-0 ease-out duration-100", Off: "opacity-100 ease-in duration-100" -->
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
          <svg
            v-if="colorMode === 'light'"
            class="
              text-gray-400
              transition-colors
              duration-300
              icon-color
              group-hover:text-primary-600
            "
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </span>
        <!-- On: "opacity-100 ease-in duration-100", Off: "opacity-0 ease-out duration-100" -->
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
          <svg
            class="text-primary-600 icon-color"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </span>
      </span>
    </button>
  </span>
</template>

<script>
export default {
  name: 'ColorSwitcher',
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
  /* height: 1.5rem; */
  /* width: 2.7rem; */
}
.toggle-inner {
  @apply h-5 w-5;
}
.icon-color {
  @apply h-4 w-4;
}
</style>
