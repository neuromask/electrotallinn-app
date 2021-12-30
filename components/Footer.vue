<template>
  <footer>
    <client-only><cookie-law :buttonText="$t('main.cookieBtn')" :message="`🍪 ${$t('main.cookieText')}`" theme="et"></cookie-law></client-only>
    <b-container class="pb-2 px-5 border-0">
      <b-row>
        <b-col cols="12" lg="4" class="my-1 text-left d-flex justify-content-center align-items-center">
          <SocialLinks />
        </b-col>
        <b-col cols="12" lg="4" class="my-1">
          <BotButton />
        </b-col>
        <b-col cols="12" lg="4" class="my-1 d-flex justify-content-center align-items-center">
          <p class="text-center small m-0">
            Copyright © 2021 <strong>ElectroTallinn</strong><br/>
            Crafted by Leo & <a href="https://nuforms.com/" target="_blank">Nuforms Design</a>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script></script>