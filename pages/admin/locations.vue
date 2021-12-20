<template>
    <section id="admin">
        <b-row>
            <b-col cols="12">
                <h3>
                    <b-badge variant="warning" class="text-white font-weight-bold">List</b-badge>
                    Locations
                </h3>
                <hr/>
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
                        <p><strong>{{ data.item.title }}</strong></p>
                        <p>{{ data.item.description }}</p>
                        <small>Added by: {{ data.item.userFirstName }}</small>
                    </template>
                    <template #cell(id)="data">
                        <h5 class="text-center">{{data.item.id}}</h5>
                        <b-img :src="$locationIcons[data.item.type]" center fluid class="table-icon"/>
                    </template>
                    <template #cell(imageName)="data">
                        <div class="d-inline-block my-1">
                            <b-button-group size="sm">
                                <b-button size="sm" v-b-modal="'image-modal-'+data.item.id">Image</b-button>
                                <b-button variant="primary" size="sm" v-b-modal="'map-modal-'+data.item.id">Map</b-button>
                            </b-button-group>
                            <b-modal :id="'image-modal-'+data.item.id" title="Photo" ok-only>
                                <b-img style="max-height: 500px;" :src="$config.apiUrl + '/locations/image/' + data.item.imageName + '?cache='+cacheKey" center fluid></b-img>
                                <template #modal-footer="{ ok }">
                                    <b-button variant="secondary" @click="rotateImage(data.item.image, data.item.imageName)">Rotate </b-button>
                                    <b-button variant="primary" @click="ok()">Ok</b-button>
                                </template>
                            </b-modal>
                            <b-modal :id="'map-modal-'+data.item.id" title="Point on map" ok-only>
                                <iframe width="100%" height="460px" frameBorder="0"
                                        :src="'https://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'"></iframe>
                            </b-modal>
                        </div>
                        <div class="d-inline-block my-1">
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
                                <b-table borderless striped :fields="fieldsReport" :items="locationReports" :sort-by="sortBy" :sort-desc="sortDesc" >
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
                                <b-form-select v-model="data.item.type" class="mb-2 mr-sm-2 mb-sm-0" :options="$locationTypes"/>
                                <b-button variant="primary" @click="updateLoc(data.item.id, data.item)">Update </b-button>
                            </b-form>
                        </b-card>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </section>
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
                listFull: [],
                sortBy: 'id',
                sortDesc: true,
                fieldsLoc: [
                    {
                        key: 'id',
                        sortable: true,
                        label: 'ID'
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
                    .$get(this.$config.apiUrl + '/admin/locations')
                    .then(response => {
                        this.listFull = response;
                    });
            },
            deleteLoc(locId) {
                this.$axios
                    .$delete(this.$config.apiUrl + '/admin/locations/' + locId)
                    .then(() => {
                        this.$toast.success('Success');
                        this.requests();
                        console.log(locId + " deleted");
                    })
            },
            statusLoc(locId) {
                this.$axios
                    .$put(this.$config.apiUrl + '/admin/locations/' + locId + '/confirmed/toggle')
                    .then(() => {
                        this.$toast.success('Success');
                        this.requests();
                        console.log(locId + " approved");
                    })
            },
            updateLoc(locId, location) {
                this.$axios
                    .$put(this.$config.apiUrl + '/admin/locations/' + locId, location)
                    .then(() => {
                        this.$toast.success('Success');
                        this.requests();
                        console.log(locId + " updated");
                    })
            },
            rotateImage(image, imageName) {
                this.$axios
                    .$put(this.$config.apiUrl + '/admin/locations/image/rotate/' + imageName)
                    .then(() => {
                        this.$toast.success('Success');
                        this.requests();
                        this.cacheKey = +new Date();
                        console.log(imageName + " rotated");
                    })
            },
            getReports(locId) {
                this.$axios
                .$get(this.$config.apiUrl + '/admin/locations/' + locId + '/reports')
                .then(response => {
                    this.locationReports = response;
                    console.log(this.locationReports)
                });
            },
            deleteReport(locId, repId) {
                this.$axios
                    .$delete(this.$config.apiUrl + '/admin/locations/' + locId + '/reports/' + repId)
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
