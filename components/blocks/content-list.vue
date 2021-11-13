<template>
  <div class="flex relative">
    <div class="w-full lg:w-[35rem]">
      <nav class="h-full max-w-xl" :aria-label="name">
        <div
          v-for="(itemsGroup, char) in itemsGroupByChar"
          :id="`${name}-${char}`"
          :key="char"
          class="relative"
        >
          <div
            class="
              z-10
              sticky
              top-0
              border-t border-b border-gray-200
              bg-gray-50
              px-6
              py-1
              text-sm
              font-medium
              text-gray-500
            "
          >
            <h3>
              {{ char }}
            </h3>
          </div>
          <ul role="list" class="relative z-0 divide-y divide-gray-200">
            <li v-for="item in itemsGroup" :key="item.id">
              <div
                class="
                  relative
                  px-6
                  py-5
                  flex
                  items-center
                  space-x-3
                  hover:bg-gray-50
                  focus-within:ring-2
                  focus-within:ring-inset
                  focus-within:ring-indigo-500
                "
              >
                <nuxt-link
                  :to="
                    localePath({
                      name: routeName,
                      params: { slug: item.meta.slug },
                    })
                  "
                  class="focus:outline-none w-full"
                >
                  <!-- Extend touch target to entire panel -->
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">
                    {{ item.name }}
                  </p>
                  <div class="flex items-center">
                    <div
                      class="h-5 rounded-md"
                      :class="color(item.count)"
                      :style="`width: ${percent(item.count)}%`"
                    ></div>
                    <p class="text-sm text-gray-500 ml-1">
                      {{ item.count }}
                    </p>
                  </div>
                </nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div
      v-if="menu"
      class="
        sticky
        top-16
        h-[90vh]
        max-w-xl
        px-16
        space-y-1
        overflow-auto
        scrollbar-thin
      "
    >
      <a
        v-for="(itemsGroup, char) in itemsGroupByChar"
        :key="char"
        class="
          hover:bg-gray-200
          rounded-md
          p-2
          transition-colors
          duration-75
          block
        "
        :href="`#${name}-${char}`"
      >
        {{ char }}
      </a>
    </div>
  </div>
</template>

<script>
import { groupBy } from 'lodash'

export default {
  name: 'ContentList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: null,
    },
    menu: {
      type: Boolean,
      default: false,
    },
    routeName: {
      type: String,
      default: 'index',
    },
  },
  data() {
    return {
      itemsGroupByChar: [],
      bestCount: null,
      colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
    }
  },
  created() {
    const itemsGroupByChar = this.groupBy(this.items, 'first_char')
    this.itemsGroupByChar = itemsGroupByChar

    let minimal = 0
    this.items.forEach((element) => {
      if (minimal < element.count) {
        minimal = element.count
      }
    })
    this.bestCount = minimal
  },
  methods: {
    groupBy,
    percent(value) {
      return (value * 100) / this.bestCount
    },
    color(count) {
      const percent = this.percent(count)
      let style = 'red'
      if (percent <= 15) {
        style = 'purple'
      } else if (percent <= 30) {
        style = 'blue'
      } else if (percent <= 45) {
        style = 'green'
      } else if (percent <= 60) {
        style = 'yellow'
      } else if (percent <= 75) {
        style = 'orange'
      }

      return style
    },
  },
}
</script>

<style scoped>
[id]::before {
  content: '';
  display: block;
  height: 65px;
  margin-top: -65px;
  visibility: hidden;
}
.red {
  @apply bg-red-200 dark:bg-red-700 hover:bg-red-300 dark:hover:bg-red-800;
}
.orange {
  @apply bg-orange-200 dark:bg-orange-700 hover:bg-orange-300 dark:hover:bg-orange-800;
}
.yellow {
  @apply bg-yellow-200 dark:bg-yellow-700 hover:bg-yellow-300 dark:hover:bg-yellow-800;
}
.green {
  @apply bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-800;
}
.blue {
  @apply bg-blue-200 dark:bg-blue-700 hover:bg-blue-300 dark:hover:bg-red-800;
}
.purple {
  @apply bg-purple-200 dark:bg-purple-700 hover:bg-purple-300 dark:hover:bg-purple-800;
}
</style>
