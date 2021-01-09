<template>
  <div class="lg:hidden">
    <div v-if="$store.state.layerVisible" class="fixed inset-0 z-40 flex">
      <div
        v-click-outside="closeSidebar"
        :class="
          $store.state.sidebarOpened ? 'translate-x-0' : '-translate-x-full'
        "
        class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 transition duration-300 ease-in-out transform bg-white"
      >
        <div
          :class="$store.state.sidebarOpened ? 'opacity-100' : 'opacity-0'"
          class="absolute top-0 right-0 pt-2 -mr-12 transition-opacity"
        >
          <button
            class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            @click="closeSidebar()"
          >
            <span class="sr-only">Close sidebar</span>
            <!-- Heroicon name: x -->
            <svg
              class="w-6 h-6 text-white"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex items-center flex-shrink-0 px-4">
          <img
            class="w-auto h-8"
            src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
            alt="Workflow"
          />
        </div>
        <div class="flex-1 h-0 mt-5 overflow-y-auto">
          <nav class="px-2">
            <div class="space-y-1">
              <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:text-gray-900 hover:bg-gray-50" -->
              <a
                href="#"
                class="flex items-center px-2 py-2 text-base font-medium leading-5 text-gray-900 bg-gray-100 rounded-md group"
                aria-current="page"
              >
                <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                <!-- Heroicon name: home -->
                <svg
                  class="w-6 h-6 mr-3 text-gray-500"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </a>

              <a
                href="#"
                class="flex items-center px-2 py-2 text-base font-medium leading-5 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              >
                <!-- Heroicon name: view-list -->
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
                class="flex items-center px-2 py-2 text-base font-medium leading-5 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              >
                <!-- Heroicon name: clock -->
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
              </a>
            </div>
            <div class="mt-8">
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
                  class="flex items-center px-3 py-2 text-base font-medium leading-5 text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50"
                >
                  <span
                    class="w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full"
                    aria-hidden="true"
                  ></span>
                  <span class="truncate"> Engineering </span>
                </a>

                <a
                  href="#"
                  class="flex items-center px-3 py-2 text-base font-medium leading-5 text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50"
                >
                  <span
                    class="w-2.5 h-2.5 mr-4 bg-green-500 rounded-full"
                    aria-hidden="true"
                  ></span>
                  <span class="truncate"> Human Resources </span>
                </a>

                <a
                  href="#"
                  class="flex items-center px-3 py-2 text-base font-medium leading-5 text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50"
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
      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'Sidebar',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    closeSidebar() {
      this.$store.commit('setSidebar', false)
      setTimeout(() => {
        this.$store.commit('setLayer', false)
      }, 150)
    },
  },
}
</script>

<style lang="postcss" scoped></style>
