import { MetaObject } from '#app'
import { ComputedGetter } from 'vue'

export const useMetadata = (meta?: HeadMeta) => {
  const config = useRuntimeConfig()
  const staticMetadata: HeadElement[] = [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
    {
      hid: 'robots',
      name: 'robots',
      content: config.metaRobot,
    },
    { name: 'msapplication-TileColor', content: config.metaColor },
    { name: 'theme-color', content: config.metaColor },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'author',
      name: 'author',
      content: config.metaAuthor,
    },
    {
      hid: 'language',
      name: 'language',
      content: config.metaLang,
    },
    {
      hid: 'designer',
      name: 'designer',
      content: config.metaAuthor,
    },
    {
      hid: 'publisher',
      name: 'publisher',
      content: config.appName,
    },
    {
      hid: 'copyright',
      name: 'copyright',
      content: config.appName,
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: config.appName,
    },
    {
      hid: 'og:locale',
      property: 'og:locale',
      content: config.metaLang,
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    config.metaTwitterSite
      ? {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: config.metaTwitterSite,
        }
      : {},
    config.metaTwitterCreator
      ? {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: config.metaTwitterCreator,
        }
      : {},
  ]

  let title = config.appName
  if (meta?.title) {
    title = `${meta.title} · ${config.appName}`
    title = title.replace('APP_NAME', config.appName)
  }

  let description = config.metaDescription
  if (meta?.description && meta.description.length > 155) {
    description = meta.description.substring(0, 155 - 3) + '...'
  }

  let image = '/default.jpg'
  if (meta?.image) {
    image = meta.image
  }

  const { fullPath } = useRoute()
  let route = fullPath

  const metadata: MetaObject | ComputedGetter<MetaObject> = {
    title: title,
    meta: [
      { charset: 'utf-8' },
      ...staticMetadata,
      // {
      //   hid: 'google-site-verification',
      //   name: 'google-site-verification',
      //   content: metadata.settings.googleToken,
      // },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: route,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title,
      },
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
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: title,
      },
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
        name: 'twitter:image',
        content: image,
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  }

  useHead(metadata)
}
