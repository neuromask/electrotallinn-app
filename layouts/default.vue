<template>
  <div id="app">
    <Sidebar />
    
    <main>
      <Banner />
      <b-container class="bg-light mt-4 p-5 main-container">
        <Nuxt />
      </b-container>
    </main>
    <footer>
      <client-only><cookie-law theme="et"></cookie-law></client-only>
      <Bottom />
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main-container {
  background: url('~/assets/img/tallinn-white.svg') center bottom no-repeat;
  padding-bottom: 10rem!important;
}
</style>