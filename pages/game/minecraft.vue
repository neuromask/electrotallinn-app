<template>
  <section>
    <b-img class="mb-5" fluid-grow src="@/assets/img/minecraft/minecraft-et.svg" />
     <b-row class="mb-3">
      <b-col cols="12" lg="6" class="mb-3">
        <h3 class="font-weight-bold underline">{{ $t('minecraft.how') }}</h3>
        <b-list-group class="shadow-sm mb-3">
          <b-list-group-item class="text-dark" variant="light">
            <h5 class="font-weight-bold"><b-badge><strong>1</strong></b-badge> {{ $t('minecraft.step1') }}</h5>
            <i18n path="minecraft.step11" tag="p" class="mb-0">
              <a href="https://tlauncher.org/" target="_blank"><span class="font-weight-bold">TLauncher</span></a>
            </i18n>
          </b-list-group-item>
          <b-list-group-item class="text-dark" variant="light">
            <h5 class="font-weight-bold"><b-badge><strong>2</strong></b-badge> {{ $t('minecraft.step2') }}</h5>
            <p class="mb-0" v-html="$t('minecraft.step22')"></p>
          </b-list-group-item>
          <b-list-group-item class="text-dark" variant="light">
            <h5 class="font-weight-bold"><b-badge><strong>3</strong></b-badge> {{ $t('minecraft.step3') }}</h5>
            <p class="mb-0" v-html="$t('minecraft.step33')"></p>
          </b-list-group-item>
        </b-list-group>
        <h3 class="font-weight-bold underline">{{ $t('minecraft.rules') }}</h3>
        <b-card class="shadow-sm">
          <p class="mb-1 text-dark" v-html="$t('minecraft.rulesTest')"></p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="mb-lg-0">
        <h3 class="font-weight-bold underline">{{ $t('minecraft.server') }}</h3>
        <b-card class="shadow-sm">
          <b-img class="px-5 py-3" fluid-grow src="@/assets/img/minecraft/minecraft-et2.svg" />
          <b-list-group class="text-left shadow-sm">
            <b-list-group-item variant="light" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-dark"><strong>{{ $t('main.info') }}</strong></h5>
                <h5><b-icon variant="primary" icon="info-circle-fill" /></h5>
              </div>
              <div class="mb-1">
                <p class="mb-1 text-dark">{{ $t('minecraft.ip') }}: <strong>play.electrotallinn.ee</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.version') }}: <strong>Minecraft 1.18.1</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.mode') }}: <strong>{{ $t('minecraft.survival') }}</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.hardware') }}: <strong>Apple M1 8 Cores</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.worktime') }}: <strong>24 / 7</strong></p>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
    <!--<div class="d-flex justify-content-between align-items-start">
      <h3 class="font-weight-bold underline">{{ $t('minecraft.map') }}</h3>
      <h3 class="m-0 text-nowrap text-warning"><b-badge variant="warning" class="shadow-sm text-white">21.02.2022</b-badge></h3>
    </div>
    <iframe class="mb-3 w-100 border-0 rounded shadow-sm worldMap" src="/mcmap.html" title="World Map"></iframe>-->
    <b-button href="/mcmap.html" class="mb-3 w-100" target="_blank">{{ $t('minecraft.map') }}</b-button>
    <h3 class="font-weight-bold underline">{{ $t('minecraft.screenshots') }}</h3>
    <GalleryMinecraft />
  </section>
</template>
<script>
export default {
  head() { return { title: this.$t("nav.minecraft") } },
}
</script>
<style>
.worldMap {
  height: 640px;
}
</style>