<template>
  <section>
    <b-row class="mb-5">
      <b-col cols="12" lg="4" class="mb-lg-0 mb-5">
        <h3 class="font-weight-bold underline">{{ $t('donate.makeDonation') }}</h3>
        <b-card class="shadow-sm p-3 text-center">
          <a href="https://bit.ly/2SWWTOD" target="_blank"><b-img class="mb-3" fluid src="@/assets/img/page/qr-code-paypal.svg" /></a>
          <b-button size="lg" href="https://bit.ly/2SWWTOD" target="_blank" block variant="warning" class="text-white font-weight-bold mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
              <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.695.695 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.217.124.4.27.548.438.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.873.873 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.352.352 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214Z"/>
            </svg>{{ $t('nav.donate') }}
          </b-button>
          <p class="small mb-0">{{ $t('donate.opportunity') }}</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4" class="mb-lg-0 mb-5">
        <h3 class="font-weight-bold underline">{{ $t('main.description') }}</h3>
        <p><span class="lead">{{ $t('donate.title1') }}.</span><br>{{ $t('donate.donateDesc1') }}</p>
          <b-img class="mb-3" fluid src="@/assets/img/page/et-battery-h.svg" />
        <p class="mb-0">{{ $t('donate.donateDesc2') }}</p>
      </b-col>
      <b-col cols="12" lg="4" class="mb-lg-0">
        <h3 class="font-weight-bold underline">{{ $t('donate.whoDonated') }}</h3>
        <b-list-group class="shadow-sm">
          <b-list-group-item class="text-dark" variant="light" v-for="donate in donates" :key="donate.name">
            <div class="d-flex w-100 justify-content-between align-items-center">
            <b-icon icon="heart" class="mr-2" />
            <span class="w-100 font-weight-bold text-warning">{{ donate.name }}</span>
            <b-badge class="w-25"><h6 class="font-weight-bold mb-0">{{ donate.amount }} €</h6></b-badge>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <h3 class="font-weight-bold underline">{{ $t('donate.title2') }}</h3>
    <b-row>
      <b-col cols="12" lg="4" class="mb-lg-0 mb-5">
        <b-img class="mb-3 shadow-sm" rounded fluid src="@/assets/img/page/donate-1.jpg" />
          <b-list-group-item variant="warning" class="shadow-sm rounded text-dark">
            <h6 class="font-weight-bold mb-0">{{ $t('donate.donate1') }}</h6>
          </b-list-group-item>
      </b-col>
      <b-col cols="12" lg="4" class="mb-lg-0 mb-5">
        <b-img class="mb-3 shadow-sm" rounded fluid src="@/assets/img/page/donate-2.jpg" />
          <b-list-group-item variant="warning" class="shadow-sm rounded text-dark">
            <h6 class="font-weight-bold mb-0">{{ $t('donate.donate2') }}</h6>
          </b-list-group-item>
      </b-col>
      <b-col cols="12" lg="4">
        <b-img class="mb-3 shadow-sm" rounded fluid src="@/assets/img/page/donate-3.jpg" />
          <b-list-group-item variant="warning" class="shadow-sm rounded text-dark">
            <h6 class="font-weight-bold mb-0">{{ $t('donate.donate3') }}</h6>
          </b-list-group-item>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  head() { return { title: this.$t("nav.donate"), } },
  data() {
    return {
      donates: [
        { "name": "Pavel", "amount": 1 },
        { "name": "Vitali", "amount": 25 },
        { "name": "Devid", "amount": 5 },
        { "name": "Ivan", "amount": 5 },
        { "name": "Kirill", "amount": 5 },
        { "name": "Tim Bud", "amount": 15 },
        { "name": "Evgeny", "amount": 10 },
        { "name": "Pavlo", "amount": 5 },
        { "name": "Marek", "amount": 25 },
        { "name": "Oksana", "amount": 111 },
        { "name": "Andrei Rotar", "amount": 100 },
        { "name": "Anton", "amount": 20 },
      ]
    };
  }
}
</script>

<style scoped>

</style>
