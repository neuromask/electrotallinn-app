<template>
    <div>
        <b-navbar type="dark" variant="light" class="mb-4 px-3 pt-2">
            <b-navbar-nav>
                <b-nav-item to="/" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
                <b-nav-item to="/help/bot-commands" nuxt exact>Bot</b-nav-item>
                <b-nav-item to="/help/map-help" nuxt exact>Map</b-nav-item>
                <b-nav-item to="/help/market-help" nuxt exact>Market</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    <NuxtChild  />
  </div>
</template>
