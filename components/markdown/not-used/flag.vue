<template>
  <span>
    <img :src="formatLanguage(lang)" :alt="lang" class="flag" />
  </span>
</template>

<script>
import { formatLanguage } from '~/plugins/utils/methods'
export default {
  name: 'Flag',
  props: {
    lang: {
      type: String,
      default: 'en',
      validator: (val) => ['en', 'fr'].includes(val),
    },
  },
  data() {
    return {
      formatLanguage,
    }
  },
}
</script>

<style lang="postcss" scoped>
.flag {
  margin: 0 !important;
  display: initial !important;
}
</style>
