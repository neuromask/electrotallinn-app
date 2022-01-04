<template>
  <header class="mb-3 mb-lg-4">
    <NuxtLink :to="localePath('/')"><b-img-lazy src="~assets/img/site-top-anim.svg" alt="ElectroTallinn - Electric transport group in Tallinn" center id="banner" /></NuxtLink>
  </header>
</template>

<script></script>

<style>
#banner {
  width: 100%;
  height: 32vw;
  max-height:360px;
  object-fit: cover;
}

</style>
