<template>
    <b-navbar justified type="primary" variant="info" class="px-3 pt-2 rounded shadow-sm" sticky>
        <b-navbar-nav justified class="mx-auto text-center main-nav">
            <b-nav-item to="/" nuxt exact><b-icon icon="house-door-fill" /><span class="navText">Home</span></b-nav-item>
            <b-nav-item to="/map" nuxt><b-icon icon="geo-alt-fill" /><span class="navText">Map</span></b-nav-item>
            <b-nav-item to="/market" nuxt><b-icon icon="basket2-fill" /><span class="navText">Market</span></b-nav-item>
            <b-nav-item to="/users" nuxt><b-icon icon="person-fill" /><span class="navText">Users</span></b-nav-item>
            <b-nav-item to="/help" nuxt><b-icon icon="info-circle-fill" /><span class="navText">Help</span></b-nav-item>
            <b-nav-item v-if="$user.role === 'ADMIN'" to="/admin" nuxt><b-icon icon="shield-lock-fill" /><span class="navText">Admin</span></b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>
<style scoped>
</style>
