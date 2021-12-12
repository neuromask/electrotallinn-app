<template>
  <section ref="top">
    <MarketProductModal @save="getProducts" />
    <b-sidebar id="sidebar-right" backdrop title="Market Menu" right shadow>
      <div class="px-3 py-2">
        <b-form-group class="mb-3" label="Category">
        </b-form-group>
        <hr />
         <b-button variant="outline-secondary" @click="resetFilters()">Reset</b-button>
      </div>
    </b-sidebar>

    <b-collapse class="mb-3" id="menuOptions">
      <!--<div>
        <input type="text" v-model="filterText" placeholder="no filter">
        <button :class="[filterOption==='filterByText' ? 'is-checked' : '']" @click="filter('filterByText')">Filter</button>
      </div>-->
      <b-button size="sm" class="mb-1" @click="filter('showAll')">All</b-button>
      <b-button size="sm" class="mb-1" variant="primary" :class="[filterOption==='isTransport' ? 'is-checked' : '']" @click="filter('isTransport')">Transport</b-button>
      <b-button size="sm" class="mb-1" variant="primary" :class="[filterOption==='isEquipment' ? 'is-checked' : '']" @click="filter('isEquipment')">Equipment</b-button>
      <b-button size="sm" class="mb-1" variant="primary" :class="[filterOption==='isSpare' ? 'is-checked' : '']" @click="filter('isSpare')">Spare Parts</b-button>
      <b-button size="sm" class="mb-1" variant="primary" :class="[filterOption==='isAcc' ? 'is-checked' : '']" @click="filter('isAcc')">Accessories</b-button>
      <b-button size="sm" class="mb-1" variant="primary" :class="[filterOption==='isOther' ? 'is-checked' : '']" @click="filter('isOther')">Other</b-button>
    </b-collapse>
    <!--<div id="sort">
      <button :class="[sortOption==='name' ? 'is-checked' : '']" @click="sort('name')">Sort by name</button>
      <button :class="[sortOption==='category' ? 'is-checked' : '']" @click="sort('category')">Sort by cat</button>
    </div>-->
    <b-row>
      <isotope ref="isotope" id="root_isotope" class="w-100" :list="productsFull" :options="option" @filter="filterOption=arguments[0]" @sort="sortOption=arguments[0]">
        <b-col cols="12" md="6" lg="4" class="list-item mb-4 w-100" v-for="product in productsFull" :key="product.id">
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
                      <nuxt-link v-if="product.name" :to="`market/${product.id}`"><h5 class="title mb-1 text-secondary font-weight-bold">{{ cutText(product.name, 22) }}</h5></nuxt-link>
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
      </isotope>
    </b-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      productsFull: [],
      catOptions: [
          { text: 'Equipment', value: 'EQUIPMENT' },
          { text: 'Transport', value: 'TRANSPORT' },
          { text: 'Spare parts', value: 'SPARE_PARTS' },
          { text: 'Accessories', value: 'ACCESSORIES' },
          { text: 'Other', value: 'OTHER' }
      ],
      sortOption: null,
      filterOption: "showAll",
      filterText: "",
      option: {
        layoutMode: 'masonry',
        masonry: {
          gutter: 0
        },
        getSortData: {
          name: (item) => {
            return item.name.toLowerCase()
          },
          category: (item) => {
            return item.category.toLowerCase()
          }
        },
        sortBy: "original-order",
        getFilterData: {
          isTransport: function(itemElem) {
            console.log(itemElem.category);
            return itemElem.category == 'TRANSPORT';
          },
          isSpare: function(itemElem) {
            console.log(itemElem.category);
            return itemElem.category == 'SPARE_PARTS';
          },
          isEquipment: function(itemElem) {
            console.log(itemElem.category);
            return itemElem.category == 'EQUIPMENT';
          },
          isAcc: function(itemElem) {
            console.log(itemElem.category);
            return itemElem.category == 'ACCESSORIES';
          },
          isOther: function(itemElem) {
            return itemElem.category == 'OTHER';
          },
          showAll: () => {
            return true
          },
          filterByText: (item) => {
              return item.name.toLowerCase().includes(this.filterText.toLowerCase());
          }
        }
      }
    }
  },
  created() {
    this.getProducts();
  },
  computed: {
    resetShow: function () {
      return !!this.filter.category.length || !!this.sort.length || !!this.filter.searchText
    }
  },
  methods: {
    getProducts() {
      this.$axios
        .$get(this.$config.baseUrl + "/marketProducts").then((response) => {
          this.productsFull = response;
          console.log(this.productsFull)
        });
    },
    filter(key) {
      this.$refs.isotope.filter(key)
    },
    sort(key) {
      this.$refs.isotope.sort(key)
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
    getCat(productCat) {
      return this.catOptions.filter(catOption => productCat.includes(catOption.value)).map(catOption => catOption.text).join(", ")
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
</style>
