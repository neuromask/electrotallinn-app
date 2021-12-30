<template>
    <div>
      <b-navbar type="secondary" class="my-3">
        <b-navbar-nav>
          <b-nav-item :to="localePath('/')" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
          <b-nav-item :to="localePath('/users')" nuxt exact>{{ $t('nav.profiles') }}</b-nav-item>
          <b-nav-item :to="localePath('/users/ranks')" nuxt>{{ $t('nav.ranks') }}</b-nav-item>
          <b-nav-item v-if="$user.isLogged" :to="localePath(`/users/${$user.uin}#submenu`)" nuxt>{{ $t('nav.myProfile') }}</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <NuxtChild />
    </div>
</template>
<script>
export default {
  head() { return { title: this.$t("nav.users"), } }
}
</script>