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
      apiKey: 'AIzaSyClDGFnyszA_dpXvvYW63HqTSOvz04JJps',
      locationIcons: {
        CHARGE: require('@/assets/img/icon/icon-charge.svg'),
        REPAIR: require('@/assets/img/icon/icon-repair.svg'),
        AIR: require('@/assets/img/icon/icon-air.svg'),
        WATER: require('@/assets/img/icon/icon-water.svg')
      }
    }
  },
  head () {
    return {
      script: [
        {
          hid: 'maps-googleapis',
          src: `https://maps.googleapis.com/maps/api/js?libraries=places&key=${this.apiKey}`,
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
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER
      }

      const mapContainer = this.$refs.googleMap
      this.map = new window.google.maps.Map(mapContainer, this.mapConfig)
      const infowindow = new google.maps.InfoWindow({})
      const baseUrl = process.env.baseUrl

      google.maps.event.addListener(this.map, 'click', function (event) {
        infowindow.close()
      })

      $axios
        .get(baseUrl + '/locations')
        .then((response) => {
          for (const location of response.data) {
          // console.log(location);
            const marker = new google.maps.Marker({
              position: new google.maps.LatLng(location.lat, location.lng),
              map: this.map,
              icon: { url: this.locationIcons[location.type], scaledSize: new google.maps.Size(32, 32) },
              title: location.title,
              id: location.id
            })

            google.maps.event.addListener(marker, 'click', (function (marker) {
              return function () {
                infowindow.setContent("<div class='infocontent'>" + (location.imageName ? "<img src='" + baseUrl + '/images/' + location.imageName + "'>" : '') + '<h4>' + location.title + '</h4><p>' + (location.description || '') + "</p><div><span class='report' v-b-modal.modal-report>Report</span><small>Added by: " + (location.userFirstName || '') + '</small></div></div>')
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
          new google.maps.Marker({
            position: pos,
            map,
            title: 'Your location!'
          })
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map, section {height: 100vh; width: 100%;}
  #content {position: relative; width: 100%; height: 100%;}
</style>
