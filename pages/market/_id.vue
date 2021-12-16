<template>
  <section id="product-page">
    <MarketProductModal />
    <CoolLightBox 
      :items="items" 
      :index="index"
      :effect="'fade'"
      @close="index = null">
    </CoolLightBox>
    <b-card-group columns>

      <b-card>
        <h3 class="mb-0 font-weight-bold"><b-badge variant="warning" class="text-white">{{ $t('main.product') }}</b-badge> {{ $t('main.info') }}</h3>
        <hr />
        <div class="mb-3 d-flex justify-content-between align-items-start">
          <h2 class="mb-0" variant="light" v-if="product.name">{{ product.name }}</h2>
          <h2 class="m-0 text-nowrap text-warning" v-if="product.price"><b-badge variant="primary">{{ product.price }}€</b-badge></h2>
        </div>
        <b-list-group class="text-left">
          <b-list-group-item variant="light" v-if="product.description">{{ $t('main.description') }}: <strong>{{ product.description }}</strong></b-list-group-item>
          <b-list-group-item variant="light" v-if="product.category">{{ $t('main.category') }}: <strong>{{ $t('market.category.' + product.category) }}</strong></b-list-group-item>
          <b-list-group-item variant="light" v-if="product.dateCreated">{{ $t('main.dateAdded') }}: <strong>{{ new Date(product.dateCreated).toLocaleDateString($i18n.locale, { year:"numeric", month:"short", day: 'numeric' }) }}</strong></b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card>
        <h3 class="mb-0 font-weight-bold"><b-badge variant="warning" class="text-white">{{ $t('main.seller') }}</b-badge> {{ $t('main.contact') }}</h3>
        <hr />
        <b-list-group class="text-left">
          <b-list-group-item variant="light" v-if="product.userFirstName">{{ $t('main.addedBy') }}: <nuxt-link :to="`/users/${product.userUin}`"><strong>{{ product.userFirstName }}</strong></nuxt-link></b-list-group-item>
          <b-list-group-item variant="light" v-if="product.username">{{ $t('profile.telegram') }}: <a :href="'https://t.me/'+product.username" target="_blank"><strong>{{ product.username }}</strong></a></b-list-group-item>
        </b-list-group>
        <b-alert v-if="!product.username" class="mt-3 mb-0" show variant="warning">
          <p class="mb-0">Join <a href="https://t.me/electrotallinn" target="_blank"><strong>ElectroTallinn</strong></a> Telegram channel and find user by name: <strong>{{ product.userFirstName }}</strong></p>
        </b-alert>
      </b-card>
      <b-card class="images">
        <h3 class="mb-0 font-weight-bold"><b-badge variant="warning" class="text-white">{{ $t('main.product') }}</b-badge> {{ $t('main.photo') }}</h3>
        <hr />
        <div v-if="items.length" role="button" class="imageBig" @click="index = 0" :style="{ backgroundImage: 'url(' + items[0].src + ')' }"></div>
        <div class="row">
          <div class="col-sm-4 mt-3" v-for="(image, imageIndex) in items" :key="imageIndex">
            <div role="button" class="image" @click="index = imageIndex" :style="{ backgroundImage: 'url(' + image.src + ')' }"></div>
          </div>
        </div>
      </b-card>
    </b-card-group>

  </section>
</template>

<script>

  // use the component
  import CoolLightBox from 'vue-cool-lightbox'
  import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  components: {
    CoolLightBox,
  },
  head() {
    return {
      title: this.product.name + ' - ElectroTallinn Market',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  },
  name: 'ProductPage',
  props: {},
  data() {
    return {
      items: [],
      index: null,
      product: {},
      image: null,
      imageSrc: null,
      categories: ['EQUIPMENT','TRANSPORT','SPARE_PARTS','ACCESSORIES','OTHER']
    }
  },
  created () {
    this.getProduct()
  },
  watch: {
    $route () {
     this.getProduct();
    }
  },
  methods: {
    getProduct () {
      this.$axios.$get(`${this.$config.baseUrl}/marketProducts/${this.$route.params.id}`).then((response) => {
        this.product = response;
        this.items = this.product.images.map(img => ({
          title: this.product.name,
          src: this.$config.baseFileUrl + '/market/' + img.fileName
        }))
      });
    }
  }
}
</script>

<style scoped>
.imageBig {
  height:256px;
  background-size: cover;
  background-position: center;
}
.image {
  height:256px;
  background-size: cover;
  background-position: center;
}
@media (min-width: 576px) {
  .card-columns {
    column-count: 2;
  }
  .imageBig {
    height:400px;
  }
  .image {
    height:128px;
  }
}
</style>
