<template>
    <section id="admin">
        <h2 class="mt-4">Admin area</h2>
        <hr/>
        <b-row>
            <b-col cols="12">
                <h3>
                    <b-badge variant="warning" class="text-white font-weight-bold">List</b-badge>
                    Unconfirmed locations
                </h3>
                <b-table
                    class="bg-info"
                    borderless
                    striped
                    hover
                    :items="unconfirmedLocations"
                    :fields="unconfirmedLocationsFields"
                    :sort-by="unconfirmedLocationsSortBy"
                    :sort-desc="unconfirmedLocationsSortDesc"
                >
                    <template #cell(id)="data">
                        <h5 class="text-center">{{data.item.id}}</h5>
                        <b-img :src="$locationIcons[data.item.type]" center fluid class="table-icon"/>
                    </template>
                    <template #cell(title)="data">
                        <p><strong>{{ data.item.title }}</strong></p>
                        <p>{{ data.item.description }}</p>
                        <small>Added by: {{ data.item.userFirstName }}</small>
                    </template>
                    <template #cell(controls)="data">
                        <div class="d-inline-block my-1">
                            <b-button-group size="sm">
                                <b-button size="sm" v-b-modal="'image-modal-'+data.item.id">Image</b-button>
                                <b-button variant="primary" size="sm" v-b-modal="'map-modal-'+data.item.id">Map</b-button>
                            </b-button-group>
                        </div>
                        <div class="d-inline-block my-1">
                            <b-button-group size="sm">
                                <b-button variant="primary">
                                    <b-icon icon="pencil-fill" @click="data.toggleDetails" variant="white"/>
                                </b-button>
                                <b-button :class="data.item.confirmed == 0 ? 'btn-warning' : 'btn-success'" @click="confirmLocation(data.item.id)">
                                    <b-icon icon="check-circle-fill" variant="white"/>
                                </b-button>
                                <b-button variant="danger" v-b-modal="'delete-modal-'+data.item.id">
                                    <b-icon icon="trash-fill" variant="white"/>
                                </b-button>
                            </b-button-group>
                        </div>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <hr/>
        <b-row>
            <b-col cols="12">
                <h3>
                    <b-badge variant="warning" class="text-white font-weight-bold">List</b-badge>
                    Unconfirmed market products
                </h3>
                <b-table
                    class="bg-info"
                    borderless
                    striped
                    hover
                    :items="unconfirmedProducts"
                    :fields="unconfirmedProductsFields"
                    :sort-by="unconfirmedProductsSortBy"
                    :sort-desc="unconfirmedProductsSortDesc"
                >
                    <template #cell(id)="data">
                        <h5 class="text-center">{{data.item.id}}</h5>
                        <b-img :src="$locationIcons[data.item.type]" center fluid class="table-icon"/>
                    </template>
                    <template #cell(name)="data">
                        <p><strong>{{ data.item.name }}</strong></p>
                        <p>{{ data.item.description }}</p>
                        <small>Added by: {{ data.item.userFirstName }}</small>
                    </template>
                    <template #cell(controls)="data">
                        <b-button-group size="sm">
                            <b-button variant="primary">
                                <b-icon icon="pencil-fill" @click="data.toggleDetails" variant="white"/>
                            </b-button>
                            <b-button :class="data.item.status == 'NEW' ? 'btn-warning' : 'btn-success'" @click="statusLoc(data.item.id)">
                                <b-icon icon="check-circle-fill" variant="white"/>
                            </b-button>
                            <b-button variant="danger" v-b-modal="'delete-modal-'+data.item.id">
                                <b-icon icon="trash-fill" variant="white"/>
                            </b-button>
                        </b-button-group>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </section>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                unconfirmedLocations: [],
                unconfirmedProducts: [],

                unconfirmedLocationsFields: [
                    { key: 'id', sortable: true, label: 'ID' },
                    { key: 'title', sortable: true, label: 'Name' },
                    { key: 'controls', sortable: false, label: '' }
                ],

                unconfirmedProductsFields: [
                    { key: 'id', sortable: true, label: 'ID' },
                    { key: 'name', sortable: true, label: 'Name' },
                    { key: 'category', sortable: true, label: 'Category' },
                    { key: 'controls', sortable: false, label: '' }
                ],

                unconfirmedLocationsSortBy: 'id',
                unconfirmedLocationsSortDesc: true,

                unconfirmedProductsSortBy: 'id',
                unconfirmedProductsSortDesc: true,
            }
        },
        mounted() {
            this.findUnconfirmedLocations();
            this.findUnconfirmedProducts();
        },
        methods: {
            findUnconfirmedLocations() {
                this.$axios
                    .$get(this.$config.baseUrl + '/admin/locations/unconfirmed')
                    .then(response => {
                        this.unconfirmedLocations = response;
                    });
            },
            findUnconfirmedProducts() {
                this.$axios
                    .$get(this.$config.baseUrl + '/admin/marketProducts/unconfirmed')
                    .then(response => {
                        this.unconfirmedProducts = response;
                    });
            },

            confirmLocation(locationId) {
                this.$axios
                    .$put(this.$config.baseUrl + '/admin/locations/' + locationId + '/confirmed/toggle')
                    .then(() => {
                        this.$toast.success('Success');
                        this.findUnconfirmedLocations();
                        console.log(locationId + " approved");
                    })
            },
        }
    }

</script>
