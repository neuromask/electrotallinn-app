<template>
    <div>
        <b-navbar type="dark" variant="light" class="mb-4 px-3 pt-2" sticky>
            <b-navbar-nav>
                <b-nav-item to="/" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
                <b-nav-item to="/market" nuxt exact>Products</b-nav-item>
                <b-nav-item v-b-modal.product-modal>Add</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto text-right">
                <b-button variant="outline-secondary" v-if="$nuxt.$route.path == '/market'" size="sm" v-b-toggle.sidebar-right>Menu <b-icon icon="list" /></b-button>
            </b-navbar-nav>
        </b-navbar>
        <MarketProductModal />
        <NuxtChild  />
    </div>
</template>