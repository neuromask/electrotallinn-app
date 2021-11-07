<template>
    <div id="admin">
        <h2 class="m-0">Admin area</h2>
        <hr/>
        <b-row>
            <b-col cols="12">
                <h3>
                    <b-badge variant="warning" class="text-white font-weight-bold">List</b-badge>
                    Locations
                </h3>
                <b-table 
                class="bg-info" 
                borderless 
                striped 
                hover 
                :items="listFull" 
                :fields="fieldsLoc"
                :sort-by="sortBy"
                :sort-desc="sortDesc"
                >
                    <template #cell(title)="data">
                        <h4>{{ data.item.title }}</h4>
                        <p>{{ data.item.description }}</p>
                        <small>Added by: {{ data.item.userFirstName }}</small>
                    </template>
                    <template #cell(type)="data">
                        <b-img :src="locationIcons[data.item.type]" center fluid class="table-icon"/>
                    </template>
                    <template #cell(imageName)="data">
                        <div>
                            <b-button-group size="sm">
                                <b-button size="sm" v-b-modal="'image-modal-'+data.item.id">Image</b-button>
                                <b-button variant="primary" size="sm" v-b-modal="'map-modal-'+data.item.id">Map</b-button>
                            </b-button-group>
                        </div>
                        <b-modal :id="'image-modal-'+data.item.id" title="Photo" ok-only>
                            <b-img style="max-height: 500px;" :src="$config.baseUrl + '/locations/image/' + data.item.imageName + '?cache='+cacheKey" center fluid></b-img>
                            <template #modal-footer="{ ok }">
                                <b-button variant="secondary" @click="rotateImage(data.item.image, data.item.imageName)">Rotate </b-button>
                                <b-button variant="primary" @click="ok()">Ok</b-button>
                            </template>
                        </b-modal>
                        <b-modal :id="'map-modal-'+data.item.id" title="Point on map" ok-only>
                            <iframe width="100%" height="460px" frameBorder="0"
                                    :src="'https://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'"></iframe>
                        </b-modal>
                    </template>
                    <template #cell(id)="data">
                        {{data.item.id}}
                    </template>
                    <template #cell(show_details)="data">
                        <div>
                            <b-button-group size="sm">
                                <b-button variant="primary">
                                    <b-icon icon="pencil-fill" @click="data.toggleDetails" variant="white"/>
                                </b-button>
                                <b-button :class="data.item.confirmed == 0 ? 'btn-warning' : 'btn-success'" @click="statusLoc(data.item.id)">
                                    <b-icon icon="check-circle-fill" variant="white"/>
                                </b-button>
                                <b-button variant="danger" v-b-modal="'delete-modal-'+data.item.id">
                                    <b-icon icon="trash-fill" variant="white"/>
                                </b-button>
                                <b-button v-if="data.item.hasReports" variant="warning" v-b-modal="'report-modal-'+data.item.id" @click="getReports(data.item.id)">
                                    <b-icon icon="exclamation-triangle" variant="white"/>
                                </b-button>
                            </b-button-group>
                            <b-modal centered :id="'delete-modal-'+data.item.id" title="Confirm delete">
                                Are you sure you want to delete?<br/>ID: {{data.item.id}}<br/>Name: {{data.item.title}}
                                <template #modal-footer="{ cancel, hide }">
                                    <b-button variant="primary" size="sm" @click="deleteLoc(data.item.id), hide()">OK</b-button>
                                    <b-button size="sm" @click="cancel()">Cancel</b-button>
                                </template>
                            </b-modal>
                            <b-modal size="xl" centered :id="'report-modal-'+data.item.id" title="Reports" ok-only>
                                <b-table
                                    borderless
                                    striped
                                    :fields="fieldsReport"
                                    :items="locationReports" 
                                    :sort-by="sortBy"
                                    :sort-desc="sortDesc"
                                    >
                                    <template #cell(delete)="data">
                                        <b-button variant="danger" @click="deleteReport(data.item.locationId, data.item.id)">
                                            <b-icon icon="trash-fill" variant="white"/>
                                        </b-button>
                                    </template>
                                </b-table>
                            </b-modal>
                        </div>
                    </template>
                    <template #row-details="data">
                        <b-card>
                            <b-form inline>
                                <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-model="data.item.title"/>
                                <b-form-input id="inline-form-input-username" class="mb-2 mr-sm-2 mb-sm-0" v-model="data.item.description"/>
                                <b-form-select v-model="data.item.type" class="mb-2 mr-sm-2 mb-sm-0" :options="locationTypes"/>
                                <b-button variant="primary" @click="updateLoc(data.item.id, data.item)">Update </b-button>
                            </b-form>
                        </b-card>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Map',
        props: {},
        data() {
            return {
                locationReports: [],
                componentKey: 0,
                cacheKey: +new Date(),
                bgImages: [
                    require("@/assets/img/pattern-icons.png"),
                    require("@/assets/img/top.jpg"),
                    require("@/assets/img/tallinn.svg"),
                    require("@/assets/img/mol.svg")
                ],
                locationIcons: {
                    CHARGE: require("@/assets/img/icon/icon-charge.svg"),
                    REPAIR: require('@/assets/img/icon/icon-repair.svg'),
                    AIR: require('@/assets/img/icon/icon-air.svg'),
                    WATER: require('@/assets/img/icon/icon-water.svg')
                },
                locationTypes: [
                    {value: 'CHARGE', text: 'Charge'},
                    {value: 'REPAIR', text: 'Repair'},
                    {value: 'AIR', text: 'Air'},
                    {value: 'WATER', text: 'Water'}
                ],
                listFull: [],
                sortBy: 'id',
                sortDesc: true,
                fieldsLoc: [
                    {
                        key: 'id',
                        sortable: false,
                        label: 'ID'
                    },
                    {
                        key: 'type',
                        sortable: true,
                        label: 'Type'
                    },
                    {
                        key: 'title',
                        sortable: true,
                        label: 'Name'
                    },
                    {
                        key: 'imageName',
                        sortable: false,
                        label: 'Info'
                    },
                    {
                        key: 'show_details',
                        sortable: false,
                        label: ''
                    }
                ],
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
            this.requests();
        },
        methods: {
            requests() {
                this.$axios
                    .$get(this.$config.baseUrl + '/locations')
                    .then(response => {
                        this.listFull = response;
                    });
            },
            deleteLoc(locId) {
                this.$axios
                    .$delete(this.$config.baseUrl + '/locations/' + locId)
                    .then(() => {
                        this.$toast.success('Success');
                        this.requests();
                        console.log(locId + " deleted");
                    })
            },
            statusLoc(locId) {
                this.$axios
                    .$put(this.$config.baseUrl + '/locations/' + locId + '/confirmed/toggle')
                    .then(() => {
                        this.$toast.success('Success');
                        this.requests();
                        console.log(locId + " approved");
                    })
            },
            updateLoc(locId, location) {
                this.$axios
                    .$put(this.$config.baseUrl + '/locations/' + locId, location)
                    .then(() => {
                        this.$toast.success('Success');
                        this.requests();
                        console.log(locId + " updated");
                    })
            },
            rotateImage(image, imageName) {
                this.$axios
                    .$put(this.$config.baseUrl + '/locations/image/rotate/' + imageName)
                    .then(() => {
                        this.$toast.success('Success');
                        this.requests();
                        this.cacheKey = +new Date();
                        console.log(imageName + " rotated");
                    })
            },
            getReports(locId) {
                this.$axios
                .$get(this.$config.baseUrl + '/locations/' + locId + '/reports')
                .then(response => {
                    this.locationReports = response;
                    console.log(this.locationReports)
                });
            },
            deleteReport(locId, repId) {
                this.$axios
                    .$delete(this.$config.baseUrl + '/locations/' + locId + '/reports/' + repId)
                    .then(() => {
                        this.$toast.success('Success');
                        this.getReports(locId);
                        this.requests();
                        console.log(repId + " deleted");
                    })
            },
        }
    }
    // d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
