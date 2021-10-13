<template>
  <div class="relative">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-600 dark:text-red-500"> * </span>
    </label>
    <div class="mt-1 relative">
      <textarea
        v-if="multiline"
        :id="name"
        :value="value"
        :name="name"
        :placeholder="placeholder"
        rows="4"
        :minlength="minlength > 0 ? minlength : ''"
        :maxlength="maxlength > 0 ? maxlength : ''"
        class="
          shadow-sm
          focus:ring-primary-500 focus:border-primary-500
          block
          w-full
          sm:text-sm
          rounded-md
          border border-gray-300
          dark:border-gray-700 dark:bg-gray-600 dark:text-white
          placeholder-gray-900
          dark:placeholder-gray-100
        "
        @input="$emit('input', $event.target.value)"
      ></textarea>
      <input
        v-else
        :id="name"
        :value="value"
        :name="name"
        :type="!obscureText && type === 'password' ? 'text' : type"
        :placeholder="placeholder"
        :autocomplete="autocomplete || name"
        :required="required"
        :minlength="minlength > 0 ? minlength : ''"
        :maxlength="maxlength > 0 ? maxlength : '256'"
        :step="type === 'time' ? 1 : null"
        class="
          shadow-sm
          focus:ring-primary-500 focus:border-primary-500
          block
          w-full
          sm:text-sm
          rounded-md
          border-gray-300
          dark:border-gray-700 dark:bg-gray-600 dark:text-white
        "
        @input="$emit('input', $event.target.value)"
      />
      <div v-if="type === 'search' && isLoading" class="eye">
        <app-loading />
      </div>
      <button
        v-if="type === 'password'"
        type="button"
        class="eye"
        @click="obscureText = !obscureText"
      >
        <svg-icon v-if="obscureText" name="eye"></svg-icon>
        <svg-icon v-else name="eye-off"></svg-icon>
      </button>
      <div
        v-if="minlength > 0 || maxlength > 0"
        class="flex justify-between mt-1 text-sm text-gray-400"
      >
        <div>
          <span v-if="minlength > 0"> Min. {{ minlength }} characters </span>
        </div>
        <div v-if="maxlength > 0">
          Currently {{ value.length }}/{{ maxlength }}
        </div>
      </div>
    </div>
    <p
      v-if="helper || $slots.default"
      :id="`${name}-description`"
      class="mt-2 text-sm text-gray-500 dark:text-gray-400"
    >
      <span v-if="helper">
        {{ helper }}
      </span>
      <slot v-else />
    </p>
    <p
      v-if="$slots.error"
      :id="`${name}-error`"
      class="mt-2 text-sm text-red-600 dark:text-red-500"
    >
      <slot name="error" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    multiline: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Date],
      default: '',
    },
    name: {
      type: String,
      default: 'name',
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: 'name',
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    minlength: {
      type: [Number, String],
      default: 0,
    },
    maxlength: {
      type: [Number, String],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helper: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    mask: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      obscureText: true,
      isLoading: false,
    }
  },
  computed: {
    typeData() {
      if (this.type !== 'youtube') {
        return this.type
      } else {
        return 'text'
      }
    },
    iconBtn() {
      if (this.icon) {
        return `fr-fi-${this.icon}`
      }
      return ''
    },
  },
  watch: {
    loading(newValue, oldValue) {
      this.isLoading = newValue
    },
  },
  mounted() {
    this.isLoading = this.loading
  },
}
</script>

<style lang="postcss" scoped>
.eye {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem;
  & /deep/ svg {
    @apply w-6 h-6 text-gray-500 dark:text-gray-400;
  }
}
</style>
