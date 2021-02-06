<template>
  <section class="bg-white">
    <div class="px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
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

    <div class="pb-6 mt-16 bg-white lg:mt-20 lg:pb-10">
      <div class="relative z-0">
        <div class="absolute inset-0 bg-white h-5/6 lg:h-2/3"></div>
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <pricing-sections :pricings="pricings" />
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
            'Leave ratings and comments',
            'Propose your eBooks',
          ],
          cta: 'Sign up!',
          ctaAction: () => {
            // this.$router.push('register')
            this.$store.commit('setAlertMessage', {
              type: 'warning',
              title: 'Sorry!',
              message: 'Sign up is not available yet!',
            })
            this.$store.commit('toggleShowAlert')
            setTimeout(() => {
              this.$store.commit('setShowAlert', false)
            }, 3000)
          },
        },
      },
    }
  },
}
</script>
