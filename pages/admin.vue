<template>
  <section>
    <b-navbar type="primary" class="mb-lg-5 mb-3">
      <b-navbar-nav class="mx-auto text-center">
        <b-nav-item to="/admin" nuxt exact>Board</b-nav-item>
        <b-nav-item to="/admin/locations" nuxt>Locations</b-nav-item>
        <b-nav-item to="/admin/market-products" nuxt>Market</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <NuxtChild />
  </section>
</template>
