<template>
  <section>
    <b-navbar type="primary" class="mb-lg-5 mb-3">
      <b-navbar-nav class="mx-auto text-center">
        <b-nav-item :to="localePath('/')" nuxt exact>{{ $t('nav.about') }}</b-nav-item>
        <b-nav-item :to="localePath('/bot')" nuxt>{{ $t('nav.bot') }}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <NuxtChild />
  </section>
</template>

<script>
export default {
  head() { return { title: this.$t("nav.market"), } }
}
</script>