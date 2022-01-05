<template>
  <section>
    <h2 class="mb-lg-5 mb-3">{{ $t('donate.title1') }}</h2>
    <b-row class="mb-5">
      <b-col cols="12" lg="4" class="pb-3">
        <h3 class="font-weight-bold underline">{{ $t('donate.makeDonation') }}</h3>
        <b-card class="shadow-sm p-3">
          <b-img class="mb-3" role="button" href="https://bit.ly/2SWWTOD" target="_blank" fluid src="@/assets/img/page/qr-code-paypal.svg" />
          <b-img role="button" href="https://bit.ly/2SWWTOD" target="_blank" fluid src="@/assets/img/page/paypal.png" />
          <p class="small mb-0 text-center">{{ $t('donate.opportunity') }}</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4" class="pb-3">
        <h3 class="font-weight-bold underline">{{ $t('main.description') }}</h3>
        <p>{{ $t('donate.donateDesc1') }}</p>
          <b-img class="mb-3" fluid src="@/assets/img/page/et-battery-h.svg" />
        <p>{{ $t('donate.donateDesc2') }}</p>
      </b-col>
      <b-col cols="12" lg="4">
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
    <h2 class="mb-lg-5 mb-3">{{ $t('donate.title2') }}</h2>
    <b-row>
      <b-col cols="12" lg="4" class="pb-3">
        <b-img class="mb-3 shadow-sm" rounded fluid src="@/assets/img/page/donate-1.jpg" />
          <b-list-group-item variant="warning" class="shadow-sm rounded text-dark">
            <h6 class="font-weight-bold mb-0">{{ $t('donate.donate1') }}</h6>
          </b-list-group-item>
      </b-col>
      <b-col cols="12" lg="4" class="pb-3">
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
      ]
    };
  }
}
</script>

<style scoped>

</style>
