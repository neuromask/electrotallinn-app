<template>
    <b-navbar type="primary" variant="info" class="px-3 pt-2 rounded shadow-sm" sticky>
      <b-navbar-nav>
          <b-nav-item to="/" nuxt exact><b-icon icon="house-door-fill"></b-icon></b-nav-item>
          <b-nav-item to="/map" nuxt>Map</b-nav-item>
          <b-nav-item to="/market" disabled nuxt>Market</b-nav-item>
          <b-nav-item to="/users" nuxt>Users</b-nav-item>
          <b-nav-item to="/help" nuxt>Help</b-nav-item>
      </b-navbar-nav>
  </b-navbar>
</template>
<style scoped>
</style>
