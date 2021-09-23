<template>
  <div id="app" :class="{ 'mobile' : $device.isMobile}">
    <Sidebar />
    <main>
      <Banner />
      <b-container class="bg-light mt-4 p-5">
        <Nuxt />
      </b-container>
    </main>
    <footer>
      <client-only><cookie-law theme="et"></cookie-law></client-only>
      <p class="text-center small">Copyright © 2021 – ElectroTallinn<br>Crafted by Leo & <a href="https://nuforms.com/" target="_blank">Nuforms Design</a></p>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>
