<template>
  <div>
    <label v-if="label" :for="name" class="fr-label">
      <div class="flex items-center justify-between">
        <div>
          {{ label }}
        </div>
        <app-button
          type="button"
          size="sm"
          class="fr-ml-2w"
          @click="addItem"
        >Ajouter</app-button>
      </div>
      <span v-if="helper" class="fr-hint-text">{{ helper }}</span>
    </label>
    <ul class="list-group list-none list-outside fr-pl-2w">
      <transition-group name="list" tag="p">
        <li
          v-for="(item, index) in items"
          :key="index + 1"
          class="list-group-item fr-mt-3w"
        >
          <div class="flex items-center justify-between fr-mb-2w">
            <div>{{ configData.entity }} {{ index + 1 }}</div>
            <app-button
              type="button"
              color="secondary"
              size="sm"
              icon="close-circle-line"
              @click="removeItem(index)"
            >
              Retirer
            </app-button>
          </div>
          <div v-if="item">
            <span v-for="field in configData.fields" :key="field.id">
              <component
                :is="`fields-${field.component}`"
                v-model="item[field.name]"
                :label="field.label"
                :placeholder="field.placeholder"
                :helper="field.helper"
                :accept="field.accept"
                :options="field.options"
                :type="field.type"
                :required="field.required"
                class="repeater-field"
              />
            </span>
          </div>
        </li>
      </transition-group>
    </ul>
    <!-- <div>
      <pre>{{ $data }}</pre>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Repeater',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: 'name'
    },
    label: {
      type: String,
      default: ''
    },
    helper: {
      type: String,
      default: null
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: {},
      items: []
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.items = newValue
    },
    items: {
      handler(newValue, oldValue) {
        this.$emit('input', newValue)
      },
      deep: true
    },
    config: {
      handler(newValue, oldValue) {
        this.configData = newValue
      },
      deep: true
    }
  },
  mounted() {
    if (this.value) {
      this.items = this.value
    }
    if (this.config) {
      this.configData = this.config
    }
  },
  methods: {
    addItem() {
      const item = {}
      this.config.fields.forEach((element) => {
        item[element.name] = ''
      })
      this.items.push(item)
    },
    removeItem(index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style lang="postcss" scoped>
.list-group-item {
  & div {
  }
}
.repeater-field {
  margin: 1.5rem 0;
}
</style>
