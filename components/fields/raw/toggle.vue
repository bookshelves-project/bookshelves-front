<template>
  <div
    class="fr-toggle"
    :class="[
      { 'fr-toggle--border-bottom': border },
      { 'fr-toggle--label-left': position === 'left' },
    ]"
  >
    <input
      :id="name"
      type="checkbox"
      class="fr-toggle__input"
      :aria-describedby="name"
      :checked="value"
      @change="switchValue"
    />
    <label
      class="fr-toggle__label"
      :for="name"
      data-fr-checked-label="Activé"
      data-fr-unchecked-label="Désactivé"
    >
      {{ label }}
    </label>
    <div v-if="helper" :id="`${name}-hint-text`" class="fr-hint-text">
      {{ helper }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: {
    value: {
      type: [String, Boolean],
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'toggle'
    },
    helper: {
      type: String,
      default: null
    },
    position: {
      type: String,
      default: 'right',
      validator: val => ['right', 'left'].includes(val)
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      enabled: false
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.enabled = newValue
    }
  },
  mounted() {
    if (this.value) {
      this.enabled = true
    }
  },
  methods: {
    switchValue($event) {
      this.$emit('input', $event.target.checked)
    }
  }
}
</script>
