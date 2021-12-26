<template>
  <transition name="slide-right">
    <div class="content">
      <div v-if="bookAvailable" class="content-wrapper">
        <div
          v-for="(item, index) in navigation.toc"
          :key="index"
          class="content-item"
          @click="jumpTo(item.href)"
        >
          <span class="text">{{ item.label }}</span>
        </div>
      </div>
      <div v-else class="empty">load...</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Content',
  props: {
    navigation: Object,
    bookAvailable: Boolean,
  },
  methods: {
    jumpTo(href) {
      this.$emit('jumpTo', href)
    },
  },
}
</script>
