<template>
  <div>
    <b-navbar type="primary" class="mb-lg-5 mb-3">
      <b-navbar-nav class="mx-auto text-center">
        <b-nav-item :to="localePath('/game')" nuxt exact>{{ $t('nav.game') }}</b-nav-item>
        <b-nav-item :to="localePath('/game/score')" nuxt>{{ $t('nav.score') }}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <NuxtChild />
  </div>
</template>
<script>
export default {
  head() { return { title: this.$t("nav.game") } }
}
</script>