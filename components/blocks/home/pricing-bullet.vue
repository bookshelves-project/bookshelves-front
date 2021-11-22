<template>
  <li class="flex items-start">
    <div class="flex-shrink-0">
      <!-- Heroicon name: outline/check -->
      <svg
        class="flex-shrink-0 w-6 h-6 text-green-500"
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
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <div class="ml-3 text-base font-medium text-gray-500 dark:text-gray-300">
      {{ value }}
    </div>
  </li>
</template>

<script>
export default {
  name: 'PricingBullet',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
}
</script>
