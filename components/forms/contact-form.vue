<template>
  <div class="mt-6">
    <form
      class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
      @submit.prevent="sumbit"
    >
      <div class="sm:col-span-2">
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name<span class="text-red-600">*</span>
        </label>
        <div class="mt-1">
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="name"
            class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-300 dark:border-gray-300"
            required
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email<span class="text-red-600">*</span>
        </label>
        <div class="mt-1">
          <input
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            autocomplete="email"
            class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm dark:bg-gray-300 dark:border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <label
          for="message"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Message<span class="text-red-600">*</span>
        </label>
        <div class="mt-1">
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            rows="4"
            class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-300 dark:border-gray-300"
            required
          ></textarea>
        </div>
      </div>
      <div class="sm:col-span-2">
        <div class="flex items-center space-x-2">
          <button
            class="flex justify-center w-full px-4 py-2 text-sm font-semibold text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            type="submit"
          >
            <transition name="fade">
              <div v-if="!loading" class="flex items-center space-x-2">
                <icon-airplane class="w-5 h-5" />
                <div>Let's talk</div>
              </div>
              <div v-else class="flex items-center space-x-1">
                <icon-load class="w-5 h-5 text-white" />
                <div>Processing</div>
              </div>
            </transition>
          </button>
          <button
            v-if="isDev"
            type="button"
            class="flex items-center px-3 py-2 font-semibold text-white transition-colors duration-100 rounded-md bg-primary-600 hover:bg-primary-700"
            @click="fillForm"
          >
            <icon-test class="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import iconAirplane from '../icons/icon-airplane.vue'
import IconLoad from '../icons/icon-load.vue'
import IconTest from '../icons/icon-test.vue'
export default {
  name: 'ContactForm',
  components: { iconAirplane, IconTest, IconLoad },
  data() {
    return {
      loading: false,
      success: false,
      errors: false,
      isDev: process.env.NODE_ENV !== 'production',
      form: {
        name: '',
        email: '',
        message: '',
      },
      formTesting: {
        name: 'Ewilan',
        email: 'ewilan@dotslashplay.it',
        message:
          'Dolor pariatur exercitation duis dolore eu ut commodo quis incididunt ad voluptate sit. Do est nulla adipisicing ut dolore amet dolore nostrud labore. Magna laborum aliqua duis eiusmod quis aliquip officia veniam adipisicing est magna nostrud culpa. Laborum nisi nisi sit Lorem fugiat aute deserunt ea reprehenderit sint sint nulla ad labore.',
      },
    }
  },
  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e)
    }
    if (this.$auth.$state.loggedIn) {
      this.form.name = this.$auth.$state.user.data.name
      this.form.email = this.$auth.$state.user.data.email
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  },
  methods: {
    fillForm() {
      for (const [key] of Object.entries(this.form)) {
        this.form[key] = this.formTesting[key]
      }
    },
    async sumbit() {
      this.loading = true

      try {
        const token = await this.$recaptcha.execute('login')
        this.form['g-recaptcha-response'] = token

        await this.$axios.post('/submission', this.form)

        this.success = true
        this.errors = false
        this.form = {
          name: '',
          email: '',
          message: '',
        }

        const title = 'Message sended!'
        const message = 'Thanks you for your message.'
        this.$store.commit('setAlertMessage', {
          type: 'success',
          title,
          message,
        })
        this.$store.commit('overlay/setIsVisible', true)
        this.$store.commit('modal/setIsVisible', true)
        setTimeout(() => {
          this.$store.commit('overlay/setIsVisible', false)
          this.$store.commit('modal/setIsVisible', false)
        }, 2500)
      } catch (e) {
        // console.error(e)
        this.errors = true
        const title = 'Error!'
        const message =
          "We are sorry but your message can't be send, try in some time."
        this.$store.commit('setAlertMessage', {
          type: 'danger',
          title,
          message,
        })
        this.$store.commit('overlay/setIsVisible', true)
        this.$store.commit('modal/setIsVisible', true)
        setTimeout(() => {
          this.$store.commit('overlay/setIsVisible', false)
          this.$store.commit('modal/setIsVisible', false)
        }, 2500)
      }
      this.loading = false
    },
  },
}
</script>

<style lang="postcss" scoped></style>
