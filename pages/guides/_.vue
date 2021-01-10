<template>
  <div>
    <div class="relative py-16 overflow-hidden bg-white">
      <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          class="relative h-full mx-auto text-lg max-w-prose"
          aria-hidden="true"
        >
          <svg
            class="absolute transform translate-x-32 top-12 left-full"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
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
              height="384"
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            class="absolute transform -translate-x-32 -translate-y-1/2 top-1/2 right-full"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
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
              height="384"
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            class="absolute transform translate-x-32 bottom-12 left-full"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
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
              height="384"
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg>
        </div>
      </div>
      <div class="relative px-4 sm:px-6 lg:px-8">
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
        <div
          class="mx-auto mt-6 prose prose-lg text-gray-500 prose-indigo word-wraping"
        >
          <nuxt-content :document="document" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentSlugShort',
  middleware({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    }
  },
  async asyncData({ $content, store, app, params, error }) {
    const path = `/${params.pathMatch || 'index'}`
    const [document] = await $content({ deep: true }).where({ path }).fetch()
    if (!document) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    // const pathArray = document.path.split('/')
    // pathArray.splice(0, 1)
    // pathArray.splice(pathArray.length - 1, 1)
    // const otherDocumentsPath = pathArray.join('/')
    // const otherDocuments = await $content(otherDocumentsPath, {
    //   deep: true,
    // })
    //   .only(['title', 'path', 'extension', 'position'])
    //   .sortBy('position')
    //   .fetch()

    // const [prev, next] = await $content({ deep: true })
    //   .only(['title', 'path', 'to'])
    //   .sortBy('position', 'asc')
    //   .surround(document.path, { before: 1, after: 1 })
    //   .fetch()

    return {
      document,
      // otherDocuments,
      // prev,
      // next,
    }
  },
  head() {
    // const title = `${this.document.title} in ${this.document.category}`
    // const description = this.document.description
    //   ? this.document.description
    //   : 'No description'
    // const image = `${process.env.APP_URL}/documentation/logo/${this.$slugify(
    //   this.document.category
    // )}.webp`
    // return {
    //   title,
    //   meta: [
    //     {
    //       hid: 'description',
    //       name: 'description',
    //       content: description,
    //     },
    //     // Open Graph
    //     { hid: 'og:title', property: 'og:title', content: title },
    //     {
    //       hid: 'og:description',
    //       property: 'og:description',
    //       content: description,
    //     },
    //     {
    //       hid: 'og:image',
    //       property: 'og:image',
    //       content: image,
    //     },
    //     // Twitter Card
    //     {
    //       hid: 'twitter:title',
    //       name: 'twitter:title',
    //       content: title,
    //     },
    //     {
    //       hid: 'twitter:description',
    //       name: 'twitter:description',
    //       content: description,
    //     },
    //     {
    //       hid: 'twitter:image',
    //       property: 'twitter:image',
    //       content: image,
    //     },
    //   ],
    // }
  },
}
</script>
