<template>
  <div class="main-content divide-y divide-gray-600 dark:divide-gray-400">
    <form-profile-main :user="user" class="pb-10" />
    <form-profile-change-password class="py-10" />
    <form-profile-delete-account class="pt-10" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiEndpoint, ApiResponse, HTTPResponse, Profile } from '~/types'

@Component({
  async asyncData({ $repository }) {
    const api = await $repository(ApiEndpoint.Profile).find<Profile>()

    const user: Profile = api.data
    const title = `Profile of ${user.name}`

    return {
      user,
      title,
    }
  },
  head(this: PageProfileSettings) {
    return this.$metadata({
      title: this.title,
      description: 'You can update your profile.',
    })
  },
})
export default class PageProfileSettings extends Vue {
  user!: Profile
  title!: string
}
</script>
