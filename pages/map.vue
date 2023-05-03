<template>
  <section class="locations">
    <b-form-group  id="filtermap" v-slot="{ ariaDescribedby }">
      <b-form-radio-group v-model="selected" button-variant="primary" size="sm" :options="$locationTypesIcons" :aria-describedby="ariaDescribedby" @change="filterMarkers($event);" name="radio-btn-stacked" buttons stacked>
        <template #first>
          <b-form-radio value="all">All</b-form-radio>
        </template>
      </b-form-radio-group>
    </b-form-group>
    <b-button variant="primary" id="badgePos" @click="getUserPos" size="sm"><b-icon-record-circle /></b-button>
    <div id="map" ref="googleMap" />
    <b-modal ref="modal-report" :title="$t('main.reportTitle')" ok-only centered ok-variant="secondary" :ok-title="$t('action.send')" @ok="handleReportSubmit" >
      <b-form @submit.stop.prevent="handleSubmit">
        <b-form-textarea id="textarea" v-model="report.message" :placeholder="$t('main.reportArea')" rows="3" max-rows="9" ></b-form-textarea>
      </b-form>
    </b-modal>
  </section>
</template>

<script>

import mapStyle from '@/assets/json/mapStyle.json'

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
      map: null,
      selected: 'all',
      markersAll: [],
      mapCenter: { lat: 0, lng: 0 },
      mapConfig: {
        zoom: 12,
        center: { lat: 59.434685, lng: 24.80748 },
        fullscreenControl: true,
        styles: mapStyle
      },
      report: {},
    }
  },
  mounted () {
    window.handleReport = this.handleReport;
  },
  created() {
    this.$loadScript(`https://maps.googleapis.com/maps/api/js?libraries=places&key=${this.$config.googleKey}`)
      .then(() => {
        this.initMap()
      })
      .catch(() => {
        // Failed to fetch script
      })
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
        // If is same category or category not picked
        if (marker.category == category) {
          marker.setVisible(true);
        }
        // Categories all
        else if (category == "all") {
          marker.setVisible(true);
        }
        // Categories don't match 
        else {
          marker.setVisible(false);
        }
      }
    },
    initMap () {
      
      this.mapConfig.mapTypeControlOptions = {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.TOP_LEFT
      }

      const mapContainer = this.$refs.googleMap
      this.map = new window.google.maps.Map(mapContainer, this.mapConfig)
      const infowindow = new window.google.maps.InfoWindow({})
      const apiUrl = this.$config.apiUrl

      window.google.maps.event.addListener(this.map, 'click', function (event) {
        infowindow.close()
      })

      this.$axios
        .get(apiUrl + '/locations')
        .then((response) => {
          for (const location of response.data) {
            const markerIcon = this.$locationIcons[location.type]
            const category = location.type
            const marker = new window.google.maps.Marker({
              position: new window.google.maps.LatLng(location.lat, location.lng),
              map: this.map,
              icon: { url: markerIcon, scaledSize: new window.google.maps.Size(32, 32) },
              title: location.title,
              id: location.id,
              category: category
            })

            this.markersAll.push(marker);
            window.google.maps.event.addListener(marker, 'click', (function (marker) {
              return function () {
                let dateCreated = new Date(location.dateCreated).toLocaleDateString('en-us', { year:"numeric", month:"short", day: 'numeric' });
                infowindow.setContent(
                  "<div class='infocontent'>"
                  + (location.imageName ? "<img class='locImageBlur' src='" + apiUrl + '/locations/image/' + location.imageName + "' />" : '')
                  + (location.imageName ? "<img class='locImage' src='" + apiUrl + '/locations/image/' + location.imageName + "' />" : '')
                    + "<div class='footer'>"
                      +"<h4>" + location.title + "</h4>"
                      +"<p>" + (location.description || '') + "</p>"
                      +"<div class='socket'>"
                        +"<small>Added by: " + (location.userFirstName || '') +" | Date: "+ (dateCreated || '') + "</small>"
                        +"<button class='report' onclick='handleReport("+location.id+")'>Report</button>"
                      +"</div>"
                    +"</div>"
                  +"</div>")
                infowindow.open(this.map, marker)
              }
            })(marker))
          }
        })
    },
    getUserPos () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          const map = this.map
          // set current locations
          map.setCenter(pos)
          map.setZoom(15)
          const marker = new window.google.maps.Marker({
            position: pos,
            map,
            title: 'Your location!'
          })
          marker.setMap(map)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map, section {height: 100%; width: 100%;}
  #badgePos {position: fixed; bottom: 208px; right: 10px; padding: 6px; width: 40px; z-index: 10; cursor: pointer;}
  #filtermap {
  position: absolute;
  bottom: 256px;
  right: 10px;
  z-index: 11;
}
#filtermap .btn {
  min-width: 40px;
  padding: 6px;
}
</style>
<style>
.infocontent {
  text-align: center;
  position: relative;
  width: 480px;
  height: 480px;
  border-radius: 8px;
  overflow: hidden;
}
@media (max-width: 768px) {
  .infocontent {
    width: 80vw;
    height: 80vw;
  }
}
.infocontent .locImage {
  position: absolute;
  top:0; left:0;
  width:100%;
  height:100%;
  object-fit: contain;
}
.infocontent .locImageBlur {
  position: absolute;
  top:0; left:0;
  width:100%;
  height:100%;
  object-fit: cover;
  filter: blur(8px);
  -webkit-filter: blur(8px);
  z-index: -1;
}
.infocontent .footer {
  position: fixed;
  width: calc(100% - 28px);
  bottom:0;
  background-color: rgba(255,255,255,0.7);
  padding:0.3rem 0.5rem 1rem;
}
.infocontent .socket {
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.infocontent button.close {
  background: transparent;
  border: 0;
}
.infocontent p {
  font-size: 14px;
  margin: 0;
  padding-bottom:0;
}
.infocontent h4 {
  font-size:16px;
  margin: 0;
  padding-top:0;
}
.infocontent small {
  font-size: 10px;
  float: left;
}
.infocontent .report {
  border:1px solid #1a2740;
  background: white;
  border-radius: 4px;
}
.infocontent p {
    margin:0;
}
.locations div[role=dialog] {
  max-width: 90vw!important;
}
</style>
