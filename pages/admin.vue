<template>
    <section>
        <b-navbar type="dark" variant="light" class="mb-4 px-3 pt-2" sticky>
            <b-navbar-nav>
                <b-nav-item to="/" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
                <b-nav-item to="/admin" nuxt exact>Dashboard</b-nav-item>
                <b-nav-item to="/admin/locations" nuxt exact>Locations</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <NuxtChild />
    </section>
</template>
