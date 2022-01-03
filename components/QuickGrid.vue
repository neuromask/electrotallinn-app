<template>
  <div class="bdr">
     <b-col cols="12" lg="6" class="mb-3">
        <b-card img-alt="Image" img-top class="shadow-sm p-3 mb-lg-3">
          <h3 class="font-weight-bold mb-4">{{ $t('main.titleMarket') }}<b-icon class="info-icon-tip" id="marketInfo" variant="primary" icon="info-circle-fill" /></h3>
          <b-popover ref="popover" target="marketInfo" triggers="hover" :title="$tc('main.descMarket', 1)">{{ $tc('main.descMarket', 2) }}</b-popover>
          <NuxtLink :to="localePath('/market')"><b-img class="p-5 bg-dark" :src="require('@/assets/img/home/home-market.svg')"></b-img></NuxtLink>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
          <b-card img-alt="Image" img-top class="shadow-sm p-3">
            <h3 class="font-weight-bold mb-4">{{ $t('main.titleMap') }}<b-icon class="info-icon-tip" id="mapInfo" variant="primary" icon="info-circle-fill" /></h3>
            <b-popover ref="popover" target="mapInfo" triggers="hover" :title="$tc('main.descMap', 1)">{{ $tc('main.descMap', 2) }}</b-popover>
            <NuxtLink :to="localePath('/map')"><b-img class="p-5 bg-dark" :src="require('@/assets/img/home/home-map.svg')"></b-img></NuxtLink>
          </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
        <b-card img-alt="Image" img-top class="shadow-sm p-3">
          <h3 class="font-weight-bold mb-4">{{ $t('main.titleGame') }}<b-icon class="info-icon-tip" id="gameInfo" variant="primary" icon="info-circle-fill" /></h3>
          <b-popover ref="popover" target="gameInfo" triggers="hover" :title="$tc('main.descGame', 1)">{{ $tc('main.descGame', 2) }}</b-popover>
          <NuxtLink :to="localePath('/game')"><b-img class="p-5 bg-dark" :src="require('@/assets/img/home/home-game.svg')"></b-img></NuxtLink>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
        <b-card img-alt="Image" img-top class="shadow-sm p-3">
          <h3 class="font-weight-bold mb-4">{{ $t('main.titleProfiles') }}<b-icon class="info-icon-tip" id="usersInfo" variant="primary" icon="info-circle-fill" /></h3>
          <b-popover ref="popover" target="usersInfo" triggers="hover" :title="$tc('main.descProfiles', 1)">{{ $tc('main.descProfiles', 2) }}</b-popover>
          <NuxtLink :to="localePath('/users')"><b-img class="p-5 bg-dark" :src="require('@/assets/img/home/home-user.svg')"></b-img></NuxtLink>
        </b-card>
      </b-col>
  </div>
</template>

<script></script>

<style scoped>
.bdr img {
  border-radius: 20%;
  border: 1rem solid #c0d1e6;;
}
.bdr img:hover {
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