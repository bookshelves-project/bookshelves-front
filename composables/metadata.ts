import { MetaObject } from '#app'
import { ComputedGetter } from 'vue'

export const useMetadata = () => {
  const setHead = (
    meta?: HeadMeta
  ): MetaObject | ComputedGetter<MetaObject> => {
    const { appName, metaDescription, metaRobot, metaColor, baseURL } =
      useRuntimeConfig()

    let title = appName
    if (meta?.title) {
      title = `${meta.title} · ${appName}`
      title = title.replace('APP_NAME', appName)
    }

    let description = metaDescription
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
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
        {
          hid: 'robots',
          name: 'robots',
          content: metaRobot,
        },
        { name: 'msapplication-TileColor', content: metaColor },
        { name: 'theme-color', content: metaColor },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }

    // const metadata: HeadMeta = {
    //   title: meta.title,
    //   description: meta.description,
    //   image: meta.image,
    //   route: context.route.path
    // }
    // return {
    //   title: metadata.title,
    //   meta: metadataDynamic(metadata, context.$config) as unknown as (MetaPropertyCharset | MetaPropertyEquiv | MetaPropertyName | MetaPropertyMicrodata | MetaPropertyProperty)[]
    // }

    const { updateSocialTags } = useSocialTags()
    updateSocialTags({
      title: title,
      description: metaDescription,
      img: image,
      url: route,
    })

    useHead(metadata)

    return metadata
  }

  return {
    setHead,
  }
}
