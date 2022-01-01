<template>
  <div class="mt-6">
    <form
      class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
      @submit.prevent="sumbit"
    >
      <field-text-input
        v-model="form.name"
        name="name"
        label="Name"
        autocomplete="name"
        class="sm:col-span-2"
        required
      />
      <field-text-input
        v-model="form.email"
        name="email"
        label="Email"
        autocomplete="email"
        class="sm:col-span-2"
        required
      />
      <field-text-input
        v-model="form.message"
        name="message"
        label="Message"
        minlength="15"
        maxlength="1500"
        multiline
        class="sm:col-span-2"
        required
      />
      <field-checkbox
        v-model="form.honeypot"
        name="conditions"
        label="Accept conditions"
        class="hidden sm:col-span-2"
      >
        Accept conditions about data privacy about
        {{ $config.appName }} to send your message to
        {{ $config.appName }} Team.
      </field-checkbox>
      <div class="sm:col-span-2">
        <div class="flex items-center space-x-2">
          <app-button
            type="submit"
            color="primary"
            align="center"
            class="w-full"
          >
            <transition name="fade">
              <div v-if="!loading" class="flex items-center space-x-2">
                <svg-icon name="airplane" class="w-5 h-5" />
                <div>Let's talk</div>
              </div>
              <div v-else class="flex items-center space-x-1">
                <app-loading class="w-5 h-5 text-white" />
                <div>Processing</div>
              </div>
            </transition>
          </app-button>
          <app-button v-if="isDev" type="button" @click="fillForm">
            <svg-icon name="test" class="w-5 h-5" />
          </app-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
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
        honeypot: false,
      },
      formTesting: {
        name: 'Ewilan',
        email: 'ewilan@dotslashplay.it',
        message:
          'Dolor pariatur exercitation duis dolore eu ut commodo quis incididunt ad voluptate sit. Do est nulla adipisicing ut dolore amet dolore nostrud labore. Magna laborum aliqua duis eiusmod quis aliquip officia veniam adipisicing est magna nostrud culpa. Laborum nisi nisi sit Lorem fugiat aute deserunt ea reprehenderit sint sint nulla ad labore.',
        honeypot: false,
      },
    }
  },
  mounted() {
    if (this.$auth.$state.loggedIn) {
      this.form.name = this.$auth.$state.user.data.name
      this.form.email = this.$auth.$state.user.data.email
    }
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
        if (!this.form.honeypot) {
          await this.$axios.post('/submission', this.form)
        }

        this.success = true
        this.errors = false
        this.form = {
          name: '',
          email: '',
          message: '',
          honeypot: false,
        }

        this.$nuxt.$emit('toast', {
          title: 'Message sended!',
          text: 'Thanks you for your message.',
          type: 'success',
        })
      } catch (e) {
        console.error(e)
        this.errors = true
        this.$nuxt.$emit('toast', {
          title: 'Error!',
          text: "We are sorry but your message can't be send, try in some time.",
          type: 'error',
        })
      }
      this.loading = false
    },
  },
}
</script>

<style lang="postcss" scoped></style>
