<template>
  <div>
    <b-card-group columns>
      <b-card
        v-for="(product, idx) in productsFull" :key="idx"
        bg-variant="info"
        no-body
        style="font-size:0.9rem; line-height:1rem;"
        >
        <div class="px-3 pt-3 pb-0">
            <div class="p-container d-flex justify-content-center align-items-center overflow-hidden">
                <nuxt-link :to="`market/${product.id}`"><b-img class="p-image" src="~/assets/img/step-1.jpg"></b-img></nuxt-link>
            </div>
        </div>
        <b-card-body class="text-center">
            <div class="d-flex w-100 justify-content-between mb-2">
                <div class="mr-2">
                    <nuxt-link v-if="product.name" :to="`market/${product.id}`"><h5 class="mb-0 text-secondary font-weight-bold">{{ product.name }}</h5></nuxt-link>
                    <p class="text-muted d-block m-0" v-if="product.description">{{ product.description }}</p>
                </div>
                <div>
                    <h4 class="mb-0 text-nowrap text-warning" v-if="product.description"><strong>133{{ product.price }}€</strong></h4> 
                </div>
            </div>
            <b-button size="sm" variant="warning" class="text-info mb-3" nuxt :to="`market/${product.id}`"><b-icon icon="search" /> More info</b-button>
            <b-list-group class="text-left">
                <b-list-group-item variant="light" class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 text-dark"><strong>Info</strong></h5>
                    <h5><b-icon variant="primary" icon="info-circle-fill" /></h5>
                </div>
                <div class="mb-1">
                    <p class="m-0" v-if="product.userFirstName">Added by: <nuxt-link :to="`/users/${product.userUin}`"><strong>{{ product.userFirstName }}</strong></nuxt-link></p>
                    <p class="m-0" v-if="product.username">Telegram: <a :href="'https://t.me/'+product.username" target="_blank"><strong>{{ product.username }}</strong></a></p>
                    <p class="m-0" v-if="product.category">Category: {{ product.category }}</p>
                    <p class="m-0" v-if="product.date">Date: {{ product.date }}</p>
                </div>
                </b-list-group-item>
            </b-list-group>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>

export default {
  data() {
    return {
      productsFull: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.$axios
        .$get(this.$config.baseUrl + "/marketProducts").then((response) => {
          this.productsFull = response;
          console.log(this.productsFull)
        });
    }
  },
};
</script>

<style scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
.card {
  border-radius: 10px;
}

.product-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.p-container {
        border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    width:100%;
    height: 12rem;
}
.p-image {
    flex-shrink: 0;
    width: 100%;
}
.description {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-height: 16px;     /* fallback */
   max-height: 32px;      /* fallback */
   -webkit-line-clamp: 2; /* number of lines to show */
   -webkit-box-orient: vertical;
}

.profile {
    width: 10rem;
    bottom:-2.5rem;
}
</style>
