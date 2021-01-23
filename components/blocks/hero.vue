<template>
  <main>
    <div
      class="pt-10 bg-white-200 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden"
    >
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <div
            class="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center"
          >
            <div class="lg:py-24">
              <a
                href="#"
                class="inline-flex items-center p-1 pr-2 text-gray-800 bg-white rounded-full sm:text-base lg:text-sm xl:text-base hover:text-gray-600"
              >
                <span
                  class="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-full"
                  >We're hiring</span
                >
                <span class="ml-4 text-sm">Visit our careers page</span>
                <!-- Heroicon name: chevron-right -->
                <svg
                  class="w-5 h-5 ml-2 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <h1
                class="mt-4 text-4xl font-extrabold tracking-tight text-gray-800 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"
              >
                <span class="block">A better way to</span>
                <span class="block text-indigo-600">ship web apps</span>
              </h1>
              <p
                class="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
              >
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat.
              </p>
              <div class="mt-10 sm:mt-12">
                <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
                  <div class="sm:flex">
                    <div class="flex-1 min-w-0">
                      <label for="email" class="sr-only">Email address</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        class="block w-full px-4 py-3 text-base text-gray-600 placeholder-gray-600 bg-gray-200 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                      />
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                      <button
                        type="submit"
                        class="block w-full px-4 py-3 font-medium text-white bg-indigo-500 rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                      >
                        Start free trial
                      </button>
                    </div>
                  </div>
                  <p class="mt-3 text-sm text-gray-500 sm:mt-4">
                    Start your free 14-day trial, no credit card necessary. By
                    providing your email, you agree to our
                    <a href="#" class="font-medium text-gray-800"
                      >terms or service</a
                    >.
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
            <div
              class="h-full max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0"
            >
              <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
              <img
                class="object-cover object-left w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-full lg:max-w-none"
                src="/images/book-lover.svg"
                alt=""
              />
              <!-- <img
                    class="object-cover object-left w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="/images/book-lover.svg"
                    alt=""
                  /> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- More main page content here... -->
  </main>
</template>

<script>
export default {
  name: 'Hero',
}
</script>

<style lang="postcss" scoped></style>
