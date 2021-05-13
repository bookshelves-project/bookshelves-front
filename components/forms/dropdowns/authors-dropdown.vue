<template>
  <div>
    <label id="listbox-label" class="block text-sm font-medium text-gray-700">
      Assigned to
    </label>
    <div class="relative mt-1">
      <dropdown align="right" :width="48" :large="true">
        <template #trigger>
          <button
            type="button"
            class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
          >
            <span class="block truncate"> Tom Cook </span>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <svg-icon name="selector" class="w-5 h-5 text-gray-400" />
            </span>
          </button>
        </template>
        <template #content>
          <ul
            class="absolute z-10 w-full py-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
              class="relative py-2 pl-8 pr-4 text-gray-900 cursor-default select-none"
              role="option"
            >
              <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
              <span class="block font-normal truncate"> Wade Cooper </span>

              <!--
          Checkmark, only display for selected option.

          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
        -->
              <span
                class="text-indigo-600 absolute inset-y-0 left-0 flex items-center pl-1.5"
              >
                <!-- Heroicon name: solid/check -->
                <svg
                  class="w-5 h-5"
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
        </template>
      </dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/special/dropdown-template.vue'
export default {
  name: 'AuthorsDropdown',
  components: {
    Dropdown,
  },
}
</script>
