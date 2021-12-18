<template>
    <section>
        <b-navbar type="dark" variant="light" class="mb-4 px-3 pt-2">
            <b-navbar-nav>
                <b-nav-item to="/" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
                <b-nav-item to="/admin" nuxt exact>Board</b-nav-item>
                <b-nav-item to="/admin/locations" nuxt>Locations</b-nav-item>
                <b-nav-item to="/admin/market-products" nuxt>Market</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <NuxtChild />
    </section>
</template>
