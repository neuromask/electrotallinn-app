<template>
  <NuxtLink :to="localePath('/')"><b-img-lazy src="~assets/img/site-top.svg" center id="banner" /></NuxtLink>
</template>
<style>
#banner {
  width: 100%;
  height: 30vw;
  max-height:342px;
  object-fit: cover;
}
</style>
