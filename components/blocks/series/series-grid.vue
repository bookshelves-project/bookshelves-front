<template>
  <div
    class="grid grid-cols-1 gap-10 2xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <serie-card
      v-for="(serie, serieId) in series"
      v-cloak
      :id="serieId"
      :key="serieId"
      :serie="serie"
    />
  </div>
</template>

<script>
import SerieCard from './serie-card.vue'

export default {
  name: 'SeriesGrid',
  components: { SerieCard },
  props: {
    series: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" scoped></style>
