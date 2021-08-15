<template>
  <!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
  <div class="max-w-xl">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="
          block
          w-full
          focus:ring-indigo-500 focus:border-indigo-500
          border-gray-300
          rounded-md
        "
      >
        <!-- <option selected>My Account</option> -->
        <option v-for="link in navigation" :key="link.id">
          {{ link.title }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav
        class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
        aria-label="Tabs"
      >
        <nuxt-link
          v-for="link in navigation"
          :key="link.id"
          :to="{ name: link.route }"
          class="
            text-gray-900
            rounded-l-lg
            group
            relative
            min-w-0
            flex-1
            overflow-hidden
            bg-white
            py-4
            px-4
            text-sm
            font-semibold
            text-center
            hover:bg-gray-50
            focus:z-10
          "
          exact
          active-class="tab-active"
          aria-current="page"
        >
          <span>{{ link.title }}</span>
          <span
            aria-hidden="true"
            class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
          ></span>
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminNav',
  data() {
    return {
      navigation: [
        {
          title: 'Home',
          route: 'admin',
        },
        {
          title: 'Database',
          route: 'admin-database',
        },
        // {
        //   title: 'Team Members',
        //   route: 'admin',
        // },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped>
.tab-active {
  @apply text-gray-900;
  & span:nth-child(2) {
    @apply bg-indigo-500;
  }
}
</style>
