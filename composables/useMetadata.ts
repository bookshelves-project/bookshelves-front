import type { ComputedGetter } from 'vue'
import type { UseHeadInput } from '@vueuse/head'

interface HeadMeta {
  description?: string
  route?: string
  image?: string
  type?: string
  url?: string
  title?: string
}

export function useMetadata(meta?: HeadMeta) {
  const appConfig = useAppConfig()

  const appName = appConfig.appName
  const appDescription = appConfig.metaDescription

  let metaTitle = appName
  if (meta?.title) {
    metaTitle = `${meta.title} · ${appName}`
    metaTitle = metaTitle.replace('APP_NAME', appName)
  }

  let metaDescription = appDescription
  if (meta?.description)
    metaDescription = `${meta.description.substring(0, 155 - 3)}...`

  let metaImage = '/default.jpg'
  if (meta?.image)
    metaImage = meta.image

  const { fullPath } = useRoute()
  const route = fullPath

  const { isDarkMode } = useDarkMode()

  const metadata: UseHeadInput | ComputedGetter<UseHeadInput> = {
    title: metaTitle,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: metaDescription,
      },
      {
        name: 'theme-color',
        content: isDarkMode ? '#00aba9' : '#ffffff',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: route,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: metaTitle,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: metaDescription,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: metaImage,
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: metaTitle,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: metaTitle,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: metaDescription,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: metaImage,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: isDarkMode ? '/favicon-dark.svg' : '/favicon.svg',
      },
    ],
  }

  // https://github.com/vueuse/schema-org
  // https://vue-schema-org.netlify.app/guide/setup/nuxt.html
  // useSchemaOrg([
  //   defineOrganization({
  //     name: 'Nuxt.js',
  //     logo: '/logo.png',
  //     sameAs: [
  //       'https://twitter.com/nuxt_js'
  //     ]
  //   }),
  //   defineWebSite({
  //     name: 'Nuxt'
  //   })
  //   // defineWebPage(),
  // ])

  useHead(metadata)
}
