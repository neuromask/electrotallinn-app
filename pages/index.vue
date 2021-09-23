<template>
  <section>
    <h2 class="m-0">How to <strong>add locations</strong> to the map.</h2>
    <h5>Follow easy three steps to start</h5>
    <hr/>
    <b-card-group deck>

    <b-card img-alt="Image" img-top class="p-3">
        <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">Map</b-badge> Support</h3>
        <hr/>
        <NuxtLink to="/map"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-map.svg')"></b-card-img></NuxtLink>
        <b-card-text class="mt-4">
        <h5>Start <strong>private chat</strong> with ElectroBot in Telegram.</h5>
        </b-card-text>
        <b-button size="lg" href="/map" nuxt variant="warning">View Map</b-button>
    </b-card>

    <b-card img-alt="Image" img-top class="p-3">
        <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">Market</b-badge> Deals</h3>
        <hr/>
        <NuxtLink to="/market"><b-card-img class="p-5 bg-dark" :src="require('@/assets/img/home-market.svg')"></b-card-img></NuxtLink>
        <b-card-text class="mt-4">
        <h5>Type <strong>/add</strong> command in chat with bot and follow instructions.</h5>
        </b-card-text>
        <b-button size="lg" href="/market" variant="warning">Visit Market</b-button>
    </b-card>

    </b-card-group>

  </section>
</template>

<script>
export default {}
</script>
