<template>
  <div class="container">
    {{ $t('welcome') }}
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      >{{ locale.name }}</nuxt-link
    >
    <a
      v-for="locale in availableLocales"
      :key="locale.code"
      href="#"
      @click.prevent.stop="$i18n.setLocale(locale.code)"
      >{{ locale.name }}</a
    >
    <dropdown-template align="right" :width="48">
      <template #trigger> Language </template>
      <template #content>
        <a
          v-for="locale in availableLocales"
          :key="locale.code"
          class="block"
          href="#"
          @click.prevent.stop="$i18n.setLocale(locale.code)"
          >{{ locale.name }}</a
        >
      </template>
    </dropdown-template>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitch',
}
</script>

<style lang="postcss" scoped></style>
