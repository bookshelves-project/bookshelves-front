<template>
  <div class="relative pt-16 pb-32 lg:overflow-hidden">
    <div
      aria-hidden="true"
      class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
    ></div>
    <div class="relative">
      <div
        class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24"
      >
        <div
          class="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0"
        >
          <div>
            <div>
              <span
                class="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <!-- Heroicon name: outline/inbox -->
                <svg
                  class="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </span>
            </div>
            <div class="mt-6">
              <h2
                class="text-3xl font-extrabold tracking-tight text-gray-900 font-handlee"
              >
                Find the book that fits you
              </h2>
              <p class="mt-4 text-lg text-gray-500">
                A selection of more than a hundred works, find the one that will
                strike a chord with your soul. And come back for ten more.
                Search by title, author or series then download all the books of
                an author or series if you wish!
              </p>
            </div>
          </div>
          <div class="pt-6 mt-8 border-t border-gray-200">
            <blockquote>
              <div>
                <p class="text-base text-gray-500">
                  &ldquo;Maybe it's not quite legal but it's cool!&rdquo;
                </p>
              </div>
              <footer class="mt-3">
                <div class="flex items-center space-x-3">
                  <div class="text-base font-medium text-gray-700">
                    An enthusiastic reader
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
        <div class="mt-12 overflow-hidden sm:mt-16 lg:mt-0">
          <div
            class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full"
          >
            <img
              class="w-full shadow rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
              src="/images/books.webp"
              alt="Inbox user interface"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-24">
      <div
        class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24"
      >
        <div
          class="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2"
        >
          <div>
            <div>
              <span
                class="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <!-- Heroicon name: outline/sparkles -->
                <svg
                  class="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </span>
            </div>
            <div class="mt-6">
              <h2
                class="text-3xl font-extrabold tracking-tight text-gray-900 font-handlee"
              >
                Want to know your eReader?
              </h2>
              <p class="mt-4 text-lg text-gray-500">
                Detailed guides are there to explain how to best manage your
                eReader but also to get to know the eBooks better in order to
                modify them if you wish.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
          <div
            class="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full"
          >
            <img
              class="w-full shadow rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
              src="/images/guides.webp"
              alt="Customer profile user interface"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturesHighlight',
}
</script>
