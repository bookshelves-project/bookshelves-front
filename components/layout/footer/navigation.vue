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
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutFooterNavigation',
  computed: {
    ...mapGetters({
      navigation: 'nav/footer',
    }),
  },
}
</script>
