<template>
  <div class="main-content">
    <form-profile :user="user" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiEndpoint, ApiResponse, HTTPResponse, Profile } from '~/types'

@Component({
  async asyncData({ $repository }) {
    const api = await $repository(ApiEndpoint.Profile).find<Profile>()

    return {
      user: api.data,
    }
  },
})
export default class PageProfileSettings extends Vue {
  user!: Profile
}
</script>
