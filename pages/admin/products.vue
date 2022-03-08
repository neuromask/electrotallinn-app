<template>
  <section id="admin">
    <b-row>
      <b-col cols="12">
        <h3 class="underline font-weight-bold">Products</h3>
        <b-table class="bg-info rounded" borderless striped hover :items="marketProducts" :fields="marketProductsFields" :sort-by="marketProductsSortBy" :sort-desc="marketProductsSortDesc">
          <template #cell(id)="data">
            <h5 class="text-center">{{data.item.id}}</h5>
            <b-img :src="$locationIcons[data.item.type]" center fluid class="table-icon"/>
          </template>
          <template #cell(name)="data">
            <p><strong>{{ data.item.name }}</strong></p>
            <p>{{ data.item.description }}</p>
            <small>Added by: {{ data.item.userFirstName }}</small>
          </template>
          <template #cell(category)="data">
            <p style="white-space:nowrap">{{ $t('market.category.' + data.item.category) }}</p>
          </template>
          <template #cell(controls)="data">
            <b-button-group size="sm">
              <b-button variant="primary" v-b-modal="'product-modal-' + data.item.id">
                <b-icon icon="pencil-fill" variant="white"/>
              </b-button>
              <b-button size="sm" :class="data.item.status == 'ACTIVE' ? 'btn-success' : 'btn-warning'" @click="statusProduct(data.item.id)">
                <b-icon icon="check-circle-fill" variant="white"/>
              </b-button>
              <b-button variant="danger" v-b-modal="'delete-modal-'+data.item.id">
                <b-icon icon="trash-fill" variant="white"/>
              </b-button>
            </b-button-group>

            <MarketProductModal :id="data.item.id" @save="findMarketProducts" />

            <b-modal centered :id="'delete-modal-' + data.item.id" title="Confirm delete">
              Are you sure you want to delete?<br/>ID: {{data.item.id}}<br/>Name: {{data.item.title}}
              <template #modal-footer="{ cancel, hide }">
                <b-button variant="primary" size="sm" @click="deleteProduct(data.item.id), hide()">OK</b-button>
                <b-button size="sm" @click="cancel()">Cancel</b-button>
              </template>
            </b-modal>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import axios from "axios";

export default {
  props: {},
  data() {
    return {
      marketProducts: [],
      marketProductsFields: [
        { key: "id", sortable: true, label: "ID" },
        { key: "name", sortable: true, label: "Name" },
        { key: "category", sortable: true, label: "Category" },
        { key: "controls", sortable: false, label: "" }
      ],

      marketProductsSortBy: "id",
      marketProductsSortDesc: true
    };
  },
  mounted() {
    this.findMarketProducts();
  },
  methods: {
    findMarketProducts() {
      this.$axios.$get(`${this.$config.apiUrl}/admin/marketProducts`).then(response => {
          this.marketProducts = response;
        });
    },
    statusProduct(productId) {
      this.$axios.$put(`/api/users/${this.$user.uin}/marketProducts/${productId}/status/toggle`).then(() => {
          this.$toast.success("Success");
          this.findMarketProducts();
        });
    },
    deleteProduct(productId) {
      this.$axios.$delete(`${this.$config.apiUrl}/admin/marketProducts/${productId}`).then(() => {
          this.$toast.success("Success");
          this.findMarketProducts();
          console.log(productId + " deleted");
        });
    }
  }
};
</script>
