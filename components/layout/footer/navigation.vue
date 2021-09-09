<template>
  <div>
    <div class="md:grid md:grid-cols-2 md:gap-8">
      <layout-footer-column :navigation="navigation.project" />
      <layout-footer-column
        class="mt-12 md:mt-0"
        :navigation="navigation.support"
      />
    </div>
    <div class="md:grid md:grid-cols-2 md:gap-8">
      <layout-footer-column :navigation="navigation.advanced" />
      <layout-footer-column
        class="mt-12 md:mt-0"
        :navigation="navigation.legal"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooterNavigation',
  data() {
    return {
      navigation: {
        project: {
          title: this.$config.appName,
          links: [
            { label: 'Advanced search', route: { name: 'search-advanced' } },
            {
              label: 'About',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'about' },
              },
            },
            {
              label: 'Features',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'features' },
              },
            },
          ],
        },
        support: {
          title: 'Support',
          links: [
            {
              label: 'More eBooks',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'more-ebooks' },
              },
            },
            {
              label: 'FAQ',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'faq' },
              },
            },
            { label: 'Contact', route: { name: 'contact' } },
          ],
        },
        advanced: {
          title: 'More',
          links: [
            {
              label: 'Genres & Tags',
              route: {
                name: 'tags',
              },
            },
            {
              label: 'Languages',
              route: {
                name: 'languages',
              },
            },
            {
              label: 'Publishers',
              route: {
                name: 'publishers',
              },
            },
          ],
        },
        legal: {
          title: 'Legal',
          links: [
            {
              label: 'Legal',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'legal' },
              },
            },
            {
              label: 'Privacy',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'privacy' },
              },
            },
          ],
        },
      },
    }
  },
}
</script>
