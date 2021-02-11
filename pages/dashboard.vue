<template>
  <div class="container max-w-7xl">
    <section-heading
      title="Dashboard"
      :subtitle="`Welcome ${this.$auth.user.name}`"
    />
    <div class="flex justify-between">
      <button
        class="px-5 py-2 font-semibold text-white transition-colors duration-100 rounded-md bg-primary-600 hover:bg-primary-700"
        @click="getData"
      >
        Test API
      </button>
      <button
        class="px-5 py-2 font-semibold text-white transition-colors duration-100 rounded-md bg-primary-600 hover:bg-primary-700"
        @click="logout"
      >
        Sign out
      </button>
    </div>

    <div
      v-if="booksUpdate.length > 0"
      class="h-64 max-w-lg p-3 mt-5 overflow-scroll bg-gray-300 rounded-md"
    >
      <div v-for="book in booksUpdate" :key="book.id">
        <pre>{{ book.title }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import sectionHeading from '~/components/blocks/section-heading.vue'
export default {
  name: 'Dashboard',
  components: { sectionHeading },
  middleware: 'auth',
  data() {
    return {
      booksUpdate: [],
    }
  },
  methods: {
    async getData() {
      try {
        const [booksUpdate] = await Promise.all([
          this.$axios.$get('/api/books/update'),
        ])
        this.booksUpdate = booksUpdate
      } catch (error) {
        console.error(error)
      }
    },
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
