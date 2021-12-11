<template>
  <div>
    <div
      :class="expanded ? 'rounded-t-lg' : 'rounded-lg'"
      class="
        flex
        items-center
        px-4
        py-3
        mt-4
        font-bold
        transition-colors
        duration-100
        bg-gray-100
        cursor-pointer
        hover:bg-gray-200
      "
      @click="switchSpoiler"
    >
      <svg-icon
        name="chevron-right"
        :class="{ rotate: expanded }"
        class="w-5 h-5 mr-2 transition-transform duration-300"
      />
      <div class="w-full">
        <span v-if="label" class="flex items-center justify-between">
          <div>
            {{ label }}
          </div>
          <small>
            {{ expanded ? 'Minimize' : 'Open' }}
          </small>
        </span>
        <span v-else>
          {{ expanded ? 'Minimize' : 'Open' }}
        </span>
      </div>
    </div>
    <transition-expand>
      <div v-if="expanded" class="p-6 bg-gray-100 rounded-b-lg">
        <slot></slot>
      </div>
    </transition-expand>
  </div>
</template>

<script>
import transitionExpand from './transition-expand.vue'
export default {
  name: 'Collapse',
  components: { transitionExpand },
  props: {
    label: {
      type: String,
      default: null
    },
    opened: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  mounted() {
    if (this.opened) {
      this.expanded = true
    }
  },
  methods: {
    switchSpoiler() {
      this.expanded = !this.expanded
      this.$emit('toggleCollapse', this.expanded)
    }
  }
}
</script>

<style lang="postcss" scoped>
.rotate {
  transform: rotate(90deg);
}
.expand-enter-active,
.expand-leave-active {
  transition-property: opacity, height;
}
.expand-enter,
.expand-leave-to {
  opacity: 0;
}
</style>
