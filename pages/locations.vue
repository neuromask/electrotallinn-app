<template>
    <div>
    <b-navbar type="secondary" variant="info" class="mb-4 p-3" sticky>
        <b-navbar-nav>
            <b-nav-item><NuxtLink to="/" exact>Home</NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/locations/ranks">Ranks</NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/locations/help">Help</NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/locations/admin">Admin</NuxtLink></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <b-button v-b-toggle.sidebar-variant class="mr-3"><b-icon-list></b-icon-list></b-button>
        </b-navbar-nav>
    </b-navbar>
    <NuxtChild  />
  </div>
</template>