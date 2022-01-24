<template>
  <section>
    <Tinybox v-if="images.length > 0" v-model="index" :images="images" />
    <div class="text-center">
      <b-pagination v-if="images.length > 0" limit="9" class="mb-3 shadow-sm d-inline-flex" align="left" v-model="currentPage" :per-page="perPage" :total-rows="totalRows" @change="loadImages"  />
    </div>
    <b-row>
      <b-col class="my-3" role="button" cols="6" lg="3" v-for="image, imageIndex in images" :key="imageIndex" @click="index = imageIndex">
        <div class="p-container position-relative shadow-sm rounded">
          <b-img-lazy class="p-image" :alt="image.caption" :src="image.thumbnail" />
          <b-badge class="position-absolute small mb-0 p-1 z-index-1" style="bottom:0; left:0">{{ image.date }}</b-badge>
        </div>
      </b-col>
    </b-row>
    <div class="text-center">
      <b-pagination v-if="images.length > 0" limit="9" class="mt-3 shadow-sm d-inline-flex" align="center" v-model="currentPage" :per-page="perPage" :total-rows="totalRows" @change="loadImages" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'flickr',
  data() {
    return {
      loading: false,
      images: [],
      index: null,
      currentPage: 1,
      perPage: 24,
      totalRows: 240
    }
  },
  created() {
    this.$moment.locale(this.$i18n.locale)
  },
  mounted() {
    this.loadImages()
  },
  methods: {
    loadImages(page) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.loading = true;
      this.$axios.$get('https://api.flickr.com/services/rest',{
        params: {
          method: 'flickr.people.getPhotos',
          api_key: this.$config.flickrKey,
          user_id: '193098597@N02',
          photoset_id: 72157719283805004,
          extras: 'url_n, url_o, date_taken',
          page: page,
          format: 'json',
          nojsoncallback: 1,
          per_page: this.perPage,
        }
      }).then((response) => {
        this.images = response.photos.photo;
        //console.log(response.data.photos)
        this.images = this.images.map(img => ({
          caption: 'ElectroTallinn - ' + this.$moment(img.datetaken).format('LL | LT'),
          src: img.url_o,
          thumbnail: img.url_n,
          date: this.$moment(img.datetaken).format('ll | LT')
          //views: img.views
        }))
        this.$nuxt.$loading.finish();
        this.loading = false;
        this.totalRows = response.photos.total
      })
      .catch((error) => {
        console.log("An error ocurred: ", error);
      })
    }
  }
};
</script>
