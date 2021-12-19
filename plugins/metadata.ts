import { Plugin } from '@nuxt/types'
import { HeadElement, HeadMeta, MetaPropertyCharset, MetaPropertyEquiv, MetaPropertyMicrodata, MetaPropertyName, MetaPropertyProperty } from '~/types'
import metadataDynamic from '~/utils/metadata/dynamic'

declare module 'vue/types/vue' {
  interface Vue {
    $metadata(meta: HeadMeta): (MetaPropertyCharset | MetaPropertyEquiv | MetaPropertyName | MetaPropertyMicrodata | MetaPropertyProperty)[]
  }
}

const metadata: Plugin = (context, inject) => {
  inject('metadata', (meta: HeadMeta): HeadElement[] => {
    const metadata: HeadMeta = {
      title: meta.title,
      description: meta.description,
      image: meta.image,
      route: context.route.path
    }
    return metadataDynamic(metadata, context.$config)
  })
}

export default metadata
