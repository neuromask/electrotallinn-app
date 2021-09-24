<template>
  <div>
    <b-container class="bg-white mt-4 border-0">
    <b-img class="m-0" src="~/assets/img/tallinn.svg" fluid center />
    </b-container>
    <b-container class="bg-light py-3 px-5 border-0">
      <b-row>
        <b-col cols="12" lg="6" class="my-1 social-links d-flex justify-content-center align-items-center">
          <p class="text-center small m-0">
            Copyright © 2021 <strong>ElectroTallinn</strong><br />Crafted by Leo &
            <a href="https://nuforms.com/" target="_blank">Nuforms Design</a>
          </p>
        </b-col>
        <b-col cols="12" lg="6" class="my-1 social-links text-right d-flex justify-content-center align-items-center">
          <a
            class="social-link m-1"
            href="https://www.facebook.com/groups/electrotallinn"
            target="_blank"
          >
            <b-icon icon="facebook"></b-icon>
          </a>
          <a
            class="social-link m-1"
            href="https://www.instagram.com/electrotallinn/"
            target="_blank"
          >
            <b-icon icon="instagram"></b-icon>
          </a>
          <a
            class="social-link m-1"
            href="https://t.me/electrotallinn"
            target="_blank"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
            </svg>
          </a>
          <a
            class="social-link m-1"
            href="https://www.youtube.com/electrotallinn"
            target="_blank"
          >
            <b-icon icon="youtube"></b-icon>
          </a>
          <a
            class="social-link m-1"
            href="https://discord.io/electrotallinn"
            target="_blank"
          >
            <b-icon icon="discord"></b-icon>
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
.logo-bottom {
  width: 32px;
  height: 32px;
  display: inline-block;
}
.social-link {
  width: 32px;
  height: 32px;
  display: inline-block;
  border-radius: 20%;
  background: white;
  padding: 4px;
}
.social-link:hover {
  background: rgba(255,255,255,0.6);
}
.social-link svg {
    width: 100%;
    height: 100%;
  }
  .social-link svg {
    width: 100%;
    height: 100%;
  }
</style>