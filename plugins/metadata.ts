import { Plugin } from '@nuxt/types'
import { HeadMeta, MetaInfo, MetaPropertyCharset, MetaPropertyEquiv, MetaPropertyMicrodata, MetaPropertyName, MetaPropertyProperty } from '~/types'
import metadataDynamic from '~/utils/metadata/dynamic'

declare module 'vue/types/vue' {
  interface Vue {
    $metadata(meta: HeadMeta): MetaInfo
  }
}

const metadata: Plugin = (context, inject) => {
  inject('metadata', (meta: HeadMeta): MetaInfo => {
    const metadata: HeadMeta = {
      title: meta.title,
      description: meta.description,
      image: meta.image,
      route: context.route.path
    }
    return {
      title: metadata.title,
      meta: metadataDynamic(metadata, context.$config) as unknown as (MetaPropertyCharset | MetaPropertyEquiv | MetaPropertyName | MetaPropertyMicrodata | MetaPropertyProperty)[]
    }
  })
}

export default metadata
