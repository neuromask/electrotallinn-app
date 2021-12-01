<template>
    <section>
        <b-navbar type="dark" variant="light" class="mb-4 px-3 pt-2">
            <b-navbar-nav>
                <b-nav-item to="/" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
                <b-nav-item to="/users" nuxt exact>Profiles</b-nav-item>
                <b-nav-item to="/users/ranks" nuxt>Ranks</b-nav-item>
                <b-nav-item v-if="$user.isLogged" :to="`/users/${$user.uin}`" nuxt>Your Profile</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <NuxtChild />
    </section>
</template>
