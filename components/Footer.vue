<template>
  <footer>
    <client-only><cookie-law :buttonText="$t('main.cookieBtn')" :message="`🍪 ${$t('main.cookieText')}`" theme="et"></cookie-law></client-only>
    <b-container class="pb-2 px-5 border-0">
      <b-row>
        <b-col cols="12" lg="4" class="my-3 d-flex justify-content-center align-items-center">
          <div>
            <p><b-img-lazy block left class="w-25 mr-2" fluid src="~/assets/img/circle.svg" />{{ $t('main.goalText') }}</p>
            <BotButton />
          </div>
        </b-col>
        <b-col cols="12" lg="4" class="my-3 d-flex justify-content-center align-items-center">
          <div>
            <div class="mb-2"><Copyright /></div>
            <SocialLinks />
          </div>
        </b-col>
        <b-col cols="12" lg="4" class="my-3">
          <div class="ml-auto w-75"><Menu /></div>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script></script>