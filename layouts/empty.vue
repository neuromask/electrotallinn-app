<template>
  <div id="app">
    <Sidebar />
    <div class="navWrap"><NavBar /></div>
    <main>
      <div class="fullScreen"><Nuxt /></div>
    </main>
  </div>
</template>
<style scoped>
main {
  height:100%;
}
.navWrap {
  position: fixed;
  height: 48px;
  width: 100%;
  z-index: 1;
}
.fullScreen {
  height:calc(100% - 48px);
  position: absolute;
  top:48px; left:0;
  width:100%;
}
</style>
