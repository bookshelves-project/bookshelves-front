<script setup lang="ts">
const config = useRuntimeConfig()

const leave: CmsPricing = {
  title: 'Let me go!',
  description: `You disagree with what ${config.appName} offers and think it's shameful.`,
  features: ['Leave this website now'],
}
const free: CmsPricing = {
  title: 'Free to read',
  description: 'You like what we offer and you want to find lots of eBooks.',
  features: [
    'Browse the list of eBooks, series and authors',
    'Search to find the eBook you absolutely want',
    "Download an eBook, a complete series or even all of an author's books",
    'Read the guides with coffee/tea/chocolate (not included) to learn more',
    'Download eBooks on your eReader from internal browser',
  ],
  cta: 'Discover all eBooks',
  route: 'books',
}
const account: CmsPricing = {
  title: 'Community',
  description: `You like ${config.appName} so much that you want extra features with an account?`,
  features: [
    'Get a list of your favorite eBooks',
    'Leave ratings and comments',
    'Propose your eBooks',
  ],
  cta: 'Sign up',
  // route: 'sign-up',
}
const pricings: CmsPricingList = {
  leave,
  free,
  account,
}
</script>

<template>
  <section class="">
    <div class="px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <div class="text-center">
        <h2
          class="text-lg font-semibold uppercase leading-6 tracking-wider text-gray-900"
        >
          <span v-if="config.moduleSocial">Packages</span>
          <span v-else>How to use</span>
        </h2>
        <p
          class="mt- mt-2 font-handlee text-3xl font-extrabold text-primary-600 dark:text-primary-500 sm:text-4xl lg:text-5xl"
        >
          Your pleasure of reading, your choice of use
        </p>
        <p
          class="mx-auto mt-3 max-w-4xl text-xl text-gray-900 dark:text-gray-100 sm:mt-5 sm:text-2xl"
        >
          {{ config.appName }} offers different navigation possibilities, it's
          up to you to see what suits you best
        </p>
      </div>
    </div>

    <div class="mt-16 pb-6 lg:mt-20 lg:pb-10">
      <div class="relative z-0">
        <div class="absolute inset-0 h-5/6 lg:h-2/3"></div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <home-pricing-sections
            v-if="config.moduleSocial"
            :pricings="pricings"
          />
          <div v-else class="mx-auto mt-10 max-w-lg">
            <div class="relative z-10 rounded-lg shadow-lg">
              <div
                class="pointer-events-none absolute inset-0 rounded-lg border-2 border-primary-600"
                aria-hidden="true"
              ></div>
              <div
                class="rounded-t-lg bg-gray-50 px-6 pt-12 pb-10 dark:bg-gray-800"
              >
                <div>
                  <h3
                    id="tier-free"
                    class="text-center font-handlee text-3xl font-semibold italic text-gray-900 sm:-mx-6"
                  >
                    &#8220; {{ free.title }} &#8221;
                  </h3>
                  <div
                    class="mt-4 flex items-center justify-center dark:text-white"
                  >
                    {{ free.description }}
                  </div>
                </div>
              </div>
              <div
                class="rounded-b-lg border-t-2 border-gray-200 bg-gray-100 px-6 pt-10 pb-8 dark:border-gray-600 dark:bg-gray-700 sm:px-10 sm:py-10"
              >
                <ul class="space-y-4">
                  <home-pricing-bullet
                    v-for="(feature, index) in free.features"
                    :key="index"
                    :value="feature"
                  />
                </ul>
                <div class="mt-10">
                  <div class="rounded-lg shadow-md">
                    <app-button
                      type="button"
                      class="block w-full rounded-lg border border-transparent bg-primary-600 px-6 py-4 text-center text-xl font-medium leading-6 text-white transition-colors duration-100 hover:bg-primary-700"
                      aria-describedby="tier-free"
                      :to="free.route"
                    >
                      {{ free.cta }}
                    </app-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
