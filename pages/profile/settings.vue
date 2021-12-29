<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiEndpoint } from '~/types'

@Component({
  async asyncData({ $auth }) {
    const user = await $auth.fetchUser()
    console.log(user)

    // const user = await $repository(ApiEndpoint.Profile).find()
    // console.log(user)

    // return {
    //   user: user.data,
    // }
  },
})
export default class PageProfileSettings extends Vue {}
</script>

<style scoped></style>
