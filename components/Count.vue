<template>
  <div class="w-100">
    <b-row>
      <b-col class="mb-3 mb-lg-0 text-center" cols="12" lg="4">
        <b-card bg-variant="dark" class="bg-pat-dark shadow-sm w-75 mx-auto text-white">
          <b-icon class="text-yellow" font-scale="3" icon="geo-alt-fill" />
          <p class="display-3 mb-0"><countTo ref="count1" separator=" " :autoplay="false" :duration="4000" :endVal="locationsCount" /></p>
          <h5 class="text-light font-weight-bold mb-0">{{ $t('nav.locations') }}</h5>
        </b-card>
      </b-col>
      <b-col class="mb-3 mb-lg-0 text-center" cols="12" lg="4">
        <b-card bg-variant="dark" class="bg-pat-dark shadow-sm w-75 mx-auto text-white">
          <b-icon class="text-yellow" font-scale="3" icon="person-fill" />
          <p class="display-3 mb-0"><countTo v-observe-visibility="visibilityChanged" ref="count2" separator=" " :autoplay="false" :duration="4000" :endVal="profilesCount" /></p>
          <h5 class="text-light font-weight-bold mb-0">{{ $t('nav.profiles') }}</h5>
        </b-card>
      </b-col>
      <b-col class="text-center" cols="12" lg="4">
        <b-card bg-variant="dark" class="bg-pat-dark shadow-sm w-75 mx-auto text-white">
          <b-icon class="text-yellow" font-scale="3" icon="basket2-fill" />
          <p class="display-3 mb-0"><countTo ref="count3" separator=" " :autoplay="false" :duration="4000" :endVal="productsCount" /></p>
          <h5 class="text-light font-weight-bold mb-0">{{ $t('nav.products') }}</h5>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import countTo from 'vue-count-to';

export default {
  data() {
    return {
      locationsCount: 0,
      profilesCount: 0,
      productsCount: 0
    }
  },
  head() { return { title: this.$t("nav.home"), } },
  components: { countTo },
  beforeMount() {
    
  },
  mounted() {
    this.getStatistics();
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible
      this.$refs.count1.start();
      this.$refs.count2.start();
      this.$refs.count3.start();
    },
    getStatistics() {
      this.$axios.$get(`${this.$config.apiUrl}/home/statistics`).then((response) => {
        this.locationsCount = response.locationsCount;
        this.profilesCount = response.profilesCount;
        this.productsCount = response.productsCount;
      });
    }
  }
}
</script>