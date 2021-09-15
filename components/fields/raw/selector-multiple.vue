<template>
  <div class="fr-input-group">
    <label class="fr-label" :for="name">
      {{ label }}
    </label>
    <div class="fr-input-wrap">
      <ul class="fr-tags-group">
        <li
          v-for="item in data"
          :key="item.value"
          @click="toggleItem(item.value)"
        >
          <span
            class="fr-tag"
            :class="{ selected: selected.includes(item.value) }"
          >
            <span>
              <span
                v-if="selected.includes(item.value)"
                class="fr-fi-subtract-line"
                aria-hidden="true"
              ></span>
              <span v-else class="fr-fi-add-line" aria-hidden="true"></span>
            </span>
            {{ item.label }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectorMultiple',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: 'name',
    },
  },
  data() {
    return {
      selected: [],
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        this.selected = newValue
      },
      deep: true,
    },
    selected(newValue, oldValue) {
      this.$emit('input', this.selected)
    },
  },
  methods: {
    toggleItem(value) {
      if (this.selected.includes(value)) {
        const index = this.selected.indexOf(value)
        if (index > -1) {
          this.selected.splice(index, 1)
        }
      } else {
        this.selected.push(value)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.fr-tag {
  cursor: pointer;
  transition: background-color 0.1s;
  &:hover {
    background-color: $blue-france-300;
  }
}
.selected {
  background-color: $blue-france-300;
}
</style>
