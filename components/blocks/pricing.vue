<template>
  <div>
    <div class="container max-w-4xl bg-white">
      <div class="pt-8 sm:pt-12 lg:pt-16">
        <div class="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2
              class="text-lg font-semibold leading-6 tracking-wider text-indigo-600 uppercase"
            >
              Use it as you wish
            </h2>
            <p class="max-w-3xl mx-auto text-xl text-gray-900">
              On the fly or customized as you wish, Bookshelves can be used the
              way you want, whether it's through a quick switch or with an
              account.
            </p>
          </div>
        </div>
      </div>
      <div
        class="mt-12 space-y-4 lg:mt-16 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10 lg:mx-auto xl:max-w-none xl:mx-0"
      >
        <div
          v-for="pricing in pricings"
          :key="pricing.id"
          class="border border-gray-200 divide-y divide-gray-200 rounded-lg shadow-sm"
        >
          <div class="p-6">
            <h2 class="text-lg font-medium leading-6 text-gray-900">
              {{ pricing.title }}
            </h2>
            <p class="mt-4 text-sm text-gray-500">
              All the basics for starting a new business
            </p>
          </div>
          <div class="px-6 pt-6 pb-8">
            <h3
              class="text-xs font-medium tracking-wide text-gray-900 uppercase"
            >
              What's included
            </h3>
            <ul class="mt-6 space-y-4">
              <li
                v-for="feature in pricing.features"
                :key="feature.id"
                class="flex space-x-3"
              >
                <!-- Heroicon name: solid/check -->
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500"
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
                <span class="text-sm text-gray-500">
                  {{ feature }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="hidden pb-12 mt-8 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24"
      >
        <div class="relative">
          <div class="absolute inset-0 bg-white h-3/4"></div>
          <div class="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div
              class="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0"
            >
              <div
                v-for="pricing in pricings"
                :key="pricing.id"
                class="flex flex-col overflow-hidden rounded-lg shadow"
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
    <div class="pt-12">
      <div
        class="max-w-3xl px-4 py-12 mx-auto md:max-w-7xl sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between"
      >
        <h2
          class="text-3xl font-extrabold tracking-tight text-gray-900 font-handlee md:text-4xl"
        >
          <span class="block">Ready to dive in?</span>
          <span class="block text-indigo-600">
            Discover your next universe.
          </span>
        </h2>
        <div class="flex mt-8 lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <nuxt-link
              :to="{ name: 'books' }"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Get started
            </nuxt-link>
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
