<template>
  <div>{{ $truncate('message') }}</div>
</template>

<script  lang="ts">
export default defineComponent({
  methods: {
    myMethod() {
      this.$truncate('message')
    }
  }
})
</script>
