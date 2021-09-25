<template>
    <div>
        <b-navbar type="secondary" variant="info" class="mb-5 p-3" sticky>
            <b-navbar-nav>
                <b-nav-item to="/" nuxt exact><b-icon icon="house-door-fill"></b-icon></b-nav-item>
                <b-nav-item to="/help/map-help" nuxt>Map Help</b-nav-item>
                <b-nav-item to="/help/market-help" nuxt>Market help</b-nav-item>
                <b-nav-item to="/help/profile-help" nuxt>Profile help</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-button v-b-toggle.sidebar-variant class="mr-3"><b-icon-list></b-icon-list></b-button>
            </b-navbar-nav>
        </b-navbar>
    <NuxtChild  />
  </div>
</template>