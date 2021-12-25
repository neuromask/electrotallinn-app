<template>
    <div>
        <b-navbar type="primary" class="my-3">
            <b-navbar-nav>
                <b-nav-item :to="localePath('/')" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
                <b-nav-item :to="localePath('/game')" nuxt exact>{{ $t('nav.game') }}</b-nav-item>
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