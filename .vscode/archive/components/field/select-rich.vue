<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

defineProps<{
  label?: string
}>()

const isOpen = ref(false)
const target = ref<HTMLElement>()

const toggle = () => {
  isOpen.value = !isOpen.value
}

onClickOutside(target, () => (isOpen.value = false))
</script>

<template>
  <div>
    <label id="listbox-label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div ref="target" class="relative mt-1">
      <button
        type="button"
        class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        aria-labelledby="listbox-label"
        @click="toggle"
      >
        <span class="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            class="h-6 w-6 flex-shrink-0 rounded-full"
          >
          <span class="ml-3 block truncate"> Tom Cook </span>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <Transition name="base">
        <ul
          v-if="isOpen"
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          <!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
      -->
          <li
            id="listbox-option-0"
            class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
            role="option"
          >
            <div class="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                class="h-6 w-6 flex-shrink-0 rounded-full"
              >
              <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
              <span class="ml-3 block truncate font-normal"> Wade Cooper </span>
            </div>

            <!--
          Checkmark, only display for selected option.

          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
        -->
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
            >
              <!-- Heroicon name: solid/check -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>

          <!-- More items... -->
        </ul>
      </Transition>
    </div>
  </div>
</template>
