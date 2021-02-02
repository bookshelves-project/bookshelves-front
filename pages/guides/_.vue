<template>
  <div class="container max-w-7xl">
    <div class="flex flex-wrap-reverse w-full px-5 xl:col-span-3 md:px-10">
      <div class="w-full ml-auto lg:w-3/4">
        <div class="text-on-img-tailwind">
          <div class="relative w-full">
            <div class="source" style="z-index: -1">
              <img
                src="/images/no-cover.webp"
                class="h-40 mx-auto opacity-25 object-container"
              />
              <div
                class="absolute z-10 w-full text-2xl italic text-center text-white"
                style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
              >
                <div class="mx-auto text-lg max-w-prose">
                  <h1>
                    <span
                      class="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl"
                    >
                      {{ document.title }}
                    </span>
                  </h1>
                  <p class="mt-8 text-xl leading-8 text-gray-500">
                    {{ document.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-4 pb-10 mx-auto prose prose-lg lg:px-5 lg:pt-8">
          <nuxt-content :document="document" />
        </div>
      </div>
      <div class="relative block w-full lg:w-1/4">
        <div class="lg:sticky lg:top-16 h-full lg:h-auto lg:max-h-(screen-5)">
          <table-of-content :toc="document.toc"></table-of-content>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentSlugShort',
  async asyncData({ $content, store, app, params, error }) {
    const path = `/${params.pathMatch || 'index'}`
    const [document] = await $content({ deep: true }).where({ path }).fetch()
    if (!document) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    return {
      document,
    }
  },
  middleware({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    }
  },
  head() {
    const title = this.document.title
    const description = this.document.description
    const image = `${process.env.BASE_URL}/images/no-cover.webp`
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
          hid: 'twitter:image',
          property: 'twitter:image',
          content: image,
        },
      ],
    }
  },
}
</script>
