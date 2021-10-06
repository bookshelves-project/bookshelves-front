<template>
  <transition name="fade">
    <div
      v-if="!loading"
      class="tabs"
      :class="{
        'flex space-x-4': horizontal,
      }"
    >
      <ul
        class="
          list-none
          bg-primary-900 bg-opacity-30
          p-1.5
          rounded-lg
          text-center
          overflow-auto
          whitespace-nowrap
        "
        role="tablist"
        aria-label="Onglets"
        :class="[
          {
            'flex items-center mb-6 space-x-2': !horizontal,
          },
          {
            'space-y-2': horizontal,
          },
        ]"
      >
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="w-full rounded-lg"
          :class="
            tab.isActive
              ? 'text-primary-600 bg-white shadow-xl'
              : 'text-white hover:bg-white hover:bg-opacity-60 hover:text-primary-600 transition-colors duration-100'
          "
          :role="tab.name"
        >
          <label
            :for="`${_uid}${index}`"
            class="cursor-pointer block px-4 py-1.5"
            v-text="tab.name"
          />
          <input
            :id="`${_uid}${index}`"
            type="radio"
            role="tab"
            :aria-selected="tab.isActive"
            :aria-controls="`tabpanel-${_uid}-panel`"
            :name="`${_uid}-tab`"
            :value="index + 1"
            class="hidden"
            @click="selectTab(tab)"
          />
        </li>
      </ul>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppTabs',
  props: {
    horizontal: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      loading: true,
      tabs: [],
    }
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.loading = false
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name === selectedTab.name
      })
    },
  },
}
</script>

<style lang="postcss" scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
