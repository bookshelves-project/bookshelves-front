<script setup lang="ts">
defineProps<{
  pricingList?: CmsPricingList
}>()
</script>

<template>
  <div v-if="pricingList" class="relative lg:grid lg:grid-cols-7">
    <div
      class="mx-auto max-w-md lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:mx-0 lg:max-w-none"
    >
      <div
        class="flex h-full flex-col overflow-hidden rounded-lg shadow lg:rounded-none lg:rounded-l-lg"
      >
        <div class="flex flex-1 flex-col">
          <div class="bg-gray-50 px-6 py-10 dark:bg-gray-800">
            <div>
              <h3
                id="tier-leave"
                class="text-center font-handlee text-2xl font-medium italic text-gray-900"
              >
                &#8220; {{ pricingList.leave.title }} &#8221;
              </h3>
              <div
                class="mt-4 flex items-center justify-center dark:text-white"
              >
                {{ pricingList.leave.description }}
              </div>
            </div>
          </div>
          <div
            class="flex flex-1 flex-col justify-between border-t-2 border-gray-200 bg-gray-100 p-6 dark:border-gray-600 dark:bg-gray-700 sm:p-10 lg:p-6 xl:p-10"
          >
            <ul class="space-y-4">
              <home-pricing-bullet
                v-for="(feature, index) in pricingList.leave.features"
                :key="index"
                :value="feature"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mx-auto mt-10 max-w-lg lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4 lg:mx-0 lg:mt-0 lg:max-w-none"
    >
      <div class="relative z-10 rounded-lg shadow-lg">
        <div
          class="pointer-events-none absolute inset-0 rounded-lg border-2 border-primary-600"
          aria-hidden="true"
        />
        <div class="absolute inset-x-0 top-0 translate-y-px transform">
          <div class="flex -translate-y-1/2 transform justify-center">
            <span
              class="inline-flex rounded-full bg-primary-600 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-white"
            >
              Most popular
            </span>
          </div>
        </div>
        <div class="rounded-t-lg bg-gray-50 px-6 pt-12 pb-10 dark:bg-gray-800">
          <div>
            <h3
              id="tier-free"
              class="text-center font-handlee text-3xl font-semibold italic text-gray-900 sm:-mx-6"
            >
              &#8220; {{ pricingList.free.title }} &#8221;
            </h3>
            <div class="mt-4 flex items-center justify-center dark:text-white">
              {{ pricingList.free.description }}
            </div>
          </div>
        </div>
        <div
          class="rounded-b-lg border-t-2 border-gray-200 bg-gray-100 px-6 pt-10 pb-8 dark:border-gray-600 dark:bg-gray-700 sm:px-10 sm:py-10"
        >
          <ul class="space-y-4">
            <home-pricing-bullet
              v-for="(feature, index) in pricingList.free.features"
              :key="index"
              :value="feature"
            />
          </ul>
          <div class="mt-10">
            <div class="rounded-lg shadow-md">
              <app-button
                type="button"
                class="block w-full rounded-lg border border-transparent bg-primary-600 px-6 py-4 text-center text-xl font-medium leading-6 text-white transition-colors duration-100 hover:bg-primary-600"
                aria-describedby="tier-free"
                :to="pricingList.free.route"
              >
                {{ pricingList.free.cta }}
              </app-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mx-auto mt-10 max-w-md lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3 lg:m-0 lg:max-w-none"
    >
      <div
        class="flex h-full flex-col overflow-hidden rounded-lg shadow lg:rounded-none lg:rounded-r-lg"
      >
        <div class="flex flex-1 flex-col bg-gray-50 dark:bg-gray-800">
          <div class="px-6 py-10">
            <div>
              <h3
                id="tier-account"
                class="text-center font-handlee text-2xl font-medium italic text-gray-900"
              >
                &#8220; {{ pricingList.account.title }} &#8221;
              </h3>
              <div
                class="mt-4 flex items-center justify-center dark:text-white"
              >
                {{ pricingList.account.description }}
              </div>
            </div>
          </div>
          <div
            class="flex flex-1 flex-col justify-between border-t-2 border-gray-200 bg-gray-100 p-6 dark:border-gray-600 dark:bg-gray-700 sm:p-10 lg:p-6 xl:p-10"
          >
            <ul class="space-y-4">
              <home-pricing-bullet
                v-for="(feature, index) in pricingList.account.features"
                :key="index"
                :value="feature"
              />
            </ul>
            <div class="mt-8">
              <div class="rounded-lg shadow-md">
                <app-button
                  class="block w-full rounded-lg border border-transparent bg-primary-600 px-6 py-3 text-center text-base font-medium text-white transition-colors duration-100 hover:bg-primary-600"
                  type="button"
                  aria-describedby="tier-account"
                  :to="pricingList.account.route"
                >
                  {{ pricingList.account.cta }}
                </app-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
