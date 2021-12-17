<template>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div
    v-if="layer"
    class="fixed inset-0 flex z-40 lg:hidden"
    role="dialog"
    aria-modal="true"
  >
    <!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
    <transition name="fade">
      <div
        v-if="overlay"
        class="fixed inset-0 bg-gray-600 bg-opacity-75"
        aria-hidden="true"
      ></div>
    </transition>

    <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    -->
    <div
      ref="target"
      :class="sidebar ? 'translate-x-0' : '-translate-x-full'"
      class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-100 dark:bg-gray-800 transition ease-in-out duration-300 transform"
    >
      <!--
        Close button, show/hide based on off-canvas menu state.

        Entering: "ease-in-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="absolute top-0 right-0 -mr-12 pt-2">
        <button
          type="button"
          class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          @click="closeSidebar"
        >
          <span class="sr-only">Close sidebar</span>
          <svg-icon name="cross" class="h-6 w-6 text-white" />
        </button>
      </div>
      <div class="flex-shrink-0 flex items-center px-4">
        <nuxt-link to="/" class="inline-flex items-center w-auto h-8">
          <span class="inline-flex items-center" @click="closeSidebar">
            <img
              class="w-auto h-8 transition-all duration-100 sm:h-10 group-hover:home-logo-shadow"
              src="/icon.svg"
              :alt="`${$config.appName} logo`"
            />
            <div class="mt-2 ml-3 text-2xl font-handlee">
              {{ $config.appName }}
            </div>
          </span>
        </nuxt-link>
      </div>
      <div class="flex-1 h-0 mt-5 overflow-y-auto">
        <nav class="px-2">
          <div class="space-y-1">
            <nuxt-link
              to="/"
              class="flex items-center text-base font-medium leading-5 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span
                class="w-full px-2 py-4 font-semibold"
                @click="closeSidebar"
              >
                Home
              </span>
            </nuxt-link>
            <nuxt-link
              v-for="(booksNav, booksNavId) in navigation"
              :key="booksNavId"
              :to="localePath({ name: booksNav.route })"
              class="flex items-center text-base font-medium leading-5 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span
                class="w-full px-2 py-4 font-semibold"
                @click="closeSidebar"
                >{{ $t(`nav.${booksNav.label}`) }}</span
              >
            </nuxt-link>
          </div>
          <div class="mt-8">
            <h3
              id="teams-headline"
              class="px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase"
            >
              Authentification
            </h3>
            <div
              class="mt-3 space-y-1"
              role="group"
              aria-labelledby="teams-headline"
            >
              <div v-if="$auth.$state.loggedIn" class="space-y-2">
                <nuxt-link
                  v-for="(link, id) in auth"
                  :key="id"
                  :to="localePath({ name: link.route })"
                  class="flex items-center w-full text-base font-semibold leading-5 text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  <span
                    class="flex items-center px-3 py-4"
                    @click="closeSidebar"
                  >
                    <span
                      class="w-2.5 h-2.5 mr-4 bg-primary-600 rounded-full"
                      aria-hidden="true"
                    ></span>
                    <span>{{ link.label }}</span>
                  </span>
                </nuxt-link>
                <button
                  class="flex items-center w-full px-3 py-4 text-base font-semibold leading-5 text-gray-600 rounded-md dark:text-gray-100 group hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:bg-gray-700"
                  type="button"
                  role="menuitem"
                  @click="logout"
                >
                  <span
                    class="w-2.5 h-2.5 mr-4 bg-primary-600 rounded-full"
                    aria-hidden="true"
                  ></span>
                  <span>Sign out</span>
                </button>
              </div>
              <div v-else class="space-y-2">
                <nuxt-link
                  v-for="(link, id) in guest"
                  :key="id"
                  :to="localePath({ name: link.route })"
                  class="flex items-center w-full text-base font-semibold leading-5 text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  <span
                    class="flex items-center px-3 py-4"
                    @click="closeSidebar"
                  >
                    <span>{{ link.label }}</span>
                  </span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div class="flex-shrink-0 w-14" aria-hidden="true">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useIndexStore } from '~/stores'
import { useNavigationStore } from '~/stores/navigation'

const sidebar = ref(false)
const layer = ref(false)
const overlay = ref(false)
const target = ref(null)

const ctx = useContext()
const sidebarStore = useIndexStore(ctx.$pinia)
const navigationStore = useNavigationStore(ctx.$pinia)

const navigation = computed(() => navigationStore.main)
const auth = computed(() => navigationStore.auth)
const guest = computed(() => navigationStore.guest)

watch(
  () => sidebarStore.sidebar,
  (newVal) => {
    if (newVal) {
      openSidebar()
    } else {
      closeSidebar()
    }
  }
)

onClickOutside(target, (event) => {
  closeSidebar()
})

const openSidebar = () => {
  layer.value = true
  setTimeout(() => {
    overlay.value = true
    sidebar.value = true
  }, 250)
}
const closeSidebar = () => {
  overlay.value = false
  sidebar.value = false
  setTimeout(() => {
    layer.value = false
  }, 250)

  const sidebarStore = useIndexStore()
  sidebarStore.closeSidebar()
}
const logout = () => {
  closeSidebar()
  ctx.$auth.logout()
}
</script>
