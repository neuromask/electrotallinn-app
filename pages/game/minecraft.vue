<template>
  <section>
    <b-img class="mb-5" fluid-grow src="@/assets/img/minecraft/minecraft-et.svg" />
     <b-row class="mb-3">
      <b-col cols="12" lg="6" class="mb-lg-0">
        <h3 class="font-weight-bold underline">{{ $t('minecraft.server') }}</h3>
        <b-card class="shadow-sm mb-3">
          <b-img class="px-5 py-3" fluid src="@/assets/img/minecraft/minecraft-et2.svg" />
          <b-list-group class="text-left shadow-sm">
            <b-list-group-item variant="light" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-dark"><strong>{{ $t('minecraft.status') }}</strong></h5>
                <div v-if="serverData">
                  <h5 v-if="serverData.online"><b-badge>{{ $t('minecraft.online') }}</b-badge> 🟢</h5>
                  <h5 v-if="!serverData.online"><b-badge>{{ $t('minecraft.offline') }}</b-badge> 🔴</h5>
                </div>
              </div>
              <div class="mb-1">
                <p class="mb-1 text-dark">{{ $t('minecraft.ip') }}: <strong>play.electrotallinn.ee</strong></p>
                <div v-if="serverData && serverData.online"><p class="mb-1 text-dark">{{ $t('minecraft.players') }}: <strong>{{serverData.players.online}} / {{serverData.players.max}}</strong></p></div>
                <p class="mb-1 text-dark">{{ $t('minecraft.version') }}: <strong>Minecraft 1.18.1</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.mode') }}: <strong>{{ $t('minecraft.survival') }}</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.hardware') }}: <strong>Apple M1 8 Cores</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.worktime') }}: <strong>24 / 7</strong></p>
              </div>
            </b-list-group-item>
            <b-list-group-item variant="light" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-dark"><strong>{{ $t('main.description') }}</strong></h5>
                <h5><b-icon variant="primary" icon="chat-square-text-fill" /></h5>
              </div>
              <div class="mb-0">
                <p class="mb-0 text-dark">{{ $t('minecraft.description') }}</p>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
        <h3 class="font-weight-bold underline">{{ $t('minecraft.how') }}</h3>
        <b-card class="shadow-sm">
          <b-img class="mb-3" fluid-grow src="@/assets/img/minecraft/mcmap.png" />
          <b-list-group class="shadow-sm">
            <b-list-group-item variant="light" class="text-secondary">
              <b-media tag="div" class="d-flex justify-content-center align-items-center" no-body>
                <b-media-aside vertical-align="center" style="width:64px">
                  <div class="bg-dark w-100 text-white rounded text-center pb-1">
                    <h2 class="display-4 font-weight-bold mb-0">1</h2>
                  </div>
                </b-media-aside>
                <b-media-body vertical-align="center">
                  <h5 class="font-weight-bold">{{ $t('minecraft.step1') }}</h5>
                  <i18n path="minecraft.step11" tag="p" class="mb-0">
                  <a href="https://tlauncher.org/" target="_blank"><span class="font-weight-bold">TLauncher</span></a>
                </i18n>
              </b-media-body>
              </b-media>
            </b-list-group-item>
            <b-list-group-item variant="light" class="text-secondary">
              <b-media tag="div" class="d-flex justify-content-center align-items-center" no-body>
                <b-media-aside vertical-align="center" style="width:64px">
                  <div class="bg-dark w-100 text-white rounded text-center pb-1">
                    <h2 class="display-4 font-weight-bold mb-0">2</h2>
                  </div>
                </b-media-aside>
                <b-media-body vertical-align="center">
                  <h5 class="font-weight-bold">{{ $t('minecraft.step2') }}</h5>
                  <p class="mb-0" v-html="$t('minecraft.step22')"></p>
                </b-media-body>
              </b-media>
            </b-list-group-item>
            <b-list-group-item variant="light" class="text-secondary">
              <b-media tag="div" class="d-flex justify-content-center align-items-center" no-body>
                <b-media-aside vertical-align="center" style="width:64px">
                  <div class="bg-dark w-100 text-white rounded text-center pb-1">
                    <h2 class="display-4 font-weight-bold mb-0">3</h2>
                  </div>
                </b-media-aside>
                <b-media-body vertical-align="center">
                  <h5 class="font-weight-bold">{{ $t('minecraft.step3') }}</h5>
                  <p class="mb-0" v-html="$t('minecraft.step33')"></p>
              </b-media-body>
              </b-media>
            </b-list-group-item>
            <b-list-group-item variant="light" class="text-secondary">
              <b-media tag="div" class="d-flex justify-content-center align-items-center" no-body>
                <b-media-aside vertical-align="center" style="width:64px">
                  <b-img fluid-grow src="@/assets/img/home/home-map-dark.svg" />
                </b-media-aside>
                <b-media-body vertical-align="center">
                  <h5 class="font-weight-bold">{{ $t('minecraft.map') }}</h5>
                  <b-button variant="primary" href="http://play.electrotallinn.ee:8123/" class="w-100" target="_blank">Minecraft {{ $t('minecraft.map') }} <b-icon icon="geo-alt-fill" /></b-button>
              </b-media-body>
              </b-media>
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
    <h3 class="font-weight-bold underline">{{ $t('minecraft.screenshots') }}</h3>
    <GalleryMinecraft />
    <b-card>
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 text-dark"><strong>{{ $t('minecraft.rules') }}</strong></h5>
        <h5><b-icon variant="primary" icon="chat-square-text-fill" /></h5>
      </div>
      <div class="mb-0">
        <p class="mb-0 text-dark small" v-html="$t('minecraft.rulesTest')"></p>
      </div>
    </b-card>
  </section>
</template>
<script>
export default {
  head() { return { title: this.$t("nav.minecraft") } },
  data() {
    return {
      serverData: null,
      timer: null
    };
  },
  mounted() {
    this.getStatus();
    this.timer = setInterval(() => {
      this.getStatus();
    }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getStatus() {
      this.$axios.$get("https://api.mcsrvstat.us/2/play.electrotallinn.ee").then((response) => {
        this.serverData = response;
        //console.log(this.serverData)
      });
    }
  }
}
</script>
<style>
.worldMap {
  height: 640px;
}
</style>