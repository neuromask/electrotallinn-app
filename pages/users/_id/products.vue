<template>
  <section>
    <MarketProductModal @save="findMarketProducts" />
    <h3 class="mb-0 font-weight-bold d-flex justify-content-between align-items-center">
      <span>
        <b-badge variant="warning" class="text-white">{{ $t('nav.market') }}</b-badge> 
        <span>{{ $t('nav.products') }} ({{ marketProducts.length }})</span>
      </span>
      <span>
        <a v-if="$user.uin == $route.params.id" v-b-modal.product-modal><b-icon class="align-middle" variant="primary" icon="plus-square" /></a>
      </span>
    </h3>
    <hr />
      <b-table class="m-0 rounded" striped table-variant="info" :items="marketProducts" :fields="marketProductFields" :sort-by.sync="marketProductsSortBy" :sort-desc.sync="marketProductsSortDesc">
          <template #cell(name)="data">
            <div class="w-100 d-flex justify-content-between align-items-center">
              <div>
                <b-avatar v-if="data.item.images[0]" :to="localePath(`/market/${data.item.id}`)" rounded :src="`${$config.baseFileUrl}/market/${data.item.images[0].fileName}`" size="4.5rem"></b-avatar>
                <b-avatar v-else :to="localePath(`/market/${data.item.id}`)" rounded :src="require('@/assets/img/no-image.png')" size="4.5rem"></b-avatar>
              </div>
              <div class="ml-3 w-100">
                <nuxt-link :to="localePath(`/market/${data.item.id}`)">
                  <h4>{{ cutText(data.item.name, 20) }}</h4>
                </nuxt-link>
                <p class="small">{{ cutText(data.item.description, 15) }}</p>
                <p class="small"><strong>{{ $t('market.category.' + data.item.category) }}</strong> | <strong>{{ data.item.price }}€</strong></p>
              </div>
              <b-button variant="primary" @click="data.toggleDetails" v-if="$user.uin == $route.params.id">
                <b-icon icon="pencil-fill" variant="white"/>
              </b-button>
            </div>
          </template>

          <template #row-details="data">

                <b-button size="sm" variant="primary" v-b-modal="'product-modal-' + data.item.id">
                  {{ $t('action.edit') }} <b-icon icon="pencil-fill" variant="white"/>
                </b-button>
                
                <b-button size="sm" :class="data.item.status == 'ACTIVE' ? 'btn-success' : 'btn-warning'" @click="statusProduct(data.item.id)">
                  <span class="text-white text-capitalize">{{ $t('action.' + data.item.status) }}</span> <b-icon icon="check-circle-fill" variant="white"/>
                </b-button>
                <b-button size="sm" variant="danger" v-b-modal="'delete-modal-' + data.item.id">
                  {{ $t('action.delete') }} <b-icon icon="trash-fill" variant="white"/>
                </b-button>

            <MarketProductModal :id="data.item.id" @save="findMarketProducts" />
            <b-modal centered :id="'delete-modal-' + data.item.id" :title="$t('main.confirmDelete')">
              <b-alert class="mb-0" show variant="danger">
                <h5>{{ $t('main.deleteWarning') }}</h5><strong>{{ $t('main.product') }}:</strong> {{data.item.name}}
              </b-alert>
              <template #modal-footer="{ cancel, hide }">
                  <b-button variant="danger" size="sm" @click="deleteProduct(data.item.id), hide()">{{ $t('action.delete') }}</b-button>
                  <b-button size="sm" @click="cancel()">{{ $t('action.cancel') }}</b-button>
              </template>
            </b-modal>
          </template>

      </b-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      marketProducts: [],
      marketProductsSortBy: 'id',
      marketProductsSortDesc: true,
      categories: ['EQUIPMENT','TRANSPORT','SPARE_PARTS','ACCESSORIES','OTHER']
    }
  },
  computed: {
    marketProductFields() {
      return [
        { key: 'name', sortable: true, label: this.$t('nav.products') }
      ]
    }
  },
  mounted () {
    this.findMarketProducts();
  },
  watch: {
    $route () {
     this.findMarketProducts();
    }
  },
  methods: {
    findMarketProducts() {
        this.$axios.$get(`${this.$config.baseUrl}/users/${this.$route.params.id}/marketProducts`).then((response) => {
            this.marketProducts = response;
        });
    },
    deleteProduct(productId) {
      this.$axios
        .$delete(`${this.$config.baseUrl}/users/${this.$route.params.id}/marketProducts/${productId}`)
        .then(() => {
            this.$toast.success('Success');
            this.findMarketProducts();
        })
    },
    statusProduct(productId) {
      this.$axios
        .$put(`${this.$config.baseUrl}/users/${this.$user.uin}/marketProducts/${productId}/status/toggle`)
        .then(() => {
            this.$toast.success('Success');
            this.findMarketProducts();
        })
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
  }
}
</script>

<style scoped>
.upper>div {
    height: 320px;
    background-color: #1a2740;
    border-radius: 6px;
}
.profile {
    width: 15rem;
    bottom:-2rem;
}
.btn-close {
  top:0; right:0;
}
@media (min-width: 576px) {
  .card-columns {
    column-count: 2;
  }
}
.transportImage {
    cursor: pointer;
    object-fit: cover;
}
.productImage {
    cursor: pointer;
    object-fit: cover;
    height: 60px;
    width: 60px;
}
.text-capitalize:first-letter {
    text-transform:capitalize;
}
</style>