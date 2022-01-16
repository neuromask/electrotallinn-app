<template>
  <section>
    <b-card v-if="typeof weather.main != 'undefined'" id="weather" no-body bg-variant="secondary" :class="weather.main.temp > 16 ? 'warm' : '' " class="shadow-sm text-white bg-pat-dark px-3 py-3" >
      <div class="d-flex w-100 justify-content-between align-items-start">
        <h2 class="location mb-0"><span class="font-weight-bold">{{ weather.name }}</span><span class="text-light ml-2">{{ weather.sys.country }}</span></h2>
        <h6 class="date mb-0 text-right"><span class="font-weight-bold">{{ $moment().format('LT') }}</span><span class="text-light d-block">{{ $moment().format('ll') }}</span></h6>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center mb-3 mt-2">
        <div class="blur-box py-2 px-4 rounded">
          <div class="d-flex justify-content-center align-items-center position-relative">
            <span class="display-2 font-weight-bold">{{ Math.round(weather.main.temp) }}</span>
            <span class="display-4">°C</span>
            <b-img class="image" :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`" />
            <b-icon role="button" class="position-absolute" style="top:0; right:-1rem" font-scale="2" icon="arrow-clockwise" @click="fetchWeather" />
          </div>
          <h5 class="weather font-weight-bold text-center text-yellow mb-0">{{ weather.weather[0].description }}</h5>
        </div>
      </div>
      <div class="d-flex w-100 justify-content-between align-items-center">
        <div>
          <div class="mb-0 text-light"><h5 class="d-inline"><b-badge variant="info" class="py-0">{{ Math.round(weather.main.feels_like) }}°<small>C</small></b-badge></h5> {{ $t('weather.feels') }}</div>
          <div class="mb-0 text-light"><h5 class="d-inline"><b-badge variant="info" class="py-0">{{ Math.round(weather.main.temp_max) }}°<small>C</small></b-badge></h5> {{ $t('weather.max') }}</div>
          <div class="mb-0 text-light"><h5 class="d-inline"><b-badge variant="info" class="py-0">{{ Math.round(weather.main.temp_min) }}°<small>C</small></b-badge></h5> {{ $t('weather.min') }}</div>
        </div>
        <div>
          <div class="mb-0 text-light text-right">{{ $t('weather.wind') }} <h5 class="d-inline"><b-badge variant="info" class="py-0">{{ Math.round(weather.wind.speed) }} <small>m/s</small></b-badge></h5></div>
          <div class="mb-0 text-light text-right">{{ $t('weather.humidity') }} <h5 class="d-inline"><b-badge variant="info" class="py-0">{{ Math.round(weather.main.humidity) }} <small>%</small></b-badge></h5></div>
          <div class="mb-0 text-light text-right">{{ $t('weather.pressure') }} <h5 class="d-inline"><b-badge variant="info" class="py-0">{{ Math.round(weather.main.pressure) }} <small>hPa</small></b-badge></h5></div>
        </div>
      </div>
    </b-card>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: "App",
  data() {
    return {
      url_base: "https://api.openweathermap.org/data/2.5/",
      weather: {},
    };
  },
  created() {
    this.$moment.locale(this.$i18n.locale);
  },
  mounted() {
    this.fetchWeather()
  },
  methods: {
    fetchWeather() {
      axios({
        method: 'get',
        url: `${this.url_base}weather`,
        params: {
          q: "tallinn",
          appid: this.$config.weatherKey,
          units: "metric",
          lang: this.$i18n.locale
        }
      }).then((response) => {
        this.weather = response.data;
      })
    },
    getIcon(code) {
      //console.log(code)

    }
  },
};
</script>

<style scoped>

#weather {
  background-size: cover;
  background-position: bottom;
}
#weather.warm {
  background-image: url("@/assets/img/weather/warm-bg.jpg");
}

.image {
  width: 140px; 
  height: 100px; 
  object-fit: none;
}
</style>