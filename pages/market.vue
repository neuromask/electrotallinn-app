<template>
  <div>
    <b-navbar type="primary" class="mb-5">
      <b-navbar-nav class="mx-auto text-center">
        <b-nav-item :to="localePath('/market')" nuxt exact>{{ $t('nav.market') }}</b-nav-item>
        <b-nav-item :to="localePath(`/users/${$user.uin}/products#submenu`)" v-if="this.$user.isLogged">{{ $t('nav.myProducts') }}</b-nav-item>
      </b-navbar-nav>
        <!--<b-navbar-nav class="ml-auto text-right">
            <b-button variant="outline-secondary" v-if="$nuxt.$route.path == '/market'" size="sm" v-b-toggle.menuOptions>Menu <b-icon icon="list" /></b-button>
        </b-navbar-nav>-->
    </b-navbar>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  head() { return { title: this.$t("nav.market"), } }
}
</script>