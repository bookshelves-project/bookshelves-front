<template>
  <section class="px-4 py-6 overflow-hidden sm:px-6 lg:px-8 lg:py-10">
    <div class="container relative mx-auto max-w-7xl">
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
              class="text-gray-200 dark:text-gray-700"
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
              class="text-gray-200 dark:text-gray-700"
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
      <div class="lg:grid lg:grid-cols-2 lg:gap-32">
        <div>
          <div class="text-center">
            <h1
              class="text-3xl font-extrabold tracking-tight font-handlee text-primary-600 sm:text-4xl"
            >
              Leave us a short note
            </h1>
            <div class="mt-4 text-lg leading-6 text-left text-gray-500">
              <div>
                Do you like what we offer or do you hate our work? Do not
                hesitate to let us know with this nice form!
              </div>
              <div class="mt-2">
                <small>
                  Just kidding, if you hate what we do, you can leave, that
                  would be cool!
                </small>
              </div>
            </div>
          </div>
          <contact-form />
        </div>
        <div class="hidden lg:block">
          <img src="/images/pages/contact.webp" alt="Mail sent" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ContactForm from '~/components/forms/contact-form.vue'
export default {
  name: 'Contact',
  components: { ContactForm },
  head() {
    const title = 'Contact us'
    const description = 'Leave us a short note'
    const image = `${this.$config.baseURL}/open-graph.jpg`
    const url = `${this.$config.baseURL}/contact`
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
}
</script>
