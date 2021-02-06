<template>
  <section class="px-4 py-6 overflow-hidden bg-white sm:px-6 lg:px-8 lg:py-10">
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
              class="text-gray-200"
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
              class="text-gray-200"
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
        <form
          method="POST"
          class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          @submit.prevent="notAvailable"
        >
          <div class="sm:col-span-2">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div class="mt-1">
              <input
                id="name"
                type="text"
                name="name"
                autocomplete="name"
                class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Message</label
            >
            <div class="mt-1">
              <textarea
                id="message"
                name="message"
                rows="4"
                class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
          </div>
          <div class="sm:col-span-2">
            <button
              type="submit"
              class="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Let's talk
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
  },
}
</script>

<style lang="postcss" scoped></style>
