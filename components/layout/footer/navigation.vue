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
          title: 'discover',
          links: [
            { label: 'advanced-search', route: { name: 'search-advanced' } },
            {
              label: 'about',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'about' },
              },
            },
            {
              label: 'features',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'features' },
              },
            },
          ],
        },
        support: {
          title: 'support',
          links: [
            {
              label: 'more-ebooks',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'more-ebooks' },
              },
            },
            {
              label: 'faq',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'faq' },
              },
            },
            { label: 'contact', route: { name: 'contact' } },
          ],
        },
        advanced: {
          title: 'more',
          links: [
            {
              label: 'genres-tags',
              route: {
                name: 'tags',
              },
            },
            {
              label: 'languages',
              route: {
                name: 'languages',
              },
            },
            {
              label: 'publishers',
              route: {
                name: 'publishers',
              },
            },
          ],
        },
        legal: {
          title: 'legal',
          links: [
            {
              label: 'legality',
              route: {
                name: 'type-slug',
                params: { type: 'pages', slug: 'legal' },
              },
            },
            {
              label: 'privacy',
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
