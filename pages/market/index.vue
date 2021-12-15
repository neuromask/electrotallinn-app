<template>
  <section ref="top">
    <div class="mb-3">
      <b-btn size="sm" class="mr-1 mb-1" variant="primary" @click="resetFilters()">{{ $t('main.all') }}</b-btn>
      <b-button v-for="cat in categories" :key="cat" size="sm" class="mr-1 mb-1" variant="primary" :class="[cat==='isOther' ? 'is-checked' : '']" @click="selectCat(cat)">{{ $t('market.category.' + cat) }}</b-button>
    </div>
    <transition-group name="card-list" mode="out-in" class="row">
      <b-col cols="12" md="6" lg="4" class="card-list-item mb-4" v-for="product in productsFull" :key="product.id">
        <b-card
            bg-variant="info"
            no-body
            style="font-size:0.9rem; line-height:1rem;"
            >
            <div class="px-3 pt-3 pb-0">
                <div class="p-container overflow-hidden position-relative">
                    <nuxt-link v-if="product.images.length" :to="localePath(`/market/${product.id}`)"><b-img class="p-image" :src="$config.baseFileUrl + '/market/' + product.images[0].fileName"></b-img></nuxt-link>
                    <h2 style="top:0.7rem;right:1rem" class="mb-1 text-nowrap text-warning position-absolute" v-if="product.price"><b-badge variant="primary">{{ product.price }}€</b-badge></h2>
                </div>
            </div>
            <b-card-body>
                <div class="mb-3">
                    <nuxt-link v-if="product.name" :to="localePath(`/market/${product.id}`)"><h5 class="title mb-1 text-secondary font-weight-bold">{{ cutText(product.name, 25) }}</h5></nuxt-link>
                    <p class="text-muted d-block mb-0" v-if="product.description">{{ cutText(product.description, 35) }}</p>
                </div>

                <b-list-group class="text-left">
                    <b-list-group-item variant="light" class="flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between align-items-center">
                            <div>
                                <p class="mb-0 small" v-if="product.userFirstName">{{ $t('main.addedBy') }}: <nuxt-link :to="localePath(`/users/${product.userUin}`)"><strong>{{ product.userFirstName }}</strong></nuxt-link></p>
                                <p class="mb-0 small" v-if="product.username">{{ $t('profile.telegram') }}: <a :href="'https://t.me/'+product.username" target="_blank"><strong>{{ product.username }}</strong></a></p>
                                <p class="mb-0 small" v-if="!product.username">{{ $t('profile.telegram') }}: <a href="https://t.me/electrotallinn" target="_blank"><strong>ElectroTallinn</strong></a></p>
                            </div>
                            <div>
                                <b-button size="sm" variant="warning" class="text-info" nuxt :to="localePath(`/market/${product.id}`)"><b-icon icon="search" /> {{ $t('main.info') }}</b-button>
                            </div>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-card-body>
            <template #footer>
                <div class="d-flex w-100 justify-content-between align-items-center">
                    <p class="mb-1" v-if="product.category">{{ $t('main.category') }}: <strong role="button" @click="selectCat(product.category)">{{ $t('market.category.' + product.category) }}</strong></p>
                    <p class="mb-0 small" v-if="product.date_created">{{ new Date(product.date_created).toLocaleDateString($i18n.locale, { year:"numeric", month:"short", day: 'numeric' }) }}</p>
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
        categories: ['EQUIPMENT','TRANSPORT','SPARE_PARTS','ACCESSORIES','OTHER']
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
    selectCat(productCat) {
      this.selectedCats = [productCat]
      this.handleCatFilter([productCat])
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

.p-container {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    width:100%;
    height: 12rem;
}
.p-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

.card-list-item {
  transition: transform .4s ease;
}
.card-list-enter {
  transform: scale(0);
}
.card-list-enter-to {
  transform: scale(1);
}
.card-list-leave-to,
.card-list-leave {
  display: none;
}

</style>