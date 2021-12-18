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
                            <b-modal :id="'image-modal-'+data.item.id" :title="$t('main.photo') +' - '+ data.item.title" ok-only>
                                <b-img :src="$config.apiUrl + '/locations/image/' + data.item.imageName" center fluid />
                            </b-modal>
                            <b-modal :id="'map-modal-'+data.item.id" :title="$t('main.pointOnMap') +' - '+ data.item.title" ok-only>
                                <iframe width="100%" height="460px" frameBorder="0" :src="'https://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'" />
                            </b-modal>
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
                        <b-modal centered :id="'delete-modal-'+data.item.id" title="Confirm delete">
                                Are you sure you want to delete?<br/>ID: {{data.item.id}}<br/>Name: {{data.item.title}}
                                <template #modal-footer="{ cancel, hide }">
                                    <b-button variant="primary" size="sm" @click="deleteLoc(data.item.id), hide()">OK</b-button>
                                    <b-button size="sm" @click="cancel()">Cancel</b-button>
                                </template>
                            </b-modal>
                            <b-modal size="xl" centered :id="'report-modal-'+data.item.id" title="Reports" ok-only>
                                <b-table borderless striped :fields="fieldsReport" :items="locationReports" :sort-by="sortBy" :sort-desc="sortDesc" >
                                    <template #cell(delete)="data">
                                        <b-button variant="danger" @click="deleteReport(data.item.locationId, data.item.id)">
                                            <b-icon icon="trash-fill" variant="white"/>
                                        </b-button>
                                    </template>
                                </b-table>
                            </b-modal>
                    </template>
                    <template #row-details="data">
                        <b-card>
                            <b-form inline>
                                <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-model="data.item.title"/>
                                <b-form-input id="inline-form-input-username" class="mb-2 mr-sm-2 mb-sm-0" v-model="data.item.description"/>
                                <b-form-select v-model="data.item.type" class="mb-2 mr-sm-2 mb-sm-0" :options="$locationTypes"/>
                                <b-button variant="primary" @click="updateLoc(data.item.id, data.item)">Update </b-button>
                            </b-form>
                        </b-card>
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
                sortBy: 'id',
                sortDesc: true,
                locationReports: [],
                fieldsReport: [
                    {
                        key: 'dateCreated',
                        sortable: true,
                        label: 'Date'
                    },
                    {
                        key: 'userFirstName',
                        sortable: false,
                        label: 'Who Reported'
                    },
                    {
                        key: 'message',
                        label: 'Message'
                    },
                    {
                        key: 'userUin',
                        sortable: false,
                        label: 'Reporter UIN'
                    },
                    {
                        key: 'id',
                        label: 'ID'
                    },
                    {
                        key: 'delete',
                        label: 'Delete'
                    }
                ]
            }
        },
        mounted() {
            this.findUnconfirmedLocations();
            this.findUnconfirmedProducts();
        },
        methods: {
            findUnconfirmedLocations() {
                this.$axios
                    .$get(this.$config.apiUrl + '/admin/locations/unconfirmed')
                    .then(response => {
                        this.unconfirmedLocations = response;
                    });
            },
            findUnconfirmedProducts() {
                this.$axios
                    .$get(this.$config.apiUrl + '/admin/marketProducts/unconfirmed')
                    .then(response => {
                        this.unconfirmedProducts = response;
                    });
            },

            confirmLocation(locationId) {
                this.$axios
                    .$put(this.$config.apiUrl + '/admin/locations/' + locationId + '/confirmed/toggle')
                    .then(() => {
                        this.$toast.success('Success');
                        this.findUnconfirmedLocations();
                        console.log(locationId + " approved");
                    })
            },
        }
    }

</script>
