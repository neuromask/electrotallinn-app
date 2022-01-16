<template>
    <div class="w-120 my-5 hero-box d-flex justify-content-center align-items-center overflow-hidden rounded shadow-sm" >
      <div class="w-100 h-100 image-box">
        <div class="w-100 h-100 position-absolute" style="background-color:rgba(192, 209, 230,.3)"></div>
        <b-img class="p-image" fluid src="~/assets/img/gallery/electrotallinn-ride1.jpg" />
      </div>
      <div class="text-box w-49 my-5  blur-box p-3 rounded">
        <h3 class="mb-0 font-weight-bold mb-3">ElectroTallinn - {{ $tc('main.aboutText', 1) }}</h3>
        <hr class="hr-sm">
        <p class="mb-3 lead">{{ $tc('main.aboutText', 2) }} {{ $t('meta.description') }}</p>
        <b-button class="font-weight-bold mr-2" variant="primary" size="lg" :to="localePath('/market')">{{ $t('nav.market') }}</b-button>
        <b-button class="font-weight-bold" variant="outline-primary" size="lg" :to="localePath('/users')">{{ $t('nav.users') }}</b-button>
      </div>
    </div>
</template>

<script></script>

<style scoped>
.hero-box {
  position: relative;
}
.image-box {
  position: absolute;
  z-index: 1;
}
.text-box {
  z-index: 10;
}
</style>