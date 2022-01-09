<template>
  <section id="product-page">
    <MarketProductModal />
    <b-card-group columns>
      <b-card class="shadow-sm">
        <h3 class="underline font-weight-bold">{{ $t('main.info') }}</h3>
        <h3 class="mb-3" variant="light" v-if="product.name">{{ product.name }}</h3>
        <b-list-group>
          <b-list-group-item class="text-secondary" variant="light" v-if="product.description">
            <div class="d-flex justify-content-between align-items-start">
              <h5 class="font-weight-bold">{{ $t('main.description') }}</h5>
              <h3 class="m-0 text-nowrap text-warning" v-if="product.price"><b-badge variant="primary">{{ product.price }}€</b-badge></h3>
            </div>
            <p class="mb-0 pre" v-html="linkify(product.description)"></p>
          </b-list-group-item>
          <b-list-group-item variant="primary" v-if="product.category" class="text-secondary">{{ $t('main.category') }}: <strong>{{ $t('market.category.' + product.category) }}</strong></b-list-group-item>
          <b-list-group-item variant="primary" v-if="product.dateCreated" class="text-secondary">{{ $t('main.dateAdded') }}: <strong>{{ new Date(product.dateCreated).toLocaleDateString($i18n.locale, { year:"numeric", month:"short", day: 'numeric' }) }}</strong></b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card class="shadow-sm">
       <h3 class="underline font-weight-bold">{{ $t('main.contact') }}</h3>
        <b-list-group class="text-left">
          <b-list-group-item variant="light" class="text-secondary" v-if="product.userFirstName">{{ $t('main.addedBy') }}: <nuxt-link :to="`/users/${product.userUin}`"><strong>{{ product.userFirstName }}</strong></nuxt-link></b-list-group-item>
          <b-list-group-item variant="light" class="text-secondary" v-if="product.username">{{ $t('profile.telegram') }}: <a :href="'https://t.me/'+product.username" target="_blank"><strong>{{ product.username }}</strong></a></b-list-group-item>
        </b-list-group>
        <b-alert v-if="!product.username" class="mt-3 mb-0" show variant="warning">
          <i18n path="main.sellerNoUsername" tag="p" class="mb-0">
            <a href="https://t.me/electrotallinn" target="_blank"><strong>ElectroTallinn</strong></a>
            <strong>{{ product.userFirstName }}</strong>
          </i18n>
        </b-alert>
      </b-card>
      <b-card class="shadow-sm">
       <h3 class="underline font-weight-bold">{{ $t('main.photo') }}</h3>
        <Tinybox v-if="images.length > 0" no-thumbs loop v-model="index" :images="images" />
        <div class="images" v-for="(image, imageIndex) in images" :key="imageIndex">
          <b-img role="button" center fluid-grow class="rounded image mb-3" @click="index = imageIndex" :src="image.src" />
        </div>
      </b-card>
    </b-card-group>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: this.product.name,
      meta: [
        { hid: 'description', name: 'description', content: this.product.description}
      ]
    }
  },
  name: 'ProductPage',
  props: {},
  data() {
    return {
      images: [],
      index: null,
      product: {},
      image: null,
      categories: ['EQUIPMENT','TRANSPORT','SPARE_PARTS','ACCESSORIES','OTHER']
    }
  },
  created () {
    this.getProduct()
  },
  computed: {
    
  },
  watch: {
    $route () {
     this.getProduct();
    }
  },
  methods: {
    getProduct () {
      this.$axios.$get(`${this.$config.apiUrl}/marketProducts/${this.$route.params.id}`).then((response) => {
        this.product = response;
        this.images = this.product.images.map(img => ({
          caption: this.product.name,
          src: this.$config.baseFileUrl + '/market/' + img.fileName
        }))
      });
    },
    linkify(string) {
      const URLMatcher = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
      return string.replace(URLMatcher, match => `<a href="${match}" target="_blank">${match}</a>`)
    }
  }
}
</script>

<style scoped>
.image {
  max-height:470px;
  object-fit: cover;
}
.images:last-child>img {
  margin-bottom: 0!important;
}
@media (min-width: 576px) {
  .card-columns {
    column-count: 2;
  }
}
</style>
