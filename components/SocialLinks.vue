<template>
  <div class="social-links d-flex justify-content-center align-items-center">
    <a href="https://www.facebook.com/groups/electrotallinn" target="_blank"><b-icon icon="facebook"></b-icon></a>
    <a href="https://www.instagram.com/electrotallinn/" target="_blank"><b-icon icon="instagram"></b-icon></a>
    <a href="https://www.youtube.com/electrotallinn" target="_blank"><b-icon icon="youtube"></b-icon></a>
    <a href="https://discord.io/electrotallinn" target="_blank"><b-icon icon="discord"></b-icon></a>
    <a href="https://www.flickr.com/photos/electrotallinn/" target="_blank"><b-icon icon="camera-fill"></b-icon></a>
    <a href="https://t.me/electrotallinn" target="_blank"><div v-html="require('~/assets/icons/bootstrap/telegram.svg?raw')" /></a>
  </div>
</template>

<style scoped>
.social-links a {
  width: 32px;
  height: 32px;
  display: inline-block;
  border-radius: 20%;
  background: #ffffff;
  color:#4482a9;
  padding: 4px;
  margin: 0 0.4rem;
}
.social-links a:hover {
  background-color: #c0d1e6;
  transition: background-color 0.4s ease-out;
  transition: color 0.4s ease-out;
  color:rgba(26, 39, 64,1);
}
.social-links .bi,
.social-links a svg {
  width: 100% !important;
  height: 100% !important;
}
</style>