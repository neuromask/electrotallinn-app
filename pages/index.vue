<template>
  <section>
<!--     <b-button-group center class="mx-auto">
        <b-button variant="outline-primary" :to="localePath('/')" nuxt exact>{{ $t('nav.about') }}</b-button>
        <b-button variant="outline-primary" :to="localePath('/bot')" nuxt>{{ $t('nav.bot') }}</b-button>
        <b-button variant="outline-primary" :to="localePath('/gallery')" nuxt>{{ $t('nav.gallery') }}</b-button>
        <b-button variant="outline-primary" :to="localePath('/donate')" nuxt>{{ $t('nav.donate') }}</b-button>
    </b-button-group> -->
    <b-navbar type="primary" class="mb-lg-5 mb-3">
      <b-navbar-nav class="mx-auto text-center">
        <b-nav-item :to="localePath('/')" nuxt exact>{{ $t('nav.about') }}</b-nav-item>
        <b-nav-item :to="localePath('/bot')" nuxt>{{ $t('nav.bot') }}</b-nav-item>
        <b-nav-item :to="localePath('/gallery')" nuxt>{{ $t('nav.gallery') }}</b-nav-item>
        <b-nav-item :to="localePath('/donate')" nuxt>{{ $t('nav.donate') }}</b-nav-item>
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