<template>
  <section class="locations">
    <b-form-group  id="filtermap" v-slot="{ ariaDescribedby }">
      <b-form-radio-group v-model="selected" button-variant="primary" :options="$locationTypesIcons" :aria-describedby="ariaDescribedby" @change="filterMarkers($event);" name="radio-btn-stacked" buttons stacked>
        <template #first>
          <b-form-radio value="all">📌</b-form-radio>
        </template>
      </b-form-radio-group>
    </b-form-group>
    <b-button variant="primary" id="badgePos" @click="getUserPos"><b-icon-geo-alt-fill /></b-button>
    <client-only>
      <l-map id="map" ref="etMap" @ready="initLeaflet()" :zoom="zoom" :options="mapOptions" :center="center">
        <l-control-attribution :position="attributionPosition" :prefix="attributionPrefix"/>
        <l-control-layers :position="layersPosition" :collapsed="false" :sort-layers="true" />
        <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :visible="tileProvider.visible"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"
        />
        <l-control-zoom :position="zoomPosition" />
        <l-control-scale :imperial="imperial" :position="scalePosition" />
        <l-marker v-for="marker in markersAll"
          :key="marker.id"
          :visible="marker.options.visible"
          :draggable="marker.draggable"
          :lat-lng.sync="marker._latlng"
          :icon="marker.options.icon"
        >
          <l-popup :content="marker.options.content" />
          <l-tooltip :content="marker.options.title" />
        </l-marker>
        <l-marker :lat-lng="[59.44381, 24.79355]">
          <l-icon
            :icon-size=bigIcon
            :icon-url="require(`~/assets/img/logo/circle-anim.svg`)"
          />
          <l-popup :content="`<div class='text-center'><img src=`+require(`~/assets/img/logo/circle-anim.svg`)+` width='90%' /><h5>ElectroTallinn Base</h5></div>`" />
        </l-marker>
      </l-map>
    </client-only>
    <b-modal ref="modal-report" :title="$t('main.reportTitle')" ok-only centered ok-variant="secondary" :ok-title="$t('action.send')" @ok="handleReportSubmit" >
      <b-form @submit.stop.prevent="handleSubmit">
        <b-form-textarea id="textarea" v-model="report.message" :placeholder="$t('main.reportArea')" rows="3" max-rows="9" ></b-form-textarea>
      </b-form>
    </b-modal>
  </section>
</template>

<script>

const tileProviders = [
  {
    name: 'OpenStreetMap',
    visible: false,
    attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  {
    name: 'OpenCycleMap',
    visible: false,
    attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=ab33ec8d18874ee9b2f66b18513a1cc3',
  },
  {
    name: 'CyclOSM',
    visible: true,
    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | Map style: &copy; <a href="https://www.cyclosm.org/">CyclOSM</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  }
];

export default {
  head() { return { 
    title: this.$t("nav.map"),
      meta: [
        { hid: 'description', name: 'description', content: 'Map showing the locations of outlets for charging, repair in accessible places.' },
      ]
    } 
  },
  name: 'Map',
  layout: 'empty',
  props: {},
  data () {
    return {
      url: '',
      asd: require('~/assets/img/logo/circle-anim.svg'),
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 13,
      center: [59.434685, 24.80748],
      tileProviders: tileProviders,
      map: null,
      selected: 'all',
      markersAll: [],
      bigIcon: [64, 64],
      mapOptions: {
        zoomSnap: 0.5,
        zoomControl: false,
        attributionControl: false
      },
      imperial: false,
      scalePosition: 'bottomleft',
      zoomPosition: 'topleft',
      attributionPosition: 'bottomright',
      layersPosition: 'topright',
      attributionPrefix: 'ElectroTallinn Map',
      report: {},
    }
  },
  mounted () {
    window.handleReport = this.handleReport;
  },
  methods: {
    handleReport (locationId) {
      this.report = {
        locationId: locationId,
        message: ""
      }
      this.$refs['modal-report'].show()
    },
    async handleReportSubmit() {
        await this.$axios.post(this.$config.apiUrl + '/locations/report', this.report)
        this.$refs['modal-report'].hide()
    },
    filterMarkers (category) {
      for (var i = 0; i < this.markersAll.length; i++) {
        var marker = this.markersAll[i];
        if (marker.options.category == category) marker.options.visible = true;
        else if (category == "all") marker.options.visible = true;
        else marker.options.visible = false;
      }
    },
    initLeaflet () {
      this.map = this.$refs.etMap.mapObject
      const apiUrl = this.$config.apiUrl

      this.$axios
        .get(apiUrl + '/locations')
        .then((response) => {
          for (const location of response.data) {
            let iconOptions = {
              iconUrl: this.$locationIcons[location.type],
              iconSize: [32, 32]
            }
            const markerIcon = L.icon(iconOptions);
            let dateCreated = new Date(location.dateCreated).toLocaleDateString(this.$i18n.locale, { year:"numeric", month:"short", day: 'numeric' });
            let markerOptions = {
              title: location.title,
              clickable: true,
              draggable: false,
              visible: true,
              icon: markerIcon,
              category: location.type,
              riseOnHover: true,
              position: [location.lat, location.lng],
              content: 
              "<div class='loc-popup'>"
                + (location.imageName ? "<img class='loc-img-blur' src='" + apiUrl + '/locations/image/' + location.imageName + "' />" : '')
                + (location.imageName ? "<img class='locImage' src='" + apiUrl + '/locations/image/' + location.imageName + "' />" : '')
                  + "<div class='footer'>"
                    +"<h4>" + location.title + "</h4>"
                    +"<p>" + (location.description || '') + "</p>"
                    +"<div class='socket'>"
                      +"<small>" + this.$t('main.pointAdded') + ": " + (location.userFirstName || '') +" | " + this.$t('main.pointDate') + ": " + (dateCreated || '') + "</small>"
                      +"<button class='report' onclick='handleReport("+location.id+")'>" + this.$t('main.pointReport') + "</button>"
                    +"</div>"
                  +"</div>"
                +"</div>"
            }
            const marker = L.marker([location.lat, location.lng], markerOptions);
            this.markersAll.push(marker);
          }
        })
    },
    getUserPos () {
      const map = this.map
      map.locate({
        setView: true,
        enableHighAccuracy: true
      }).on('locationfound', function(e) {
        var marker = new L.marker(e.latlng);
        marker.addTo(map);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map, section {height: 100%; width: 100%;}
  #badgePos {position: fixed; bottom: 208px; right: 10px; padding: 6px; width: 40px; z-index: 500; cursor: pointer;}
  #filtermap {
  position: fixed;
  bottom: 256px;
  right: 10px;
  z-index: 500;
}
#filtermap label.btn {
  width: 40px;
  padding: 6px;
}

</style>
<style>
.leaflet-popup-content {
  width: 480px!important;
  height: 480px;
}
@media (max-width: 768px) {
  .leaflet-popup-content {
    width: 80vw!important;
    height: 80vw;
  }
}
.leaflet-control-layers label {
  margin: 0.1rem 0;
}

.loc-popup {
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.loc-popup .locImage {
  position: absolute;
  top:0; left:0;
  width:100%;
  height:100%;
  object-fit: contain;
}
.loc-popup .loc-img-blur {
  position: absolute;
  top:0; left:0;
  width:100%;
  height:100%;
  object-fit: cover;
  filter: blur(8px);
  -webkit-filter: blur(8px);
  z-index:0!important;
}
.loc-popup .footer {
  position: fixed;
  width: calc(100% - 44px);
  bottom:0;
  background-color: rgba(255,255,255,0.7);
  padding:0.3rem 0.5rem 1rem;
}
.loc-popup .socket {
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.loc-popup button.close {
  background: transparent;
  border: 0;
}
.loc-popup p {
  font-size: 14px;
  margin: 0;
  padding-bottom:0;
}
.loc-popup h4 {
  font-size:16px;
  margin: 0;
  padding-top:0;
}
.loc-popup small {
  font-size: 10px;
  float: left;
}
.loc-popup .report {
  border:1px solid #1a2740;
  background: white;
  border-radius: 4px;
}
.loc-popup p {
    margin:0;
}
.locations div[role=dialog] {
  max-width: 90vw!important;
}
</style>
