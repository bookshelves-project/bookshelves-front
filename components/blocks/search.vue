<template>
  <div>
    <autocomplete-search-bar class="w-full" @searching="searching" />
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import autocompleteSearchBar from './autocomplete-search-bar.vue'
export default {
  name: 'Search',
  components: { autocompleteSearchBar },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    searching(result) {
      this.$emit('searching', result)
    },
  },
}
</script>
