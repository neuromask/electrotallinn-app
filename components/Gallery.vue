<template>
  <div>
    <b-row>
      <Tinybox v-if="images.length > 0" v-model="index" :images="images" />
      <b-col class="mb-3" cols="6" lg="3" v-for="image, imageIndex in images" :key="imageIndex" @click="index = imageIndex">
        <b-img-lazy role="button" class="shadow-sm" center fluid rounded alt="ElectroTallinn" :src="image.src" />
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {

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
      r.keys().forEach(key => (this.images.push({ src: r(key), thumbnail: r(key), caption: "ElectroTallinn" })));
    }
  },
};
</script>