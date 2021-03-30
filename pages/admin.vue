<template>
  <div class="container max-w-7xl">
    <section-heading
      title="Admin"
      :subtitle="`Welcome ${$auth.user.data.name}`"
      :image="$auth.$state.user.data.profile_photo_url"
    />
    <main>
      <div class="py-5">
        <div class="flex items-center space-x-6">
          <v-button @click="updateNewEbooks"> Update for new eBooks </v-button>
          <transition name="fade">
            <span v-if="loading" class="flex items-center space-x-1">
              <icon-load class="w-5 h-5 text-primary-300" />
              <div>Processing</div>
            </span>
          </transition>
        </div>
        <div class="max-w-md mt-3 ml-1">
          If you add new eBooks to <span class="font-mono">books-raw</span> you
          can activate generation of new Books on Bookshelves with this action.
        </div>
      </div>
      <div class="py-5">
        <v-button> Regenerate database </v-button>
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
import IconLoad from '~/components/icons/icon-load.vue'
import VButton from '~/components/special/v-button.vue'
export default {
  name: 'PageAdmin',
  components: { sectionHeading, VButton, IconLoad },
  data() {
    return {
      loading: false,
    }
  },
  head() {
    const title = 'Admin'
    const description = 'Admin dashboard.'
    const image = `${process.env.BASE_URL}/open-graph.jpg`
    const url = `${process.env.BASE_URL}/dashboard`
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
        const res = await this.$axios.$get('/api/commands/update-books')
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
