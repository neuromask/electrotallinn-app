<template>
  <footer>
    <client-only><cookie-law :buttonText="$t('main.cookieBtn')" :message="`🍪 ${$t('main.cookieText')}`" theme="et"></cookie-law></client-only>
    <b-container class="pb-2 px-5 border-0">
      <b-row>
        <b-col cols="12" lg="4" class="mt-4">
          <!-- <b-img-lazy block center width="64" height="64" class="mb-3" fluid src="~/assets/img/logo/circle.svg" /> -->
          <SocialLinks class="mb-3" />
          <p class="small text-center"> {{ $t('main.goalText') }}</p>
        </b-col>
        <b-col cols="12" lg="4" class="my-3">
          <Menu />
        </b-col>
        <b-col cols="12" lg="4" class="my-3">
          <Copyright />
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script></script>