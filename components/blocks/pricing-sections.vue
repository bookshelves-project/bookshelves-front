<template>
  <div class="relative lg:grid lg:grid-cols-7">
    <div
      class="max-w-md mx-auto lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3"
    >
      <div
        class="flex flex-col h-full overflow-hidden rounded-lg shadow lg:rounded-none lg:rounded-l-lg"
      >
        <div class="flex flex-col flex-1">
          <div class="px-6 py-10 bg-white">
            <div>
              <h3
                id="tier-hobby"
                class="text-2xl font-medium text-center text-gray-900"
              >
                {{ pricings.leave.title }}
              </h3>
              <div class="flex items-center justify-center mt-4">
                {{ pricings.leave.description }}
              </div>
            </div>
          </div>
          <div
            class="flex flex-col justify-between flex-1 p-6 border-t-2 border-gray-100 bg-gray-50 sm:p-10 lg:p-6 xl:p-10"
          >
            <ul class="space-y-4">
              <pricing-bullet
                v-for="feature in pricings.leave.features"
                :key="feature.id"
                :value="feature"
              />
            </ul>
            <div class="mt-8">
              <div class="rounded-lg shadow-md">
                <button
                  class="block w-full px-6 py-3 text-base font-medium text-center text-indigo-600 bg-white border border-transparent rounded-lg hover:bg-gray-50"
                  aria-describedby="tier-leave"
                  @click="pricings.leave.ctaAction"
                >
                  {{ pricings.leave.cta }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="max-w-lg mx-auto mt-10 lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4"
    >
      <div class="relative z-10 rounded-lg shadow-lg">
        <div
          class="absolute inset-0 border-2 border-indigo-600 rounded-lg pointer-events-none"
          aria-hidden="true"
        ></div>
        <div class="absolute inset-x-0 top-0 transform translate-y-px">
          <div class="flex justify-center transform -translate-y-1/2">
            <span
              class="inline-flex px-4 py-1 text-sm font-semibold tracking-wider text-white uppercase bg-indigo-600 rounded-full"
            >
              Most popular
            </span>
          </div>
        </div>
        <div class="px-6 pt-12 pb-10 bg-white rounded-t-lg">
          <div>
            <h3
              id="tier-growth"
              class="text-3xl font-semibold text-center text-gray-900 sm:-mx-6"
            >
              {{ pricings.free.title }}
            </h3>
            <div class="flex items-center justify-center mt-4">
              {{ pricings.free.description }}
            </div>
          </div>
        </div>
        <div
          class="px-6 pt-10 pb-8 border-t-2 border-gray-100 rounded-b-lg bg-gray-50 sm:px-10 sm:py-10"
        >
          <ul class="space-y-4">
            <pricing-bullet
              v-for="feature in pricings.free.features"
              :key="feature.id"
              :value="feature"
            />
          </ul>
          <div class="mt-10">
            <div class="rounded-lg shadow-md">
              <button
                class="block w-full px-6 py-4 text-xl font-medium leading-6 text-center text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700"
                aria-describedby="tier-free"
                @click="pricings.free.ctaAction"
              >
                {{ pricings.free.cta }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="max-w-md mx-auto mt-10 lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3"
    >
      <div
        class="flex flex-col h-full overflow-hidden rounded-lg shadow lg:rounded-none lg:rounded-r-lg"
      >
        <div class="flex flex-col flex-1">
          <div class="px-6 py-10 bg-white">
            <div>
              <h3
                id="tier-scale"
                class="text-2xl font-medium text-center text-gray-900"
              >
                {{ pricings.account.title }}
              </h3>
              <div class="flex items-center justify-center mt-4">
                {{ pricings.account.description }}
              </div>
            </div>
          </div>
          <div
            class="flex flex-col justify-between flex-1 p-6 border-t-2 border-gray-100 bg-gray-50 sm:p-10 lg:p-6 xl:p-10"
          >
            <ul class="space-y-4">
              <pricing-bullet
                v-for="feature in pricings.account.features"
                :key="feature.id"
                :value="feature"
              />
            </ul>
            <div class="mt-8">
              <div class="rounded-lg shadow-md">
                <button
                  class="block w-full px-6 py-3 text-base font-medium text-center text-indigo-600 bg-white border border-transparent rounded-lg hover:bg-gray-50"
                  aria-describedby="tier-account"
                  @click="pricings.account.ctaAction"
                >
                  {{ pricings.account.cta }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pricingBullet from './pricing-bullet.vue'
export default {
  name: 'PricingSections',
  components: { pricingBullet },
  props: {
    pricings: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" scoped></style>
