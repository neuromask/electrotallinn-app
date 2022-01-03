<template>
  <section>
    <b-navbar type="primary" class="mb-lg-5 mb-3">
      <b-navbar-nav class="mx-auto text-center">
        <b-nav-item :to="localePath('/market')" nuxt exact>{{ $t('nav.products') }}</b-nav-item>
        <b-nav-item :to="localePath(`/users/${$user.uin}/products#submenu`)" v-if="this.$user.isLogged">{{ $t('nav.myProducts') }}</b-nav-item>
      </b-navbar-nav>
        <!--<b-navbar-nav class="ml-auto text-right">
            <b-button variant="outline-secondary" v-if="$nuxt.$route.path == '/market'" size="sm" v-b-toggle.menuOptions>Menu <b-icon icon="list" /></b-button>
        </b-navbar-nav>-->
    </b-navbar>
    <NuxtChild />
  </section>
</template>

<script>
export default {
  head() { return { title: this.$t("nav.market"), } }
}
</script>