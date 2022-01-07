<template>
  <div>
    <p class="text-center small m-0 font-weight-bold"><b-icon icon="heart" class="mr-2" /><nuxt-link class="text-primary" :to="localePath('/donate')">{{ $t('donate.makeDonation') }}</nuxt-link></p>
    <p class="text-center small my-1">Crafted with Nuxt <b-img-lazy block center class="w-25" fluid src="~/assets/img/nuxt-logo.svg" /> by Leo & <a class="text-primary font-weight-bold" href="https://nuforms.com/" target="_blank">Nuforms</a></p>
    <p class="text-center small m-0">Copyright © 2022 <strong>ElectroTallinn</strong></p>
  </div>
</template>

<script></script>
