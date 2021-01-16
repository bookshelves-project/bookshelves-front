<template>
  <div class="fixed hidden lg:flex lg:flex-shrink-0">
    <div
      class="flex flex-col w-64 pt-5 pb-4 bg-gray-100 border-r border-gray-200"
    >
      <div class="flex items-center flex-shrink-0 px-6">
        <!-- <img
          class="w-auto h-8"
          src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
          alt="Workflow"
        /> -->
        <logo />
      </div>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-1 h-0 overflow-y-auto">
        <!-- User account dropdown -->
        <!-- <user-account-dropdown /> -->
        <!-- Sidebar Search -->
        <div class="px-3 mt-5">
          <label for="search" class="sr-only">Search</label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              aria-hidden="true"
            >
              <!-- Heroicon name: search -->
              <svg
                class="w-4 h-4 mr-3 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              name="search"
              class="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-9 sm:text-sm"
              placeholder="Search"
            />
          </div>
        </div>
        <!-- Navigation -->
        <nav class="px-3 mt-6">
          <div class="space-y-1">
            <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:text-gray-900 hover:bg-gray-50" -->
            <nuxt-link
              v-for="(nav, navId) in $store.state.navigation"
              :key="navId"
              :to="{ name: nav.route }"
              class="flex items-center px-2 py-2 text-sm font-medium text-gray-900 transition-colors duration-300 rounded-md group hover:bg-gray-200"
            >
              <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
              <icon :name="nav.icon" stroke class="text-gray-400" :size="24" />
              <span class="ml-2 font-semibold">
                {{ nav.label }}
              </span>
            </nuxt-link>

            <!-- <a
              href="#"
              class="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <svg
                class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              My tasks
            </a>

            <a
              href="#"
              class="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <svg
                class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Recent
            </a> -->
          </div>
          <div class="hidden mt-8">
            <!-- Secondary navigation -->
            <h3
              id="teams-headline"
              class="px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase"
            >
              Teams
            </h3>
            <div
              class="mt-1 space-y-1"
              role="group"
              aria-labelledby="teams-headline"
            >
              <a
                href="#"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:text-gray-900 hover:bg-gray-50"
              >
                <span
                  class="w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full"
                  aria-hidden="true"
                ></span>
                <span class="truncate"> Engineering </span>
              </a>

              <a
                href="#"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:text-gray-900 hover:bg-gray-50"
              >
                <span
                  class="w-2.5 h-2.5 mr-4 bg-green-500 rounded-full"
                  aria-hidden="true"
                ></span>
                <span class="truncate"> Human Resources </span>
              </a>

              <a
                href="#"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:text-gray-900 hover:bg-gray-50"
              >
                <span
                  class="w-2.5 h-2.5 mr-4 bg-yellow-500 rounded-full"
                  aria-hidden="true"
                ></span>
                <span class="truncate"> Customer Success </span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import userAccountDropdown from '../blocks/user-account-dropdown.vue'
export default {
  name: 'StaticSidebar',
  // eslint-disable-next-line vue/no-unused-components
  components: { userAccountDropdown },
}
</script>
