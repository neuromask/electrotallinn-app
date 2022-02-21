<template>
  <div>
    <b-navbar type="primary" class="mb-5">
      <b-navbar-nav class="mx-auto text-center">
        <b-nav-item :to="localePath('/game/minecraft')" nuxt exact>{{ $t('nav.minecraft') }}</b-nav-item>
        <b-nav-item :to="localePath('/game/slot')" nuxt>{{ $t('nav.slot') }}</b-nav-item>
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