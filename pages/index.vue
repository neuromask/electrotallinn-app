<template>
  <section>
    <!-- <h3 class="underline font-weight-bold mt-3">{{ $t('nav.home') }}</h3> -->
    <b-row class="mt-5">
      <b-col cols="12" lg="4" class="pb-3">
        <h3 class="font-weight-bold underline">{{ $t('main.chat') }}</h3>
        <i18n path="main.textChat" tag="h5" class="my-3">
          <a href="https://telegram.org/" target="_blank"><strong>Telegram</strong></a>
          <a href="https://t.me/electrotallinnbot" target="_blank"><strong>ElectroBot</strong></a>
        </i18n>
        <b-card bg-variant="info mb-3">
          <a href="https://t.me/electrotallinnbot" target="_blank">
            <b-img class="card-img " rounded="circle" src="@/assets/img/bot-avatar.svg"></b-img>
          </a>
        </b-card>
        
        <UserProfileBox />
      </b-col>
      <b-col cols="12" lg="8">
        <h3 class="font-weight-bold underline">{{ $t('main.commands') }}</h3>
        <i18n path="main.textCommands" tag="h5" class="my-3">
          <NuxtLink :to="localePath('/map')"><strong>{{ $t('main.textMap') }}</strong></NuxtLink>
          <NuxtLink :to="localePath('/market')"><strong>{{ $t('main.textMarket') }}</strong></NuxtLink>
        </i18n>
        <b-list-group>
          <b-list-group-item class="text-dark" variant="light"><kbd><strong>/sell</strong></kbd> - {{ $t('main.sell') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><kbd><strong>/add</strong></kbd> - {{ $t('main.add') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><kbd><strong>/map</strong></kbd> - {{ $t('main.map') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><kbd><strong>/market</strong></kbd> - {{ $t('main.market') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><kbd><strong>/weather</strong></kbd> - {{ $t('main.weather') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><kbd><strong>/ali</strong></kbd> - {{ $t('main.ali') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><kbd><strong>/help</strong></kbd> - {{ $t('main.help') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><kbd><strong>/social</strong></kbd> - {{ $t('main.social') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><kbd><strong>/pic</strong></kbd> - {{ $t('main.pic') }}</b-list-group-item>
          <b-list-group-item class="text-dark" variant="light"><kbd><b-icon icon="geo-alt-fill" /></kbd> - {{ $t('main.nearest') }}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row class="bg-warning full-row mt-5">
      <b-col cols="12" class="p-5 text-white">
        <h4 class="text-center font-weight-bold mb-0">{{ $t('meta.description') }}</h4>
      </b-col>
    </b-row>
    <b-row class="bg-lightning full-row p-lg-5 p-0 pt-5">
      <b-col cols="12" lg="6" class="mb-3">
        <b-card img-alt="Image" img-top class="p-3 mb-lg-3">
          <h3 class="font-weight-bold mb-4">{{ $t('main.titleMarket') }}<b-icon class="info-icon-tip" id="marketInfo" variant="primary" icon="info-circle-fill"></b-icon></h3>
          <b-popover ref="popover" target="marketInfo" triggers="hover" :title="$tc('main.descMarket', 1)">{{ $tc('main.descMarket', 2) }}</b-popover>
          <NuxtLink :to="localePath('/market')"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-market.svg')"></b-card-img></NuxtLink>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
          <b-card img-alt="Image" img-top class="p-3">
            <h3 class="font-weight-bold mb-4">{{ $t('main.titleMap') }}<b-icon class="info-icon-tip" id="mapInfo" variant="primary" icon="info-circle-fill"></b-icon></h3>
            <b-popover ref="popover" target="mapInfo" triggers="hover" :title="$tc('main.descMap', 1)">{{ $tc('main.descMap', 2) }}</b-popover>
            <NuxtLink :to="localePath('/map')"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-map.svg')"></b-card-img></NuxtLink>
          </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
        <b-card img-alt="Image" img-top class="p-3">
          <h3 class="font-weight-bold mb-4">{{ $t('main.titleGame') }}<b-icon class="info-icon-tip" id="gameInfo" variant="primary" icon="info-circle-fill"></b-icon></h3>
          <b-popover ref="popover" target="gameInfo" triggers="hover" :title="$tc('main.descGame', 1)">{{ $tc('main.descGame', 2) }}</b-popover>
          <NuxtLink :to="localePath('/game')"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-game.svg')"></b-card-img></NuxtLink>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
        <b-card img-alt="Image" img-top class="p-3">
          <h3 class="font-weight-bold mb-4">{{ $t('main.titleProfiles') }}<b-icon class="info-icon-tip" id="usersInfo" variant="primary" icon="info-circle-fill"></b-icon></h3>
          <b-popover ref="popover" target="usersInfo" triggers="hover" :title="$tc('main.descProfiles', 1)">{{ $tc('main.descProfiles', 2) }}</b-popover>
          <NuxtLink :to="localePath('/users')"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-user.svg')"></b-card-img></NuxtLink>
        </b-card>
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
