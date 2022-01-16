<template>
  <section>
    <b-card v-if="typeof weather.main != 'undefined'" id="weather" no-body bg-variant="secondary" :class="weather.main.temp > 16 ? 'warm' : '' " class="shadow-sm text-white bg-pat-dark px-3 py-3" >
      <div class="d-flex w-100 justify-content-between align-items-start">
        <h2 class="location mb-0"><span class="font-weight-bold">{{ weather.name }}</span><span class="text-light ml-2">{{ weather.sys.country }}</span></h2>
        <h6 class="date mb-0 text-right"><span class="font-weight-bold">{{ $moment().format('LT') }}</span><span class="text-light d-block">{{ $moment().format('ll') }}</span></h6>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center mb-3 mt-2">
        <div class="temp py-2 px-4 rounded">
          <div class="d-flex justify-content-center align-items-center">
            <span class="display-2 font-weight-bold">{{ Math.round(weather.main.temp) }}</span>
            <span class="display-4">°C</span>
            <b-img class="image" :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`" />
          </div>
          <div class="weather font-weight-bold text-center text-yellow">{{ weather.weather[0].description }}</div>
        </div>
      </div>
      <div class="d-flex w-100 justify-content-between align-items-center">
        <div>
          <p class="mb-0 text-light">{{ $t('weather.feels') }}: <span class="font-weight-bold text-white">{{ Math.round(weather.main.feels_like) }}</span>°<small>C</small></p>
          <p class="mb-0 text-light">{{ $t('weather.max') }}: <span class="font-weight-bold text-white">{{ Math.round(weather.main.temp_max) }}</span>°<small>C</small></p>
          <p class="mb-0 text-light">{{ $t('weather.min') }}: <span class="font-weight-bold text-white">{{ Math.round(weather.main.temp_min) }}</span>°<small>C</small></p>
        </div>
        <div>
          <p class="mb-0 text-right text-light">{{ $t('weather.wind') }}: <span class="font-weight-bold text-white">{{ Math.round(weather.wind.speed) }}</span> <small>m/s</small></p>
          <p class="mb-0 text-right text-light">{{ $t('weather.humidity') }}: <span class="font-weight-bold text-white">{{ weather.main.humidity }}</span> <small>%</small></p>
          <p class="mb-0 text-right text-light">{{ $t('weather.pressure') }}: <span class="font-weight-bold text-white">{{ weather.main.pressure }}</span> <small>hPa</small></p>
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

.temp {
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(3px);
}

.image {
  width: 140px; 
  height: 100px; 
  object-fit: none;
}
</style>