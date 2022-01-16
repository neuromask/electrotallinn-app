<template>
  <div>
    <b-navbar type="primary" class="mb-5">
      <b-navbar-nav class="mx-auto text-center">
        <b-nav-item :to="localePath('/blog')" nuxt exact>{{ $t('nav.articles') }}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <NuxtChild />
  </div>
</template>
<script>
export default {
  head() { return { title: this.$t("nav.blog") } }
}
</script>