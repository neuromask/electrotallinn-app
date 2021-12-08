<template>
  <section ref="top">
    <b-sidebar id="sidebar-right" backdrop title="Market Menu" right shadow>
      <div class="px-3 py-2">
        <b-form-input class="mb-3" v-model="filter.searchText" @keyup="getProducts" placeholder="Search"></b-form-input>
        <b-form-group class="mb-3" label="Category">
          <b-alert class="m-0" show variant="light">
            <b-form-checkbox-group
              v-model="selectedCats"
              :options="catOptions"
              name="buttons-1"
              switches
              stacked
              size="sm"
              button-variant="primary"
              @change="handleCatFilter"
            ></b-form-checkbox-group>
          </b-alert>
        </b-form-group>
        <hr />
         <b-button variant="outline-secondary" @click="resetFilters()">Reset</b-button>
      </div>
    </b-sidebar>
    <transition name="animation" tag="div" class="px-3 py-2">
      <b-alert v-if="resetShow" show variant="light">
        <p class="mb-1"><strong>Search:</strong> {{ filter.searchText }}</p>
        <p class="mb-1"><strong>Category:</strong> {{ filteredCats() }}</p>
        <p class="mb-1"><strong>Sort:</strong> {{ filteredCats() }}</p>
        <b-button size="sm" variant="outline-secondary" @click="resetFilters()">Reset</b-button>
      </b-alert>
    </transition>
    <transition-group name="card-list" mode="out-in" class="row">
      <b-col cols="12" md="6" lg="4" class="card-list-item mb-4" v-for="product in productsFull" :key="product.id">
        <b-card
            bg-variant="info"
            no-body
            style="font-size:0.9rem; line-height:1rem;"
            >
            <div class="px-3 pt-3 pb-0">
                <div class="p-container d-flex justify-content-center align-items-center overflow-hidden position-relative">
                    <nuxt-link v-if="product.images.length" :to="`market/${product.id}`"><b-img class="p-image" :src="$config.baseFileUrl + '/market/' + product.images[0].fileName"></b-img></nuxt-link>
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
                                <p class="mb-0 small" v-if="product.userFirstName">Added by: <nuxt-link :to="`/users/${product.userUin}`"><strong>{{ product.userFirstName }}</strong></nuxt-link></p>
                                <p class="mb-0 small" v-if="product.username">Telegram: <a :href="'https://t.me/'+product.username" target="_blank"><strong>{{ product.username }}</strong></a></p>
                                <p class="mb-0 small" v-if="!product.username">Telegram: <a href="https://t.me/electrotallinn" target="_blank"><strong>ElectroTallinn</strong></a></p>
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
                    <p class="mb-1" v-if="product.category">Category: <strong role="button" @click="selectCat(product.category)">{{ getCat(product.category) }}</strong></p>
                    <p class="mb-0 small" v-if="product.date_created">{{ new Date(product.date_created).toLocaleDateString('en-us', { year:"numeric", month:"short", day: 'numeric' }) }}</p>
                </div>
            </template>
        </b-card>
      </b-col>
    </transition-group>
  </section>
</template>

<script>

export default {
  data() {
    return {
        productsFull: [],
        filter: {
          searchText: null,
          category: []
        },
        sort: [],
        selectedCats: [], // Must be an array reference!
        catOptions: [
            { text: 'Equipment', value: 'EQUIPMENT' },
            { text: 'Transport', value: 'TRANSPORT' },
            { text: 'Spare parts', value: 'SPARE_PARTS' },
            { text: 'Accessories', value: 'ACCESSORIES' },
            { text: 'Other', value: 'OTHER' }
        ]
    };
  },
  created() {
    this.getProducts();
  },
  computed: {
    resetShow: function () {
      console.log(!!this.filter.category && !!this.filter.category.length)
      return !!this.filter.category.length || !!this.sort.length || !!this.filter.searchText
    }
  },
  methods: {
    getProducts() {
      this.$axios
        .$get(this.$config.baseUrl + "/marketProducts", {params: this.filter}).then((response) => {
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
    },
    handleCatFilter(cat) {
      this.filter.category = cat
      this.getProducts()
    },
    getCat(productCat) {
      return this.catOptions.filter(catOption => productCat.includes(catOption.value)).map(catOption => catOption.text).join(", ")
    },
    selectCat(productCat) {
      //window.scrollTo(0, this.$refs.top.offsetTop);
      this.selectedCats = [productCat]
      this.handleCatFilter([productCat])
    },
    filteredCats() {
      if (this.filter.category) return this.getCat(this.filter.category)
    },
    resetFilters() {
      this.selectedCats = []
      this.filter.category = []
      this.filter.searchText = ''
      this.getProducts()
    },
    searchProducts() {

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
.row-wrap {
  transition: all 1s ease;
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


.card-list-item {
  transition: all 0.6s ease;
}
.card-list-leave-active {
  position: absolute;
}
.card-list-enter {
  opacity: 0;
  transform: translateY(40px);
}
.card-list-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

.animation-enter-active, 
.animation-leave-active {
    transition: all .6s ease;
}
.animation-enter, 
.animation-leave-to {
    opacity: 0;
    height: 0;
    transform: translateY(-148px);
}
.animation-leave-active {
  position: absolute;
}
</style>
