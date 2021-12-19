---
title: "Roadmap"
description: 'About upgrade project & useful links'
---

## Roadmap

- [ ] pagination related
- [ ] api related more logic: not with books
- [ ] book slug button couple in header color
- [ ] metadata additional
- [ ] button with svg
- [ ] author slug books/series load more
- [ ] author/book/serie slug mixin
- [ ] jsonld
- [ ] toast to replace old notification
- [ ] serie/author load mounted books/series

<https://github.com/ymmooot/nuxt-jsonld>

```vue
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Jsonld } from 'nuxt-jsonld';

  @Jsonld
  @Component
  export default class Sample extends Vue {
    jsonld() {
      return {
        '@context': 'https://schema.org',
        '@type': 'Product'
        name: 'product name',
      };
    }
  };
</script>
```

## Documentation links

- [**Nuxt Typescript**](https://typescript.nuxtjs.org/guide/introduction)
- [**Nuxt Composition API**](https://composition-api.nuxtjs.org/getting-started/introduction)
- [**Windi CSS**](https://windicss.org/guide/)
- [**Nuxt 2**](https://nuxtjs.org/docs/get-started/installation/)
- [**Nuxt 3**](https://v3.nuxtjs.org/docs/usage/data-fetching)
- [**Vue 3 Composition API**](https://v3.vuejs.org/guide/composition-api-introduction.html)
- [**Vue 3 Lifecycle Hooks**](https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html)
- [**lindsay-wardell blog**](https://www.thisdot.co/author/lindsay-wardell)
- [**Vue 3 script setup props with typescript**](https://blog.ninja-squad.com/2021/09/30/script-setup-syntax-in-vue-3/)

## Nuxt2 with Typescript

- [**LogRocket**](https://blog.logrocket.com/how-to-set-up-and-code-nuxt-js-apps-fully-in-typescript/)

## Upgrade to Nuxt3

- [**Bridge**](https://v3.nuxtjs.org/getting-started/bridge/)
- [**@nuxtjs/composition-api discussions**](https://github.com/nuxt-community/composition-api/discussions/585)

## Modules

- [**Modules status**](https://isnuxt3ready.owln.ai/)

### Tailwind CSS

- [**Typography**](https://tailwindcss.com/docs/typography-plugin)
- [**@apply with dark mode and deep**](https://github.com/tailwindlabs/tailwindcss/issues/6388)

```vue
<style lang="css" scoped>
.footer-bottom::v-deep {
  @apply text-gray-500;
  & a {
    @apply hover:text-gray-900 transition-colors duration-100;
  }
}
.dark {
  & .footer-bottom::v-deep {
    @apply text-gray-400;
    & a {
      @apply hover:text-gray-100;
    }
  }
}
</style>
```

- [**Add utilities @apply**](https://github.com/tailwindlabs/tailwindcss/issues/5989)
- [**Plugins**](https://tailwindcss.com/docs/plugins)
- [**Theme reference**](https://tailwindcss.com/docs/theme#configuration-reference)

## Lab

### Vue

- [**CSS with scoped and deep**](https://stackoverflow.com/questions/48032006/how-do-i-use-deep-or-or-v-deep-in-vue-js)

### Nuxt 3

- [**medium.com**](https://medium.com/@AzilenTech/using-script-setup-for-vue-3-ec4b6173b7f4)
- <https://github.com/nuxt/nuxt.js/issues/5330>: Vue 3 script setup review
- <https://github.com/nuxt/nuxt.js/issues/7884>
- <https://robsontenorio.github.io/vue-api-query/configuration>
- <https://vueschool.io/articles/vuejs-tutorials/nuxt-composition-api/>
- <https://blog.ninja-squad.com/2021/09/30/script-setup-syntax-in-vue-3>
- <https://v3.vuejs.org/api/sfc-script-setup.html#defineexpose>
- <https://al-un.github.io/learn-nuxt-ts>
- <https://blog.logrocket.com/how-to-set-up-and-code-nuxt-js-apps-fully-in-typescript>

### Vue 3

- <https://www.thisdot.co/blog/vue-3-2-using-composition-api-with-script-setup>
- <https://learnvue.co/2020/12/how-to-use-lifecycle-hooks-in-vue3/>
- <https://v3.vuejs.org/guide/composition-api-introduction.html>
- <https://v3.vuejs.org/api/composition-api.html>
- <https://v3.vuejs.org/guide/migration/v-model.html#overview>
- <https://www.mokkapps.de/blog/why-i-love-vue-3-s-composition-api/>
- <https://v3.vuejs.org/api/sfc-script-setup.html#using-custom-directives>
- <https://www.netlify.com/blog/2021/01/29/deep-dive-into-the-vue-composition-apis-watch-method/>
- <https://vuejsdevelopers.com/2020/03/31/vue-js-form-composition-api/>
- <https://codecourse.com/watch/build-a-blog-with-laravel-and-vue?part=introduction-and-demo-laravel-vue-blog>

### TipTap

- <https://tiptap.dev/installation/vue3>
- <https://bestofvue.com/repo/heyscrumpy-tiptap-vuejs-rich-text-editing>

### JS & Vue

- <https://www.freecodecamp.org/news/learn-modern-javascript/>
- <https://stackoverflow.com/questions/63986278/vue-3-v-deep-usage-as-a-combinator-has-been-deprecated-use-v-deepinner-se>
