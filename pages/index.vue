<template>
  <section>
    <b-row class="mt-3">
      <b-col cols="12" lg="4" class="p-3">
        <UserProfileBox />
        <b-card>
          <h3 class="font-weight-bold">
            <b-badge variant="warning" class="text-white">Bot</b-badge> Chat
          </h3>

          <h5 class="my-3">Open <a href="https://telegram.org/" target="_blank"><strong>Telegram</strong></a> app and start chat with <a href="https://t.me/electrotallinnbot" target="_blank"><strong>ElectroBot</strong></a>.</h5>
          <a href="https://t.me/electrotallinnbot" target="_blank">
            <b-img class="card-img " rounded="circle" :src="require('@/assets/img/bot-avatar.svg')"></b-img>
          </a>
        </b-card>
      </b-col>
      <b-col cols="12" lg="8" class="p-3">
        <b-card>
          <h3 class="font-weight-bold">
            <b-badge variant="warning" class="text-white">Bot</b-badge> Commands
          </h3>

          <h5 class="my-3">Add points to the <NuxtLink to="/map"><strong>map</strong></NuxtLink> and products to the <NuxtLink to="/market"><strong>market</strong></NuxtLink>.</h5>
          <b-list-group>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/sell</strong></kbd> - Sell product on market</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/add</strong></kbd> - Add point to map</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/map</strong></kbd> - Charging sockets map</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/market</strong></kbd> - Market page</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/weather</strong></kbd> - Weather forecast</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/ali</strong></kbd> - Aliexpress links</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/help</strong></kbd> - List of commands</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/social</strong></kbd> - Social media links</b-list-group-item>
            <b-list-group-item class="text-dark" variant="primary"><kbd><strong>/pic</strong></kbd> - Search for image</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
        <b-col cols="12" lg="4" class="p-3">
            <b-card img-alt="Image" img-top class="p-3">
                <h3 class="font-weight-bold mb-4">
                    <b-badge variant="warning" class="text-white">Deals</b-badge> Market
                    <b-icon class="info-icon-tip" id="marketInfo" variant="primary" icon="info-circle-fill"></b-icon>
                </h3>
                <b-popover ref="popover" target="marketInfo" triggers="hover" title="Buy & Sell">
                    Sell and buy stuff related to electric transport area.
                </b-popover>
                <NuxtLink to="/market"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-market.svg')"></b-card-img></NuxtLink>
            </b-card>
        </b-col>
        <b-col cols="12" lg="4" class="p-3">
            <b-card img-alt="Image" img-top class="p-3">
                <h3 class="font-weight-bold mb-4">
                    <b-badge variant="warning" class="text-white">Charging</b-badge> Map
                    <b-icon class="info-icon-tip" id="mapInfo" variant="primary" icon="info-circle-fill"></b-icon>
                </h3>
                <b-popover ref="popover" target="mapInfo" triggers="hover" title="Charge & Repair Map">
                    Map showing the locations of outlets for charging, repair in accessible places.
                </b-popover>
                <NuxtLink to="/map"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-map.svg')"></b-card-img></NuxtLink>
            </b-card>
        </b-col>
        <b-col cols="12" lg="4" class="p-3">
            <b-card img-alt="Image" img-top class="p-3">
                <h3 class="font-weight-bold mb-4">
                    <b-badge variant="warning" class="text-white">User</b-badge> Profiles
                    <b-icon class="info-icon-tip" id="usersInfo" variant="primary" icon="info-circle-fill"></b-icon>
                </h3>
                <b-popover ref="popover" target="usersInfo" triggers="hover" title="User list of ElectroTallinn">
                    Profiles of ElectroPeople team. Let's know each other closer.
                </b-popover>
                <NuxtLink to="/users"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-user.svg')"></b-card-img></NuxtLink>
            </b-card>
        </b-col>
    </b-row>
  </section>
</template>

<script>
export default {}
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
