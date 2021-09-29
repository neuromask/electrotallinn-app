<template>
  <section>
    <b-card-group deck>
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

    <b-card img-alt="Image" img-top class="p-3">
        <h3 class="font-weight-bold mb-4">
            <b-badge variant="warning" class="text-white">Deals</b-badge> Market
            <b-icon class="info-icon-tip" id="marketInfo" variant="primary" icon="info-circle-fill"></b-icon>
        </h3>
        <b-popover ref="popover" target="marketInfo" triggers="hover" title="Buy & Sell">
            Sell and buy stuff related to electric transport area.
        </b-popover>
        <b-overlay show spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm">
            <NuxtLink to="#"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-market.svg')"></b-card-img></NuxtLink>
            <template #overlay>
                <div class="text-center">
                <b-icon icon="gear-wide-connected" font-scale="3" animation="spin"></b-icon>
                <p id="cancel-label">Coming soon...</p>
                </div>
            </template>
        </b-overlay>
    </b-card>

    </b-card-group>
    <b-card-group deck class="mt-4">

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

    <b-card img-alt="Image" img-top class="p-3">
        <h3 class="font-weight-bold mb-4">
            <b-badge variant="warning" class="text-white">Info</b-badge> Help
            <b-icon class="info-icon-tip" id="ranksInfo" variant="primary" icon="info-circle-fill"></b-icon>
        </h3>
        <b-popover ref="popover" target="ranksInfo" triggers="hover" title="Help guides">
            Help about how to use app. Add points to map, add and edit market items.
        </b-popover>
        <NuxtLink to="/help"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-info.svg')"></b-card-img></NuxtLink>
    </b-card>

    </b-card-group>
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
