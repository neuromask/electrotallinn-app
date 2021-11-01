<template>
  <section>
    <div id="map" ref="googleMap" />
    <div id="badgePos">
      <a @click="getUserPos"><b-icon-record-circle /></a>
    </div>
    <b-modal
      ref="modal-report"
      title="Report point"
      ok-only
      ok-variant="secondary"
      ok-title="Send"
      @ok="handleReportSubmit"
    >
      <b-form @submit.stop.prevent="handleSubmit">
        <b-form-textarea
          id="textarea"
          v-model="report.message"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form>
    </b-modal>
  </section>
</template>

<script>

import mapStyle from '@/assets/json/mapStyle.json'

export default {
  name: 'Map',
  layout: 'empty',
  props: {},
  data () {
    return {
      map: null,
      mapCenter: { lat: 0, lng: 0 },
      mapConfig: {
        zoom: 12,
        center: { lat: 59.434685, lng: 24.80748 },
        styles: mapStyle
      },
      locationIcons: {
        CHARGE: 'icon-charge',
        REPAIR: 'icon-repair',
        AIR: 'icon-air',
        WATER: 'icon-water'
      },
      report: {},
    }
  },
  head () {
      return {
        title: 'Charging Map - ElectroTallinn',
        meta: [
          { hid: 'description', name: 'description', content: 'Map showing the locations of outlets for charging, repair in accessible places.' },
          { name: 'format-detection', content: 'telephone=no' }
        ]
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
      console.log(locationId);
      this.report = {
        locationId: locationId,
        message: ""
      }
      this.$refs['modal-report'].show()
    },
    handleReportSubmit() {
      console.log(JSON.stringify(this.report))
    },
    initMap () {
      
      this.mapConfig.mapTypeControlOptions = {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.TOP_CENTER
      }

      const mapContainer = this.$refs.googleMap
      this.map = new window.google.maps.Map(mapContainer, this.mapConfig)
      const infowindow = new window.google.maps.InfoWindow({})
      const baseUrl = this.$config.baseUrl

      window.google.maps.event.addListener(this.map, 'click', function (event) {
        infowindow.close()
      })

      this.$axios
        .get(baseUrl + '/locations')
        .then((response) => {
          for (const location of response.data) {
            const markerIcon = require(`~/assets/img/icon/${this.locationIcons[location.type]}.svg`)
            const marker = new window.google.maps.Marker({
              position: new window.google.maps.LatLng(location.lat, location.lng),
              map: this.map,
              icon: { url: markerIcon, scaledSize: new window.google.maps.Size(32, 32) },
              title: location.title,
              id: location.id
            })

            window.google.maps.event.addListener(marker, 'click', (function (marker) {
              return function () {
                infowindow.setContent(
                  "<div class='infocontent'>"
                  + (location.imageName ? "<img src='" + baseUrl + '/locations/image/' + location.imageName + "'>" : '')
                    + "<div class='footer'>"
                      +"<h4>" + location.title + "</h4>"
                      +"<p>" + (location.description || '') + "</p>"
                      +"<div class='socket'>"
                        +"<button class='report' onclick='handleReport("+location.id+")'>Report</button>"
                        +"<small>Added by: " + (location.userFirstName || '') + "</small>"
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
  #map {height: 100vh; width: 100%;}
  #badgePos {position: fixed; bottom: 48px; left: 0;height: 48px; z-index: 10; background-color: #1a2740; border-right: 4px solid #ec970f; cursor: pointer;}
  #badgePos:hover {border-color: #f8da19;transition: border-color 0.4s ease-out;}
  #badgePos a { height: 48px;  line-height: 48px; padding: 8px 12px; font-weight: bold; font-size: 36px; color: white;}
</style>
<style>
.infocontent {
    text-align: center;
    position: relative;
}
.infocontent img {
    max-height: 600px;
    max-width: 600px;
    margin: 0 auto;
    width:100%;
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
}
.infocontent button.close {
    background: transparent;
    border: 0;
}
.infocontent p {
    font-size: 14px;
    margin: 0;
    padding-bottom:0.2rem;
}
.infocontent h4 {
    font-size:16px;
    margin: 0;
    padding-top:0.3rem;
}
.infocontent small {
    font-size: 10px;
    float: left;
}
.infocontent .report {
    float: right;
    font-weight: bold;
}
.infocontent p {
    margin:0;
}
</style>
