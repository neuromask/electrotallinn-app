<template>
  <section>
    <Tinybox v-if="images.length > 0" no-thumbs loop v-model="index" :images="images" />
    <b-row>
      <b-pagination limit="9" class="w-100" align="center" v-model="currentPage" :total-rows="totalRows" @change="loadImages" ></b-pagination>
        <b-col class="my-1" cols="6" lg="3" v-for="image, imageIndex in images" :key="imageIndex" @click="index = imageIndex">
          <b-img-lazy role="button" class="shadow-sm" center fluid rounded :alt="image.date" :src="image.thumb"  />
            <div class="mt-2">
              <!-- <p v-if="image.title" class="image-title">{{image.title}}</p> -->
              <div class="d-flex justify-content-between align-items-start small">
                <p class="image-date">{{image.date}}</p>
                <p class="image-views">Views: {{image.views}}</p>
              </div>
            </div>
        </b-col>
      <b-pagination limit="9" class="w-100" align="center" v-model="currentPage" :total-rows="totalRows" @change="loadImages" ></b-pagination>
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
      index: null,
      currentPage: 1,
      perPage: 24,
      totalRows: 500
    }
  },
  mounted() {
    this.loadImages()
  },
  methods: {
    loadImages(page) {
      this.loading = true;
      axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest',
        params: {
          method: 'flickr.people.getPhotos',
          api_key: this.$config.flickrKey,
          user_id: '193098597@N02',
          photoset_id: 72157719283805004,
          extras: 'url_n, url_o, owner_name, date_taken, views',
          page: page,
          format: 'json',
          nojsoncallback: 1,
          per_page: this.perPage,
        }
      }).then((response) => {
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
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    }
  }
};
</script>
