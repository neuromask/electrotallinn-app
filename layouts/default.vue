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
    </footer>
  </div>
</template>

<script>
export default {

}
</script>
