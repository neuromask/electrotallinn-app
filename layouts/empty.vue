<template>
  <div id="app">
    <Sidebar />
    <main>
      <div class="navWrap"><NavBar /></div>
      <div class="fullScreen"><Nuxt /></div>
    </main>
  </div>
</template>
<style scoped>
main {
  display: flex;
  flex-flow: column;
  height:100vh;
}
.navWrap {
  flex:0 1 48px; 
  height: 100%;
}
.fullScreen {
  flex:1 1 auto
}
</style>
