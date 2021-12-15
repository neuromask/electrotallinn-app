<template>
    <div>
        <b-navbar type="primary" class="my-3">
            <b-navbar-nav>
                <b-nav-item :to="localePath('/')" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
                <b-nav-item :to="localePath('/market')" nuxt exact>{{ $t('nav.products') }}</b-nav-item>
                <b-nav-item :to="localePath(`/users/${$user.uin}/products`)" v-if="this.$user.isLogged">{{ $t('nav.myProducts') }}</b-nav-item>
            </b-navbar-nav>
            <!--<b-navbar-nav class="ml-auto text-right">
                <b-button variant="outline-secondary" v-if="$nuxt.$route.path == '/market'" size="sm" v-b-toggle.menuOptions>Menu <b-icon icon="list" /></b-button>
            </b-navbar-nav>-->
        </b-navbar>
        <NuxtChild  />
    </div>
</template>