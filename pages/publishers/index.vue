<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description" :border="false">
      <template #filters>
        <blocks-filters negligible />
      </template>
    </app-header>
    <blocks-content-list
      :items="publishers"
      name="publishers"
      route-name="publishers-slug"
    />
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import qs from 'qs'

export default {
  name: 'PagePublishers',
  async asyncData({ app, query }) {
    const queryList = { ...query }
    if (isEmpty(queryList)) {
      queryList['filter[negligible]'] = false
    }

    const publishers = await app.$axios.$get(
      `/publishers?${qs.stringify({ ...queryList })}`
    )

    return {
      publishers: publishers.data,
    }
  },
  data() {
    return {
      title: 'Publishers',
      description: 'Find your favorite publisher!',
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const title = this.title
    return {
      title,
      meta: [
        ...dynamicMetadata({
          title,
          description: this.description,
          url: this.$nuxt.$route.path,
        }),
      ],
    }
  },
  watchQuery: ['filter[negligible]'],
}
</script>
