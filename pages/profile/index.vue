<template>
  <div class="main-content">
    <!-- <app-header
      v-if="$auth.$state.loggedIn"
      :title="`${title}`"
      :subtitle="`Welcome ${user.name}`"
      :text="'user.about'"
      :image="user.avatar"
    >
      <app-button
        :to="
          localePath({
            name: 'users-slug',
            params: { slug: user.slug },
          })
        "
      >
        See my public profile
      </app-button>
    </app-header> -->
    {{ user }}
    <!-- Main 2 column grid -->
    <div class="grid items-start grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8">
      <!-- Left column -->
      <!-- <div class="grid grid-cols-1 gap-4 xl:col-span-1">
        <block-data-list-template
          :data-list="favorites"
          title="Favorites list"
          subtitle="All your favorites will be here."
          empty-list="Your favorite list is empty, try to favorite any book, series or author."
          icon="heart"
          :loading="loading"
          :can-delete="true"
          @destroy="destroy"
        />
      </div> -->

      <!-- Right column -->
      <!-- <div class="grid grid-cols-1 gap-4 xl:col-span-1">
        <block-data-list-template
          :data-list="comments"
          title="Comments list"
          subtitle="All your comments will be here."
          empty-list="Your comments list is empty, try to comment any book, series or author."
          icon="comment"
          :loading="loading"
          :can-delete="true"
          @destroy="destroy"
        />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import type { Auth } from '@nuxtjs/auth-next'
import { Component, Vue } from 'nuxt-property-decorator'
import { ApiResponse } from '~/types'
import { User } from '~/types/entities/user'

@Component({
  asyncData({ $auth }) {
    const api = $auth.user as unknown as ApiResponse<User>
    return {
      $auth,
      user: api.data,
    }
  },
  head(this: PageProfile) {
    return this.$metadata({
      title: this.title,
      description: 'An overview of all your activities.',
    })
  },
  middleware: 'auth',
})
export default class PageProfile extends Vue {
  user!: User
  $auth!: Auth
  title!: 'My profile'
  // mixins: [favorites, comments]
  // middleware: 'auth'
  // loading: true
  // favorites: []
  // comments: []
  // title: 'My profile'
  mounted() {
    this.getData()
  }

  async getData() {
    try {
      const [favorites, comments] = await Promise.all([
        this.$axios.$get(`/favorites/${this.$auth.$state.user.data.id}`),
        this.$axios.$get(`/comments/${this.$auth.$state.user.data.id}`),
      ])
      // this.favorites = favorites.data
      // this.comments = comments.data
      // this.loading = false
    } catch (error) {
      console.error(error)
      // this.loading = false
    }
  }

  destroy(data: any) {
    data = data.data
    switch (data.meta.type) {
      case 'favorite':
        // this.deleteFavorite(data.meta.for, data.meta.slug)
        break
      case 'comment':
        // this.deleteComment(data.id)
        break
      default:
        console.error('no type entity')
        break
    }
  }
}
</script>
