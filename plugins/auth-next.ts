import { Auth } from '@nuxtjs/auth-next'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $auth: Auth;
  }
  interface Context {
    $auth: Auth;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $auth: Auth;
  }
}
