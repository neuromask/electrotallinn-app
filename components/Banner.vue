<template>
  <NuxtLink :to="localePath('/')"><b-img-lazy src="~assets/img/top.jpg" center id="banner" /></NuxtLink>
</template>
<style>
#banner {
  width: 100%;
  height:342px;
  max-width: 2048px;
  object-fit: cover;
}
</style>
