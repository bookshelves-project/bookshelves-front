<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="relative pt-16 pb-32 overflow-hidden">
    <div class="relative">
      <div
        class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24"
      >
        <div
          class="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0"
        >
          <div class="py-20">
            <div>
              <div class="flex items-center">
                <icon
                  name="bookshelves-logo"
                  :size="50"
                  class="text-primary-600"
                />
                <h2
                  class="ml-3 text-3xl font-extrabold tracking-tight text-primary-600 font-handlee"
                >
                  Find the book that fits you!
                </h2>
              </div>
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
        <div class="mt-12 sm:mt-16 lg:mt-0">
          <div
            class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full"
          >
            <img
              v-if="$colorMode.value === 'light'"
              class="w-full shadow rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
              src="/images/books.webp"
              alt="Books page"
            />
            <img
              v-else
              class="w-full shadow rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
              src="/images/books-dark.webp"
              alt="Books page"
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
          <div class="py-20">
            <div>
              <div class="flex items-center">
                <icon name="ereader" :size="50" class="text-primary-600" />
                <h2
                  class="ml-3 text-3xl font-extrabold tracking-tight text-primary-600 font-handlee"
                >
                  Want to know your eReader?
                </h2>
              </div>
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
              v-if="$colorMode.value === 'light'"
              class="w-full shadow rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
              src="/images/guides.webp"
              alt="Guides page"
            />
            <img
              v-else
              class="w-full shadow rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
              src="/images/guides-dark.webp"
              alt="Guides page"
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
