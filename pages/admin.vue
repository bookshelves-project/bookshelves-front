<template>
  <div class="container max-w-7xl">
    <section-heading
      v-if="$auth.$state.loggedIn"
      title="Admin"
      :subtitle="`Welcome ${$auth.user.data.name}`"
      :image="$auth.$state.user.data.profile_photo_url"
    />
    <main>
      <div class="py-5">
        <div class="flex items-center space-x-6">
          <app-button @click="updateNewEbooks">
            Update for new eBooks
          </app-button>
          <transition name="fade">
            <span v-if="loading" class="flex items-center space-x-1">
              <svg-icon name="load" class="w-5 h-5 text-gray-300" />
              <div>Processing</div>
            </span>
          </transition>
        </div>
        <div class="max-w-md mt-3 ml-1">
          If you add new eBooks to <span class="font-mono">books-raw</span> you
          can activate generation of new Books on {{ $config.appName }} with
          this action.
        </div>
      </div>
      <div class="py-5">
        <app-button> Regenerate database </app-button>
        <div class="max-w-md mt-3 ml-1">
          <b class="text-red-600">DANGEROUS METHOD</b><br />
          Regenerate all database from <span class="font-mono">books-raw</span>.
          All users which aren't into seeds, all comments and favorites will be
          erased, even you have an account into seeds, you will be disconnected
          and your password reset. This action can take some minutes before you
          can connect yourself again.
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import sectionHeading from '~/components/blocks/section-heading.vue'
export default {
  name: 'PageAdmin',
  components: { sectionHeading },
  middleware: 'admin',
  data() {
    return {
      loading: false,
    }
  },
  head() {
    const title = 'Admin'
    const description = 'Admin dashboard.'
    const image = `${this.$config.baseURL}/open-graph.jpg`
    const url = `${this.$config.baseURL}/dashboard`
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
  methods: {
    async updateNewEbooks() {
      this.loading = true
      try {
        const res = await this.$axios.$get('/commands/update-books')
        if (res.books > 0) {
          this.$swal({
            title: 'Update success',
            text: `${res.success}, found ${res.books} books`,
            icon: 'success',
            confirmButtonText: 'Understand',
          })
        } else {
          this.$swal({
            title: 'Oops!',
            text: 'It seems no new eBook is available in books-raw directory',
            icon: 'error',
            confirmButtonText: 'Understand',
          })
        }

        this.loading = false
      } catch (error) {
        console.error(error)
        this.$swal({
          title: 'Oops!',
          text: 'Unknown error spawn!',
          icon: 'error',
          confirmButtonText: 'Understand',
        })
        this.loading = false
      }
    },
  },
}
</script>
