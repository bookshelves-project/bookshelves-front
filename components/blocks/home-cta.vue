<template>
  <section class="pt-2">
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
  </section>
</template>

<script>
export default {
  name: 'HomeCta',
}
</script>

<style lang="postcss" scoped></style>
