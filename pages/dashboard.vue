<template>
  <div>
    <div>Dashboard</div>
    <div v-for="book in booksUpdate" :key="book.id">
      <pre>{{ book.title }}</pre>
    </div>
    <button @click="getData">getData</button>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
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
