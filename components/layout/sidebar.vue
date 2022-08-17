<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useNavigationStore } from '~~/store/navigation'

const sidebar = ref(false)
const layer = ref(false)
const overlay = ref(false)
const target = ref(null)

const config = useRuntimeConfig()
const navigation = useNavigationStore()

watch(
  () => navigation.sidebar,
  (newVal) => {
    if (newVal) {
      openSidebar()
    } else {
      closeSidebar()
    }
  }
)

onClickOutside(target, () => {
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

  navigation.closeSidebar()
}
// const logout = () => {
// closeSidebar()
// ctx.$auth.logout()
// }
</script>

<template>
  <div
    v-if="layer"
    class="fixed inset-0 z-40 flex lg:hidden"
    role="dialog"
    aria-modal="true"
  >
    <Transition>
      <div
        v-if="overlay"
        class="fixed inset-0 bg-gray-600 bg-opacity-75"
        aria-hidden="true"
      />
    </Transition>
    <div
      ref="target"
      :class="sidebar ? 'translate-x-0' : '-translate-x-full'"
      class="relative flex w-full max-w-xs flex-1 transform flex-col bg-gray-100 pt-5 pb-4 transition duration-300 ease-in-out dark:bg-gray-800"
    >
      <div class="absolute top-0 right-0 -mr-12 pt-2">
        <button
          type="button"
          class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          @click="closeSidebar"
        >
          <span class="sr-only">Close sidebar</span>
          <!-- <svg-icon name="cross" class="h-6 w-6 text-white" /> -->
        </button>
      </div>
      <div class="flex flex-shrink-0 items-center px-4">
        <app-link
          :to="{
            name: 'index'
          }"
          class="inline-flex h-8 w-auto items-center"
          active-class="active-logo"
        >
          <span class="inline-flex items-center" @click="closeSidebar">
            <img
              class="w-auto h-8 transition-all duration-100 sm:h-10 group-hover:home-logo-shadow"
              src="/icon.svg"
              :alt="`${config.public.appName} logo`"
            >
            <div class="mt-2 ml-3 text-2xl font-handlee dark:text-gray-100">
              {{ config.public.appName }}
            </div>
          </span>
        </app-link>
      </div>
      <div class="mt-5 h-0 flex-1 overflow-y-auto">
        <nav class="px-2">
          <div class="space-y-1">
            <app-link
              :to="{
                name: 'index'
              }"
              class="link group"
              active-class="active-logo"
            >
              <span
                class="w-full px-2 py-4 font-semibold flex items-center space-x-2"
                @click="closeSidebar"
              >
                <svg-icon name="home" class="w-5 h-5" />
                <span>Home</span>
              </span>
            </app-link>
            <app-link
              v-for="(link, id) in navigation.main"
              :key="id"
              :to="link.route"
              class="link group"
            >
              <span
                class="w-full px-2 py-4 font-semibold"
                @click="closeSidebar"
              >{{ $t(`nav.${link.label}`) }}</span>
            </app-link>
          </div>
          <div class="mt-8">
            <!-- <h3
              id="teams-headline"
              class="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              Authentification
            </h3> -->
            <div
              class="mt-3 space-y-1"
              role="group"
              aria-labelledby="teams-headline"
            >
              <!-- <div v-if="$auth.$state.loggedIn" class="space-y-2">
                <app-link
                  v-for="(link, id) in navigation.auth"
                  :key="id"
                  :to="link.route"
                  class="link group"
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
                </app-link>
                <button
                  class="link group w-full px-3 py-4"
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
                <app-link
                  v-for="(link, id) in navigation.guest"
                  :key="id"
                  :to="link.route"
                  class="link group"
                  role="menuitem"
                >
                  <span
                    class="flex items-center px-3 py-4"
                    @click="closeSidebar"
                  >
                    <span>{{ link.label }}</span>
                  </span>
                </app-link>
              </div> -->
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div class="w-14 flex-shrink-0" aria-hidden="true">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
  </div>
</template>

<style lang="css" scoped>
.link {
  @apply flex items-center rounded-md text-base font-medium leading-5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700;
}
.app-link-active {
  @apply bg-gray-200 text-black dark:bg-gray-600 dark:text-white;
}
</style>
