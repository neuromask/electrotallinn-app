<template>
    <div>
        <b-navbar type="secondary" variant="info" class="mb-5 p-3" sticky>
            <b-navbar-nav>
                <b-nav-item to="/" nuxt exact><b-icon icon="house-door-fill"></b-icon></b-nav-item>
                <b-nav-item to="/users" nuxt exact>Users</b-nav-item>
                <b-nav-item to="/users/ranks" nuxt>Ranks</b-nav-item>
                <b-nav-item v-if="$user.isLogged" :to="`/users/${$user.uin}`" nuxt>Your Profile</b-nav-item>
                    
            </b-navbar-nav>
            <!--<b-navbar-nav class="ml-auto">
                <b-button v-b-toggle.sidebar-variant><b-icon-list></b-icon-list></b-button>
            </b-navbar-nav>-->
        </b-navbar>

    <NuxtChild  />
  </div>
</template>
