<template>
  <section>
    <b-img class="mb-5" fluid-grow src="@/assets/img/minecraft/minecraft-et.svg" />
     
     <b-row class="mb-5">
      <b-col cols="12" lg="6" class="mb-lg-0 mb-5">
        <h3 class="font-weight-bold underline">{{ $t('minecraft.server') }}</h3>
        <b-card class="shadow-sm mb-3">
          <b-img class="px-5 py-3" fluid src="@/assets/img/minecraft/minecraft-et2.svg" />
          <b-list-group class="text-left shadow-sm">
            <b-list-group-item variant="light" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-dark"><strong>{{ $t('minecraft.status') }}</strong></h5>
                <div v-if="serverData">
                  <h5 v-if="serverData.online"><b-badge>{{ $t('minecraft.online') }}</b-badge><div class="status bg-green ml-2"></div></h5>
                  <h5 v-if="!serverData.online"><b-badge>{{ $t('minecraft.offline') }}</b-badge><div class="status bg-red ml-2"></div></h5>
                </div>
              </div>
              <div class="mb-1">
                <p class="mb-1 text-dark">{{ $t('minecraft.ip') }}: <strong>play.electrotallinn.ee</strong></p>
                <div v-if="serverData && serverData.online"><p class="mb-1 text-dark">{{ $t('minecraft.players') }}: <strong>{{serverData.players.online}} / {{serverData.players.max}}</strong></p></div>
                <p class="mb-1 text-dark">{{ $t('minecraft.version') }}: <strong>Minecraft 1.20</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.mode') }}: <strong>{{ $t('minecraft.survival') }}</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.hardware') }}: <strong>Apple M1 8 Cores</strong></p>
                <p class="mb-1 text-dark">{{ $t('minecraft.worktime') }}: <strong>24 / 7</strong></p>
                <p class="mb-1 text-dark">{{ $t('profile.telegram') }}: <a href="https://t.me/electrotallinn_minecraft" target="_blank"><strong>ElectroTallinn Group</strong></a></p>
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
            <b-list-group-item variant="light" href="https://t.me/electrotallinn_minecraft"  class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-dark"><strong>{{ $tc('home.linkBox2', 1) }}</strong></h5>
                <div style="width:24px; height:24px" class="text-primary" v-html="require('~/assets/icons/bootstrap/telegram.svg?raw')" />
              </div>
              <div class="mb-0">
                <p class="mb-0 text-dark w-100">{{ $tc('home.linkBox2', 2) }}</p>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <h3 class="font-weight-bold underline">{{ $t('minecraft.how') }}</h3>
        <b-card class="shadow-sm mb-3">
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
          </b-list-group>
        </b-card>
        <figure class="figure mb-0">
          <Tinybox no-thumbs loop v-model="index" :images="images" />
          <b-img role="button" alt="ElectroTallinn Minecraft Server" class="transportImage shadow-sm" center fluid rounded @click="index = 0" src="@/assets/img/minecraft/et-mc.jpg" />
          <figcaption class="figure-caption text-center mb-0">ElectroTallinn Minecraft Server</figcaption>
        </figure>
      </b-col>
    </b-row>

    <div class="d-flex justify-content-between align-items-start">
      <h3 class="font-weight-bold underline">{{ $t('minecraft.map') }}</h3>
      <h3 class="m-0 text-nowrap text-warning"><b-button variant="primary" href="https://play.electrotallinn.ee" target="_blank">Minecraft {{ $t('minecraft.map') }} <b-icon icon="geo-alt-fill" /></b-button></h3>
    </div>
    <!--<b-img role="button" alt="ElectroTallinn Minecraft Server Map" class="transportImage shadow-sm" center fluid rounded @click="index = 1" src="@/assets/img/minecraft/et-mc-map.jpg" />
    <figcaption class="figure-caption text-center mb-5">ElectroTallinn Minecraft Server Map</figcaption>-->
    <iframe class="mb-5 w-100 border-0 rounded shadow-sm worldMap" src="https://play.electrotallinn.ee" title="World Map"></iframe>
    <!--<b-card no-body class="mb-3">
      <b-tabs v-model="tabIndex" card justified>
        <b-tab title="General">
        </b-tab>
      </b-tabs>
    </b-card>-->
    <h3 class="font-weight-bold underline">{{ $t('minecraft.screenshots') }}</h3>
    <GalleryMinecraft class="mb-5" />
    
    <h3 class="font-weight-bold underline">{{ $t('minecraft.stats') }}</h3>
    <b-table
      class="rounded overflow-auto shadow-sm mb-5"
      borderless
      striped
      sticky-header="1760px"
      table-variant="light"
      :items="statsData"
      :fields="fieldsUser"
      :sort-by.sync="sortUserBy"
      :sort-desc.sync="sortUserDesc"
    >
      <template #cell(name)="data">
        <h4>{{ data.item.name }}<div v-if="isOnline(data.item.name)" class="status-sm bg-green ml-2"></div></h4>
        <p v-if="isOnline(data.item.name)" class="small text-success">{{ $t('minecraft.online') }}</p>
        <p v-else class="small opacity-50">{{ $moment.unix(data.item.lastPlayed).fromNow() }}</p>
      </template>
      <template #cell(played)="data">
        <h4>{{ Math.floor($moment.duration(data.item.played/20, "seconds").asHours()) }}</h4>
        <p class="small opacity-50">{{ $t('minecraft.hours') }}</p>
      </template>
      <template #cell(kills)="data">
        <h4>{{ data.item.kills }}</h4>
        <p class="small opacity-50">{{ $t('minecraft.mobs') }}</p>
      </template>
      <template #cell(deaths)="data">
        <h4>{{ data.item.deaths }}</h4> 
        <p class="small opacity-50">{{ $t('minecraft.times') }}</p>
      </template>
      <template #cell(totalKm)="data">
        <h4>{{ data.item.totalKm.toFixed(1) }}</h4>
        <p class="small opacity-50">{{ $t('minecraft.km') }}</p>
      </template>
      <template #cell(mined)="data">
        <h4>{{ data.item.mined }}</h4>
         <p class="small opacity-50">{{ $t('minecraft.blocks') }}</p>
      </template>
      <template #cell(placed)="data">
        <h4>{{ data.item.placed }}</h4>
        <p class="small opacity-50">{{ $t('minecraft.items') }}</p>
      </template>
    </b-table>

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
      timer: null,
      statsData: null,
      sortUserBy: 'played',
      sortUserDesc: true,
      tabIndex: 0,
      playersOnline: [],
      images: [ 
        {src: require("@/assets/img/minecraft/et-mc.jpg"), caption: "ElectroTallinn Minecraft Server"}, 
        {src: require("@/assets/img/minecraft/et-mc-map.jpg"), caption: "ElectroTallinn Minecraft Server Map"}
      ],
      index: null
    };
  },
  created () {
    this.$moment.locale(this.$i18n.locale);
  },
  computed: {
    fieldsUser() {
      return [
        {
          key: 'name',
          sortable: true,
          label: this.$t('minecraft.player'),
          thClass: 'text-white bg-secondary',
          tdClass: 'text-white bg-secondary'
        },
        {
          key: 'played',
          sortable: true,
          label: this.$t('minecraft.played')
        },
        {
          key: 'kills',
          sortable: true,
          label: this.$t('minecraft.kills')
        },
        {
          key: 'deaths',
          sortable: true,
          label: this.$t('minecraft.deaths')
        },
        {
          key: 'deaths',
          sortable: true,
          label: this.$t('minecraft.deaths')
        },
        {
          key: 'totalKm',
          sortable: true,
          label: this.$t('minecraft.distance')
        },
        {
          key: 'placed',
          sortable: true,
          label: this.$t('minecraft.placed')
        },
        {
          key: 'mined',
          sortable: true,
          label: this.$t('minecraft.mined')
        }
      ]
    }
  },
  mounted() {
    this.getStats();
    this.getStatus();
    this.timer = setInterval(() => {
      this.getStatus();
    }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    async getStatus() {
      await this.$axios.$get('/minecraftApi/2/play.electrotallinn.ee').then((response) => {
        this.serverData = response;
        //console.log(this.serverData.players.list)
        if (this.serverData.players.list) this.playersOnline = this.serverData.players.list
      });
    },
    getStats() {
      this.$axios.$get('/api/minecraft/statistics').then((response) => {
        this.statsData = response;
        //console.log(this.statsData)
      });
    },
    isOnline(player) {
      if (this.serverData && this.serverData.players.list) {
        return this.playersOnline.includes(player)
      }
    }
  }
}
</script>
<style>
.status {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  display: inline-block;
}
.status-sm {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}
.bg-red {
  background: red;
}
.bg-green {
  background: rgb(0, 189, 0);
}
.worldMap {
  min-height: 640px;
}
</style>