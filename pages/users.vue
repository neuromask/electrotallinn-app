<template>
    <section>
        <b-navbar type="dark" variant="light" class="mb-4 px-3 pt-2">
            <b-navbar-nav>
                <b-nav-item :to="localePath('/')" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
                <b-nav-item :to="localePath('/users')" nuxt exact>{{ $t('nav.profiles') }}</b-nav-item>
                <b-nav-item :to="localePath('/users/ranks')" nuxt>{{ $t('nav.ranks') }}</b-nav-item>
                <b-nav-item v-if="$user.isLogged" :to="localePath(`/users/${$user.uin}`)" nuxt>{{ $t('nav.yourProfile') }}</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <NuxtChild />
    </section>
</template>
