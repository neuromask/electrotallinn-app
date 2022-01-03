<template>
  <div>
    <CoolLightBox :items="images" :index="index" :effect="'fade'" @close="index = null" />
    <b-row>
      <b-col class="mb-3" cols="6" lg="3" v-for="image, imageIndex in images" :key="imageIndex" @click="triggerLightbox(imageIndex)">
        <b-img-lazy role="button" class="shadow-sm" center fluid rounded :src="image.src" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// CoolLightBox component
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  components: {
    CoolLightBox,
  },
  props: {
    loc: null
  },
  data() {
    return {
      images: [],
      index: null
    };
  },
  mounted() {
    this.importAll(require.context("@/assets/img/gallery", false, /\.jpg$/));
  },
  methods: {
    importAll(r) {
      r.keys().forEach(key => (this.images.push({ src: r(key) })));
    },
    triggerLightbox(index) {
      this.index = index;
    }
  },
};
</script>