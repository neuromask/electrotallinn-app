<template>
  <div id="app">
    <Sidebar />
    <ToastLogin />
    <main>
      <Banner />
      <b-container class="bg-light mt-3 px-5 pt-0 main-container position-relative">
        <NavBar />
        <Nuxt />
      </b-container>
    </main>
    <footer>
      <client-only><cookie-law theme="et"></cookie-law></client-only>
      <Bottom />
    </footer>
  </div>
</template>

<style scoped>
.main-container {
  background: url('~/assets/img/tallinn-white.svg') center bottom no-repeat;
  padding-bottom: 5rem!important;
  min-height: 50vh;
}
</style>