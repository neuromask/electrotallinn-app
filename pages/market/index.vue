<template>
  <div>
    <div class="row">
        <div class="col-sm-4 mb-4" v-for="(product, idx) in productsFull" :key="idx">
        <b-card
            bg-variant="info"
            no-body
            style="font-size:0.9rem; line-height:1rem;"
            >
            <div class="px-3 pt-3 pb-0">
                <div class="p-container d-flex justify-content-center align-items-center overflow-hidden position-relative">
                    <nuxt-link :to="`market/${product.id}`"><b-img class="p-image" src="~/assets/img/step-1.jpg"></b-img></nuxt-link>
                    <h2 style="top:0.7rem;right:1rem" class="mb-1 text-nowrap text-warning position-absolute" v-if="product.price"><b-badge variant="primary">{{ product.price }}€</b-badge></h2>
                </div>
            </div>
            <b-card-body>
                <div class="mb-3">
                    <nuxt-link v-if="product.name" :to="`market/${product.id}`"><h5 class="title mb-1 text-secondary font-weight-bold">{{ cutText(product.name, 25) }}</h5></nuxt-link>
                    <p class="text-muted d-block mb-0" v-if="product.description">{{ cutText(product.description, 35) }}</p>
                </div>

                <b-list-group class="text-left">
                    <b-list-group-item variant="light" class="flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between align-items-center">
                            <div>
                                <p class="mb-1" v-if="product.userFirstName">Added by: <nuxt-link :to="`/users/${product.userUin}`"><strong>{{ product.userFirstName }}</strong></nuxt-link></p>
                                <p class="mb-1" v-if="product.username">Telegram: <a :href="'https://t.me/'+product.username" target="_blank"><strong>{{ product.username }}</strong></a></p>
                            </div>
                            <div>
                                <b-button size="sm" variant="warning" class="text-info" nuxt :to="`market/${product.id}`"><b-icon icon="search" /> Info</b-button>
                            </div>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-card-body>
            <template #footer>
                <div class="d-flex w-100 justify-content-between align-items-center">
                    <p class="mb-1" v-if="product.category">Category: <strong>{{ product.category }}</strong></p>
                    <p class="mb-0 small" v-if="product.date_created">{{ new Date(product.date_created).toLocaleDateString('en-us', { year:"numeric", month:"short", day: 'numeric' }) }}</p>
                </div>
            </template>
        </b-card>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      productsFull: [],
      filter: {},
      sort: {}
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
    },
    cutText(text, limit){
        if (text.length > limit){
            for (let i = limit; i > 0; i--){
                if(text.charAt(i) === ' ' && (text.charAt(i-1) != ','||text.charAt(i-1) != '.'||text.charAt(i-1) != ';')) {
                    return text.substring(0, i) + '...';
                }
            }
            return text.substring(0, limit) + '...';
        }
        else return text;
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
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    width:100%;
    height: 12rem;
}
.p-image {
    flex-shrink: 0;
    width: 100%;
}
.title {
    line-height: 1.1;
}
.description {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-height: 16px;     /* fallback */
   max-height: 16px;      /* fallback */
   -webkit-line-clamp: 1; /* number of lines to show */
   -webkit-box-orient: vertical;
}

.profile-img {
    width:4rem;
}
</style>
