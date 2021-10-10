<template>
  <section>
    <div id="map" ref="googleMap" />
    <div id="badgePos">
      <a @click="getUserPos"><b-icon-record-circle /></a>
    </div>
    <b-modal
      id="modal-report"
      title="Report point"
      ok-only
      ok-variant="secondary"
      ok-title="Send"
    />
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
      }
    }
  },
  head () {
    return {
      title: 'Charging Map - ElectroTallinn',
      meta: [
        { hid: 'description', name: 'description', content: 'Map showing the locations of outlets for charging, repair in accessible places.' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      script: [
        {
          hid: 'maps-googleapis',
          body: true,
          once: true,
          src: `https://maps.googleapis.com/maps/api/js?libraries=places&key=${this.$config.googleKey}`,
          defer: true,
          callback: this.initMap
        }
      ]
    }
  },
  mounted () {

  },
  methods: {

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
                infowindow.setContent("<div class='infocontent'>" + (location.imageName ? "<img src='" + baseUrl + '/locations/image/' + location.imageName + "'>" : '') + '<h4>' + location.title + '</h4><p>' + (location.description || '') + "</p><div><span class='report' v-b-modal.modal-report>Report</span><small>Added by: " + (location.userFirstName || '') + '</small></div></div>')
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

.infocontent {
    text-align: center;
}
.infocontent img {
    max-height: 600px;
    max-width: 600px;
    margin: 0 auto;
    width:100%;
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
