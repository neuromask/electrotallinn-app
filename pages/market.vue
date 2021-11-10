<template>
    <div>
        <b-navbar type="dark" variant="light" class="mb-4 px-3 pt-2" sticky>
            <b-navbar-nav>
                <b-nav-item to="/" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
                <b-nav-item to="/market" nuxt exact>Products</b-nav-item>
                <b-nav-item to="/market/add-product" nuxt>Add Product</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    <NuxtChild  />
  </div>
</template>