<template>
  <main class="mb-32 lg:mb-0">
    <div class="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <div
            class="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center"
          >
            <div class="lg:py-24">
              <h1
                class="mt-4 text-3xl font-extrabold text-gray-700 font-handlee lg:text-4xl"
              >
                <span class="block">Bookshelves, reading in complete</span>
                <span class="block text-indigo-600">
                  tranquility and freedom</span
                >
              </h1>
              <p
                class="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
              >
                If you have an eReader and are looking for plenty of eBooks to
                take everywhere with you, you've come to the right place, hours
                of reading in perspective.
              </p>
            </div>
          </div>
          <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
            <div
              class="h-full max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0"
            >
              <img
                v-if="$colorMode.value === 'light'"
                class="object-cover object-left w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/images/book-lover.svg"
                alt=""
              />
              <img
                v-else
                class="object-cover object-left w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/images/book-lover-dark.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Hero',
}
</script>

<style lang="postcss" scoped></style>
