<template>
  <div class="fr-form-group">
    <fieldset class="fr-fieldset" :class="{ 'fr-fieldset--inline': inline }">
      <legend id="radio-legend" class="fr-fieldset__legend fr-text--regular">
        {{ legend }}
        <span v-if="required" class="text-red-marianne"> * </span>
        <span class="fr-hint-text">
          {{ helper }}
        </span>
      </legend>
      <div class="fr-fieldset__content">
        <div v-for="radio in config" :key="radio.id" class="fr-radio-group">
          <input
            :id="radio.value"
            v-model="radioValue"
            type="radio"
            :name="radio"
            :value="radio.value"
            @input="$emit('input', $event.target.value)"
          />
          <label class="fr-label" :for="radio.value">
            {{ radio.label }}
          </label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: String,
      default: '',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    legend: {
      type: String,
      default: null,
    },
    helper: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      radioValue: null,
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.radioValue = newValue
    },
  },
  mounted() {
    this.radioValue = this.value
  },
}
</script>
