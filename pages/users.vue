<template>
    <div>
        <b-navbar type="primary" variant="info" class="px-3 pt-3" sticky>
            <b-navbar-nav>
                <b-nav-item to="/" nuxt exact><b-icon icon="house-door-fill"></b-icon></b-nav-item>
                <b-nav-item to="/map" nuxt>Map</b-nav-item>
                <b-nav-item to="/market" disabled nuxt>Market</b-nav-item>
                <b-nav-item to="/users" nuxt>Users</b-nav-item>
                <b-nav-item to="/help" nuxt>Help</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <b-navbar type="secondary" variant="info" class="mb-4 px-3 pb-3" sticky>
            <b-navbar-nav>
                <b-nav-item to="/users" nuxt exact>Profiles</b-nav-item>
                <b-nav-item to="/users/ranks" nuxt>Ranks</b-nav-item>
                <b-nav-item v-if="$user.isLogged" :to="`/users/${$user.uin}`" nuxt>Your Profile</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    <NuxtChild  />
  </div>
</template>