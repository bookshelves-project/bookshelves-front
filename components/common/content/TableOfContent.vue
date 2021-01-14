<template>
  <div v-if="toc.length" class="relative block">
    <ul>
      <li
        v-for="link of toc"
        :key="link.id"
        class="text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-purple-600"
        :class="{
          'border-t border-dashed dark:border-gray-800 first:border-t-0 font-semibold':
            link.depth === 2,
        }"
      >
        <a
          :href="`#${link.id}`"
          class="block text-sm duration-300 ease-in-out scrollactive-item transition-padding hover:pl-1"
          :class="{
            'py-2': link.depth === 2,
            'ml-2 pb-2': link.depth === 3,
          }"
          >{{ link.text }}</a
        >
      </li>
    </ul>
    <!-- <div
      class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)"
    >
      <nav
        class="py-4 lg:py-8"
        :class="{
          'lg:pl-8 lg:pr-2': settings.layout !== 'single',
          'lg:px-8': settings.layout === 'single',
        }"
      >
        <h3
          class="mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase lg:mb-2 lg:text-xs"
        >
          On this page
        </h3>
        <scrollactive
          highlight-first-item
          active-class="text-green-500"
          :offset="0"
          tag="ul"
        >
          <li
            v-for="link of toc"
            :key="link.id"
            class="text-gray-700 dark:text-gray-300"
            :class="{
              'border-t border-dashed dark:border-gray-800 first:border-t-0':
                link.depth === 2,
            }"
          >
            <a
              :href="`#${link.id}`"
              class="block text-sm duration-300 ease-in-out scrollactive-item transition-padding hover:pl-1"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3,
              }"
              >{{ link.text }}</a
            >
          </li>
        </scrollactive>
      </nav>
    </div> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  props: {
    toc: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      settings: {
        layout: 'single',
      },
    }
  },
  computed: {
    // ...mapGetters(['settings']),
  },
}
</script>
