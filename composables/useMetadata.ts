import { MetaObject } from '#app'
import { ComputedGetter } from 'vue'

export const useMetadata = (meta?: HeadMeta) => {
  const config = useRuntimeConfig()

  let title = config.appName
  if (meta?.title) {
    title = `${meta.title} · ${config.appName}`
    title = title.replace('APP_NAME', config.appName)
  }

  let description = config.metaDescription
  if (meta?.description) {
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
      {
        hid: 'description',
        name: 'description',
        content: description,
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
    ],
  }

  useHead(metadata)
}
