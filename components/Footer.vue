<template>
  <footer>
    <client-only><cookie-law :buttonText="$t('main.cookieBtn')" :message="`🍪 ${$t('main.cookieText')}`" theme="et"></cookie-law></client-only>
    <b-container class="pb-2 px-5 border-0">
      <b-row>
        <b-col cols="12" lg="4" class="my-3 d-flex justify-content-start align-items-center">
          <div class="pr-lg-5">
            <p class="small text-justify">
              <b-img-lazy block left width="64" height="64" class="mr-3" fluid src="~/assets/img/logo/circle.svg" />
              {{ $t('main.goalText') }}
            </p>
            <SocialLinks />
          </div>
        </b-col>
        <b-col cols="12" lg="4" class="my-3 d-flex justify-content-center align-items-center">
          <Menu />
        </b-col>
        <b-col cols="12" lg="4" class="my-3 d-flex justify-content-center align-items-center">
          <Copyright />
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script></script>