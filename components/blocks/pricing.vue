<template>
  <section>
    <div class="bg-white">
      <div class="px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div class="text-center">
          <h2
            class="text-lg font-semibold leading-6 tracking-wider text-gray-900 uppercase"
          >
            Packages
          </h2>
          <p
            class="text-3xl font-extrabold text-primary-600 font-handlee mt- sm:text-4xl lg:text-5xl"
          >
            Your pleasure of reading, your choice of use
          </p>
          <p
            class="max-w-4xl mx-auto mt-3 text-xl text-gray-900 sm:mt-5 sm:text-2xl"
          >
            Bookshelves offers three different navigation possibilities, it's up
            to you to see what suits you best, nothing is definitive
          </p>
        </div>
      </div>

      <div class="pb-12 mt-16 bg-white lg:mt-20 lg:pb-20">
        <div class="relative z-0">
          <div class="absolute inset-0 bg-white h-5/6 lg:h-2/3"></div>
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <pricing-sections :pricings="pricings" />
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
              Discover eBooks
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import pricingSections from './pricing-sections.vue'
export default {
  name: 'Pricing',
  components: { pricingSections },
  data() {
    return {
      pricings: {
        leave: {
          title: 'Leave',
          description:
            "You disagree with what Bookshelves offers and think it's shameful.",
          features: ['Leave this website now'],
          cta: 'Leave now!',
          ctaAction: () => {
            window.close()
          },
        },
        free: {
          title: 'Freedom',
          description:
            'You like what we offer and you want to find lots of eBooks.',
          features: [
            'Browse the list of eBooks, series and authors',
            'Search to find the eBook you absolutely want',
            "Download an eBook, a complete series or even all of an author's books",
            'Read the guides with coffee/tea/chocolate (not included) to learn more',
          ],
          cta: 'Discover all eBooks!',
          ctaAction: () => {
            this.$router.push('books')
          },
        },
        account: {
          title: 'Free account',
          description:
            'You like Bookshelves so much that you want extra features with an account?',
          features: [
            'All the features of the "Freedom" package',
            'Get a list of your favorite eBooks',
            'Propose your eBooks',
          ],
          cta: 'Sign up!',
          ctaAction: () => {
            this.$router.push('register')
          },
        },
      },
    }
  },
}
</script>
