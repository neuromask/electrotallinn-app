<template>
  <section>
    <b-card-group deck>

    <b-card img-alt="Image" img-top class="p-3">
        <h3 class="font-weight-bold mb-4"><b-badge variant="warning" class="text-white">Charging</b-badge> Map</h3>
        <NuxtLink to="/map"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-map.svg')"></b-card-img></NuxtLink>
    </b-card>

    <b-card img-alt="Image" img-top class="p-3">
        <h3 class="font-weight-bold mb-4"><b-badge variant="warning" class="text-white">Deals</b-badge> Market</h3>
        <NuxtLink to="/market"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-market.svg')"></b-card-img></NuxtLink>
    </b-card>

    </b-card-group>
    <b-card-group deck class="mt-4">

    <b-card img-alt="Image" img-top class="p-3">
        <h3 class="font-weight-bold mb-4"><b-badge variant="warning" class="text-white">ElectroPeople</b-badge> Team</h3>
        <NuxtLink to="/users"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-user.svg')"></b-card-img></NuxtLink>
    </b-card>

    <b-card img-alt="Image" img-top class="p-3">
        <h3 class="font-weight-bold mb-4"><b-badge variant="warning" class="text-white">Location</b-badge> Ranks</h3>
        <NuxtLink to="/locations/ranks"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-rank.svg')"></b-card-img></NuxtLink>
    </b-card>

    </b-card-group>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.card-img {
  border-radius: 20%;
  border: 1rem solid #4482a9;
}
</style>
