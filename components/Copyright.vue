<template>
  <div>
    <div class="mb-2 text-center">
      <a href="https://vuejs.org" target="_blank"><b-img-lazy width="32" height="32" alt="VueJS" class="d-inline-block mx-1" src="~/assets/img/logo/vuejs-logo.svg" /></a>
      <a href="https://nuxtjs.org" target="_blank"><b-img-lazy width="32" height="32" alt="NuxtJS" class="d-inline-block mx-1" src="~/assets/img/logo/nuxt-logo.svg" /></a>
      <a href="https://getbootstrap.com" target="_blank"><b-img-lazy width="32" height="32" alt="Bootstrap Vue" class="d-inline-block mx-1" src="~/assets/img/logo/bootstrap-logo.svg" /></a>
      <a href="https://nuforms.com" target="_blank"><b-img-lazy width="32" height="32" alt="Nuforms Design" class="d-inline-block mx-1" src="~/assets/img/logo/nuforms-logo.svg" /></a>
      <a href="https://github.com/neuromask/electrotallinn-app" target="_blank"><b-img-lazy width="32" height="32" alt="GitHub" class="d-inline-block mx-1" src="~/assets/img/logo/github-logo.svg" /></a>
    </div>
    <p class="text-center small mb-0 font-weight-bold"><b-icon icon="heart" class="mr-2" /><nuxt-link :to="localePath('/donate')">{{ $t('donate.makeDonation') }}</nuxt-link></p>
    <p class="text-center small mb-0">Crafted with <a class="font-weight-bold" href="https://nuxtjs.org/" target="_blank">Nuxt</a> by Leo & <a class="font-weight-bold" href="https://nuforms.com/" target="_blank">Nuforms</a></p>
    <p class="text-center small mb-0">Copyright © 2022 <strong>ElectroTallinn</strong></p>
  </div>
</template>

<script></script>
