<template>
  <div :style="cssVars" class="relative">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <div class="mt-1 relative">
      <input
        :id="name"
        v-model="range"
        :aria-describedby="`${name}-description`"
        :name="name"
        type="range"
        :list="name"
        :min="0"
        :max="list.length - 1"
        class="slider"
      />
      <datalist :id="name">
        <option v-for="option in list" :key="option.id">
          {{ option }}
        </option>
      </datalist>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldRange',
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      range: 5,
      list: ['woman', 'non-binary', 'man']
    }
  },
  computed: {
    cssVars() {
      return {
        '--list': this.list.length,
        '--step': '12px'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.slider {
  -webkit-appearance: none;
  @apply bg-gray-200 h-2 w-full rounded-md outline-none opacity-70;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  @apply w-5 h-5 bg-primary-600 cursor-pointer rounded-full;
}

.slider::-moz-range-thumb {
  @apply w-5 h-5 bg-primary-600 cursor-pointer rounded-full;
}
.slider::-moz-range-progress {
  @apply h-2 bg-primary-600 rounded-md;
}

/* style range */
/* input[type='range'] {
  width: 100%;
  max-width: 100%;
  margin-left: 0;
} */

/* style datalist */
input[type='range'] + datalist {
  display: block;
  margin-top: -4px;
}
input[type='range'] + datalist option {
  display: inline-block;
  width: calc((100% - var(--step)) / (var(--list) - 1));
  text-align: center;
}
input[type='range'] + datalist option:first-child {
  width: calc((100% - var(--step)) / ((var(--list) - 1) * 2) + 6px);
  text-align: left;
}
input[type='range'] + datalist option:last-child {
  width: calc((100% - var(--step)) / ((var(--list) - 1) * 2) + 6px);
  text-align: right;
}
</style>
