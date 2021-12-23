<template>
    <b-navbar type="secondary" variant="info" class="main-nav px-3 pt-2 rounded shadow-sm justify-content-center align-items-start" sticky>
        <div class="position-absolute sideMenu" v-b-toggle.sidebar-variant><a href="#"><b-icon icon="list" /></a></div>
        <div class="lang-select"><LanguageInput /></div>
        <b-navbar-nav justified class="mx-auto text-center main-nav">
            <b-nav-item :to="localePath('/')" nuxt exact><b-icon icon="house-door-fill" /><span class="navText">{{ $t('nav.home') }}</span></b-nav-item>
            <b-nav-item :to="localePath('/market')" nuxt><b-icon icon="basket2-fill" /><span class="navText">{{ $t('nav.market') }}</span></b-nav-item>
            <b-nav-item :to="localePath('/map')" nuxt><b-icon icon="geo-alt-fill" /><span class="navText">{{ $tc('nav.map', 1) }}</span></b-nav-item>
            <b-nav-item :to="localePath('/game')" nuxt><b-icon icon="dice-5-fill" /><span class="navText">{{ $t('nav.game') }}</span></b-nav-item>
            <b-nav-item :to="localePath('/users')" nuxt><b-icon icon="person-fill" /><span class="navText">{{ $t('nav.users') }}</span></b-nav-item>
            <!--<b-nav-item to="/help" nuxt><b-icon icon="info-circle-fill" /><span class="navText">Help</span></b-nav-item>-->
            <!--<b-nav-item v-if="$user.role === 'ADMIN'" to="/admin" nuxt><b-icon icon="shield-lock-fill" /><span class="navText">Admin</span></b-nav-item>-->
        </b-navbar-nav>
    </b-navbar>
</template>
<style scoped>
.main-nav {
    border-top-right-radius: 0!important;
    border-top-left-radius: 0!important;
}
.lang-select {
  position: absolute;
  top: calc(50% - 22px); right: 0;
}
</style>