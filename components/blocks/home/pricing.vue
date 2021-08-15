<template>
  <section class="">
    <div class="px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <div class="text-center">
        <h2
          class="
            text-lg
            font-semibold
            leading-6
            tracking-wider
            text-gray-900
            uppercase
          "
        >
          <span v-if="$config.moduleSocial">Packages</span>
          <span v-else>How to use</span>
        </h2>
        <p
          class="
            mt-2
            text-3xl
            font-extrabold
            text-primary-600
            font-handlee
            mt-
            sm:text-4xl
            lg:text-5xl
          "
        >
          Your pleasure of reading, your choice of use
        </p>
        <p
          class="
            max-w-4xl
            mx-auto
            mt-3
            text-xl text-gray-900
            dark:text-gray-100
            sm:mt-5 sm:text-2xl
          "
        >
          {{ $config.appName }} offers different navigation possibilities, it's
          up to you to see what suits you best
        </p>
      </div>
    </div>

    <div class="pb-6 mt-16 lg:mt-20 lg:pb-10">
      <div class="relative z-0">
        <div class="absolute inset-0 h-5/6 lg:h-2/3"></div>
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <pricing-sections v-if="$config.moduleSocial" :pricings="pricings" />
          <div v-else class="max-w-lg mx-auto mt-10">
            <div class="relative z-10 rounded-lg shadow-lg">
              <div
                class="
                  absolute
                  inset-0
                  border-2
                  rounded-lg
                  pointer-events-none
                  border-primary-600
                "
                aria-hidden="true"
              ></div>
              <div
                class="
                  px-6
                  pt-12
                  pb-10
                  rounded-t-lg
                  bg-gray-50
                  dark:bg-gray-800
                "
              >
                <div>
                  <h3
                    id="tier-free"
                    class="
                      text-3xl
                      italic
                      font-semibold
                      text-center text-gray-900
                      font-handlee
                      sm:-mx-6
                    "
                  >
                    &#8220; {{ pricings.free.title }} &#8221;
                  </h3>
                  <div
                    class="
                      flex
                      items-center
                      justify-center
                      mt-4
                      dark:text-white
                    "
                  >
                    {{ pricings.free.description }}
                  </div>
                </div>
              </div>
              <div
                class="
                  px-6
                  pt-10
                  pb-8
                  bg-gray-100
                  border-t-2 border-gray-200
                  rounded-b-lg
                  dark:border-gray-600 dark:bg-gray-700
                  sm:px-10 sm:py-10
                "
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
                      type="button"
                      class="
                        block
                        w-full
                        px-6
                        py-4
                        text-xl
                        font-medium
                        leading-6
                        text-center text-white
                        transition-colors
                        duration-100
                        border border-transparent
                        rounded-lg
                        bg-primary-600
                        hover:bg-primary-700
                      "
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PricingBullet from './pricing-bullet.vue'
import pricingSections from './pricing-sections.vue'
export default {
  name: 'Pricing',
  components: { pricingSections, PricingBullet },
  data() {
    return {
      pricings: {
        leave: {
          title: 'Let me go!',
          description: `You disagree with what ${this.$config.appName} offers and think it's shameful.`,
          features: ['Leave this website now'],
        },
        free: {
          title: 'Free to read',
          description:
            'You like what we offer and you want to find lots of eBooks.',
          features: [
            'Browse the list of eBooks, series and authors',
            'Search to find the eBook you absolutely want',
            "Download an eBook, a complete series or even all of an author's books",
            'Read the guides with coffee/tea/chocolate (not included) to learn more',
            'Download eBooks on your eReader from internal browser',
          ],
          cta: 'Discover all eBooks',
          ctaAction: () => {
            this.$router.push('books')
          },
        },
        account: {
          title: 'Community',
          description: `You like ${this.$config.appName} so much that you want extra features with an account?`,
          features: [
            'Get a list of your favorite eBooks',
            'Leave ratings and comments',
            'Propose your eBooks',
          ],
          cta: 'Sign up',
          ctaAction: () => {
            // this.$router.push('sign-up')
          },
        },
      },
    }
  },
}
</script>
