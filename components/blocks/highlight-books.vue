<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
        <div class="space-y-5 sm:space-y-4">
          <h2
            class="text-3xl font-bold tracking-tight text-primary-600 dark:text-primary-500 font-handlee sm:text-4xl"
          >
            Highlight on last eBooks
          </h2>
          <p class="text-xl text-gray-500">
            Here is a selection of the latest eBooks released that you can
            discover right now!
          </p>
        </div>
        <div class="lg:col-span-2">
          <ul
            class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
          >
            <li v-for="person in people" :key="person.name">
              <div class="flex items-center space-x-4 lg:space-x-6">
                <img
                  v-lazy="person.imageUrl"
                  class="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                  alt=""
                />
                <div class="space-y-1 text-lg font-medium leading-6">
                  <h3>{{ person.name }}</h3>
                  <p class="text-indigo-600">{{ person.role }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HighlightBooks',
  data() {
    return {
      people: [
        {
          name: 'Leslie Alexander',
          role: 'Co-Founder / CEO',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        // More people...
      ],
    }
  },
}
</script>
