<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="bg-white">
    <div class="pt-12 sm:pt-16 lg:pt-24">
      <div class="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto space-y-2 lg:max-w-none">
          <h2
            class="text-lg font-semibold leading-6 tracking-wider text-indigo-600 uppercase"
          >
            Your choice
          </h2>
          <p class="max-w-3xl mx-auto text-xl text-gray-900">
            On the fly or customized as you wish, Bookshelves can be used the
            way you want, whether it's through a quick switch or with an
            account.
          </p>
        </div>
      </div>
    </div>
    <div class="pb-12 mt-8 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
      <div class="relative">
        <div class="absolute inset-0 bg-white h-3/4"></div>
        <div class="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div
            class="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0"
          >
            <div
              v-for="pricing in pricings"
              :key="pricing.id"
              class="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                <div>
                  <h3
                    id="tier-standard"
                    class="inline-flex px-4 py-1 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-100 rounded-full"
                  >
                    {{ pricing.title }}
                  </h3>
                </div>
                <p class="mt-5 text-lg text-gray-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </p>
              </div>
              <div
                class="flex flex-col justify-between flex-1 px-6 pt-6 pb-8 space-y-6 bg-gray-50 sm:p-10 sm:pt-6"
              >
                <ul class="space-y-4">
                  <li
                    v-for="feature in pricing.features"
                    :key="feature.id"
                    class="flex items-start"
                  >
                    <div class="flex-shrink-0">
                      <!-- Heroicon name: outline/check -->
                      <svg
                        class="w-6 h-6 text-green-500"
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
                    <p class="ml-3 text-base text-gray-700">
                      {{ feature }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pricing',
  data() {
    return {
      pricings: [
        {
          title: 'Guest',
          features: ['Feature 1', 'Feature 2'],
        },
        {
          title: 'Account',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
        },
      ],
    }
  },
}
</script>
