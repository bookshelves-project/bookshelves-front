<template>
  <div class="fr-input-group">
    <label class="fr-label" :for="name">
      {{ label }}
    </label>
    <select
      :id="name"
      class="fr-select"
      :name="name"
      @change="$emit('input', $event.target.value)"
    >
      <option value="null" :selected="selected === null" disabled hidden>
        Selectionnez une option
      </option>
      <option
        v-for="option in optionsData"
        :key="option.id"
        :selected="option.value === selected"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Selector',
  props: {
    value: {
      type: [
        String,
        Object,
        Number
      ],
      default: ''
    },
    name: {
      type: String,
      default: 'name'
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: null,
      optionsData: []
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.selected = newValue
    },
    options: {
      handler(newValue, oldValue) {
        this.optionsData = newValue
      },
      deep: true
    }
  },
  created() {
    this.optionsData = this.options
  },
  mounted() {
    if (this.value) {
      this.selected = this.value
    }
  }
}
</script>
