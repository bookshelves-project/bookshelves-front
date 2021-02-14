<template>
  <section class="px-4 py-6 overflow-hidden sm:px-6 lg:px-8 lg:py-10">
    <div class="relative max-w-xl mx-auto">
      <svg
        class="absolute transform translate-x-1/2 left-full"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200 dark:text-gray-700"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
        />
      </svg>
      <svg
        class="absolute bottom-0 transform -translate-x-1/2 right-full"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200 dark:text-gray-700"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
        />
      </svg>
      <div class="text-center">
        <h1
          class="text-3xl font-extrabold tracking-tight font-handlee text-primary-600 sm:text-4xl"
        >
          Leave us a short note
        </h1>
        <div class="mt-4 text-lg leading-6 text-left text-gray-500">
          <div>
            Do you like what we offer or do you hate our work? Do not hesitate
            to let us know with this nice form!
          </div>
          <div class="mt-2">
            <small>
              Just kidding, if you hate what we do, you can leave, that would be
              cool!
            </small>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <div v-if="isDev" class="mb-5">
          <button
            type="button"
            class="flex items-center px-3 py-2 font-semibold text-white transition-colors duration-100 rounded-md bg-primary-600 hover:bg-primary-700"
            @click="fillForm"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="ml-2"> Fill form </span>
          </button>
        </div>
        <form
          v-if="!isBot"
          method="POST"
          class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          @submit.prevent="sumbit"
        >
          <div class="sm:col-span-2">
            <div class="hidden">
              <label class="sr-only">
                Don’t fill this out if you're human:
              </label>
              <input
                v-model="form.bot"
                name="bot-field"
                placeholder="This field is only for the robots."
                class="block w-full px-4 py-3 placeholder-gray-500 transition duration-150 ease-in-out form-input"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
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
              >Email</label
            >
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
              >Message</label
            >
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
            <button
              type="submit"
              class="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <transition name="fade">
                <span v-if="!loading"> Let's talk</span>
                <span v-else class="flex items-center">
                  <svg
                    class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing
                </span>
              </transition>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      loading: false,
      success: false,
      errored: false,
      isBot: false,
      isDev: process.env.NODE_ENV !== 'production',
      form: {
        name: '',
        email: '',
        message: '',
        bot: false,
      },
      formTesting: {
        name: 'Ewilan',
        email: 'ewilan@dotslashplay.it',
        message:
          'Dolor pariatur exercitation duis dolore eu ut commodo quis incididunt ad voluptate sit. Do est nulla adipisicing ut dolore amet dolore nostrud labore. Magna laborum aliqua duis eiusmod quis aliquip officia veniam adipisicing est magna nostrud culpa. Laborum nisi nisi sit Lorem fugiat aute deserunt ea reprehenderit sint sint nulla ad labore.',
      },
    }
  },
  methods: {
    notAvailable() {
      this.$store.commit('setAlertMessage', {
        type: 'warning',
        title: 'Sorry!',
        message: 'Contact is not available yet!',
      })
      this.$store.commit('toggleShowAlert')
      setTimeout(() => {
        this.$store.commit('setShowAlert', false)
      }, 3000)
    },
    fillForm() {
      for (const [key] of Object.entries(this.form)) {
        this.form[key] = this.formTesting[key]
      }
    },
    async sumbit() {
      this.loading = true

      if (this.form.bot != null) {
        this.isBot = true
      } else {
        try {
          await this.$axios.post('/api/contact', this.form)

          this.success = true
          this.errored = false
          this.form = {
            name: '',
            email: '',
            message: '',
          }

          this.$store.commit('setAlertMessage', {
            type: 'success',
            title: 'Message sended!',
            message: 'Thanks you for your message.',
          })
          this.$store.commit('toggleShowAlert')
          setTimeout(() => {
            this.$store.commit('setShowAlert', false)
          }, 5000)
        } catch (e) {
          console.error(e)
          this.errored = true
          this.$store.commit('setAlertMessage', {
            type: 'danger',
            title: 'Error!',
            message:
              "We are sorry but your message can't be send, try in some time.",
          })
          this.$store.commit('toggleShowAlert')
          setTimeout(() => {
            this.$store.commit('setShowAlert', false)
          }, 5000)
        }
      }
      this.loading = false
    },
  },
}
</script>

<style lang="postcss" scoped></style>
