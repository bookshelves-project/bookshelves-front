import { MetaObject } from '#app'
import { ComputedGetter } from 'vue'

interface HeadMeta {
  description?: string
  route?: string
  image?: string
  type?: string
  url?: string
  title?: string
}

export const useMetadata = (meta?: HeadMeta) => {
  const config = useRuntimeConfig()

  const appName = config.public.appName
  const appDescription = config.public.metaDescription

  let title = appName
  if (meta?.title) {
    title = `${meta.title} · ${appName}`
    title = title.replace('APP_NAME', config.appName)
  }

  let description = appDescription
  if (meta?.description) {
    description = meta.description.substring(0, 155 - 3) + '...'
  }

  let image = '/default.jpg'
  if (meta?.image) {
    image = meta.image
  }

  const { fullPath } = useRoute()
  const route = fullPath

  const { isDarkMode } = useDarkMode()

  const metadata: MetaObject | ComputedGetter<MetaObject> = {
    title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      {
        name: 'theme-color',
        content: isDarkMode ? '#00aba9' : '#ffffff'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: route
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: image
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: title
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: image
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: isDarkMode ? '/favicon-dark.svg' : '/favicon.svg'
      }
    ]
  }

  // https://github.com/vueuse/schema-org
  // https://vue-schema-org.netlify.app/guide/setup/nuxt.html
  useSchemaOrg([
    defineOrganization({
      name: 'Nuxt.js',
      logo: '/logo.png',
      sameAs: [
        'https://twitter.com/nuxt_js'
      ]
    }),
    defineWebSite({
      name: 'Nuxt'
    })
    // defineWebPage(),
  ])

  useHead(metadata)
}
