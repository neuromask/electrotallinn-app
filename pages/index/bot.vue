<template>
  <section>
    <b-row>
      <b-col cols="12" lg="4" class="pb-3">
        <h3 class="font-weight-bold underline">{{ $t('main.chat') }}</h3>
        <i18n path="main.textChat" tag="h5" class="my-3">
          <a href="https://telegram.org/" target="_blank"><strong>Telegram</strong></a>
          <a href="https://t.me/electrotallinnbot" target="_blank"><strong>ElectroBot</strong></a>
        </i18n>
        <b-card class="shadow-sm">
          <b-img role="button" class="card-img" rounded="circle" href="https://t.me/electrotallinnbot" target="_blank" src="@/assets/img/logo/bot-avatar.svg" />
        </b-card>
      </b-col>
      <b-col cols="12" lg="8">
        <h3 class="font-weight-bold underline">{{ $t('main.commands') }}</h3>
        <i18n path="main.textCommands" tag="h5" class="my-3">
          <NuxtLink :to="localePath('/map')"><strong>{{ $t('main.textMap') }}</strong></NuxtLink>
          <NuxtLink :to="localePath('/market')"><strong>{{ $t('main.textMarket') }}</strong></NuxtLink>
        </i18n>
        <b-list-group class="shadow-sm">
          <b-list-group-item class="text-dark" variant="light"><h5 class="d-inline"><b-badge><strong>/sell</strong></b-badge></h5> - {{ $t('main.sell') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><h5 class="d-inline"><b-badge><strong>/add</strong></b-badge></h5> - {{ $t('main.add') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><h5 class="d-inline"><b-badge><strong>/map</strong></b-badge></h5> - {{ $t('main.map') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><h5 class="d-inline"><b-badge><strong>/market</strong></b-badge></h5> - {{ $t('main.market') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><h5 class="d-inline"><b-badge><strong>/weather</strong></b-badge></h5> - {{ $t('main.weather') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><h5 class="d-inline"><b-badge><strong>/ali</strong></b-badge></h5> - {{ $t('main.ali') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><h5 class="d-inline"><b-badge><strong>/help</strong></b-badge></h5> - {{ $t('main.help') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><h5 class="d-inline"><b-badge><strong>/social</strong></b-badge></h5> - {{ $t('main.social') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><h5 class="d-inline"><b-badge><strong>/pic</strong></b-badge></h5> - {{ $t('main.pic') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><b-badge><b-icon font-scale="1.5" icon="geo-alt-fill" /></b-badge> - {{ $t('main.nearest') }}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  head() { return { title: this.$t("nav.home"), } }
}
</script>

<style scoped>
.card-body {
    position: relative;
}
.card-img {
  border-radius: 20%;
  border: 1rem solid #c0d1e6;;
}
.card-img:focus,
.card-img:hover {
  border-radius: 20%;
  border: 1rem solid #4482a9;
  transition: border-color 0.4s ease-out;
}
.info-icon-tip {
    float:right;
    width: 32px;
    height: 32px;
}
</style>
