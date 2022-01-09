<template>
  <section>
    <Tinybox v-if="images.length > 0" no-thumbs loop v-model="index" :images="images" />
    <b-row>
      <b-col class="mb-3" cols="6" lg="3" v-for="image, imageIndex in images" :key="imageIndex" @click="index = imageIndex">
        <b-img-lazy role="button" class="shadow-sm" center fluid rounded :alt="image.date" :src="image.thumb"  />
          <div class="mt-2">
            <!-- <p v-if="image.title" class="image-title">{{image.title}}</p> -->
            <div class="d-flex justify-content-between align-items-start small">
              <p class="image-date">{{image.date}}</p>
              <p class="image-views">Views: {{image.views}}</p>
            </div>
          </div>
      </b-col>
    </b-row>
  </section>
</template>

<script>

import axios from 'axios';

export default {
  name: 'flickr',

  data() {
    return {
      loading: false,
      images: [],
      index: null
    }
  },
  mounted() {
    this.loadImages()
  },
  methods: {
    loadImages() {
      this.loading = true;
      this.fetchImages()
        .then((response) => {
          this.images = response.data.photos.photo;
          this.images = this.images.map(img => ({
            caption: img.datetaken,
            src: img.url_o,
            thumb: img.url_n,
            date: img.datetaken,
            views: img.views
          }))
          this.loading = false;
          
        })
        .catch((error) => {
          console.log("An error ocurred: ", error);
        })
    },
    fetchImages() {
      return axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest',
        params: {
          method: 'flickr.people.getPhotos',
          api_key: this.$config.flickrKey,
          user_id: '193098597@N02',
          photoset_id: 72157719283805004,
          extras: 'url_n, url_o, owner_name, date_taken, views',
          page: 1,
          format: 'json',
          nojsoncallback: 1,
          per_page: 64,
        }
      })
    }
  }
};
</script>
