<template>
  <blocks-redirection :to="localePath('/')" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware({ redirect }) {
    redirect('/')
  },
})
export default class PageRelated extends Vue {}
</script>
