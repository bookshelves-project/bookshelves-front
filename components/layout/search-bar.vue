<template>
  <div class="max-w-lg w-full lg:max-w-xs flex search-bar">
    <app-modal
      :open="modalOpened"
      size="xl"
      @close="(data) => setModalOpened(data)"
    >
      <layout-search-bar-modal />
    </app-modal>
    <label for="search" class="sr-only">Search</label>
    <div
      class="
        relative
        w-full
        text-gray-400
        focus-within:text-gray-600
        dark:focus-within:text-gray-500
      "
      @click="() => setModalOpened(!modalOpened)"
    >
      <div
        class="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          pl-3
          flex
          items-center
        "
      >
        <svg-icon name="magnify-glass" class="w-5 h-5" />
      </div>
      <div
        class="
          absolute
          cursor-text
          inset-0
          border border-gray-300
          dark:border-gray-600
          hover:border-2 hover:dark:border-primary-400 hover:border-primary-600
          transition-colors
          duration-75
          rounded-md
        "
      ></div>
      <input
        id="search"
        class="search"
        placeholder="Search"
        type="search"
        name="search"
      />
      <div class="absolute top-1/2 transform -translate-y-1/2 right-1.5">
        <span
          style="opacity: 1"
          class="
            hidden
            sm:block
            text-gray-400 text-sm
            leading-5
            py-0.5
            px-1.5
            border border-gray-300
            dark:border-gray-600
            rounded-md
          "
          ><span class="sr-only">Press </span
          ><kbd class="font-sans"
            ><abbr title="Control" class="no-underline"
              ><span class="mr-1" v-html="metaKey"></span> </abbr></kbd
          ><span class="sr-only"> and </span
          ><kbd class="font-sans uppercase" :title="searchKey">{{
            searchKey
          }}</kbd
          ><span class="sr-only"> to search</span></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'LayoutSearchBar',
  data() {
    return {
      metaKey: 'Ctrl',
      searchKey: 'k',
    }
  },
  computed: {
    ...mapState({
      modalOpened: (state) => state.search.modalOpened,
    }),
  },
  mounted() {
    window.addEventListener('keydown', this.shortcutOpen)
    window.addEventListener('keydown', this.shortcutClose)
    this.isMacintosh()
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.shortcutOpen)
    window.removeEventListener('keydown', this.shortcutClose)
  },
  methods: {
    ...mapMutations({
      setModalOpened: 'search/setModalOpened',
    }),
    isMacintosh() {
      if (navigator.userAgent.includes('Mac')) {
        this.metaKey = '&#8984;'
      } else {
        this.metaKey = '&#8963;'
      }
    },
    shortcutOpen(e) {
      if (e.key === this.searchKey && (e.ctrlKey || e.metaKey)) {
        e.preventDefault() // present "Save Page" from getting triggered.

        // this.$refs.search.focus()
        this.setModalOpened(true)
      }
    },
    shortcutClose(e) {
      if (e.keyCode === 27) {
        e.preventDefault() // present "Save Page" from getting triggered.
        this.setModalOpened(false)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.search-bar::v-deep {
  & abbr {
    @apply no-underline;
  }
  & .search {
    @apply block w-full bg-white dark:bg-gray-700 py-2 pl-10 pr-3 border border-gray-200 dark:border-gray-600 rounded-md leading-5 text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white dark:focus:ring-offset-primary-400 dark:focus:ring-gray-900 focus:border-white dark:focus:border-gray-900 sm:text-sm dark:text-gray-100;
  }
}
</style>
