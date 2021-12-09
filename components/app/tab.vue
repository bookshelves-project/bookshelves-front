<template>
  <div
    v-show="isActive"
    :id="`tabpanel-${_uid}-panel`"
    class="flex-grow bg-white rounded-lg shadow-xl p-4"
    :class="{ 'fr-tabs__panel--selected': isActive }"
    role="tabpanel"
    :aria-labelledby="`tabpanel-${_uid}`"
    :tabindex="_uid"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppTab',
  props: {
    name: {
      type: String,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    href() {
      return '#' + this.name.toLowerCase().replace(/ /g, '-')
    }
  },
  mounted() {
    this.isActive = this.selected
  }
}
</script>
