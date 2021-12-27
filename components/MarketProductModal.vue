<template>
    <b-modal body-bg-variant="light" header-bg-variant="light" size="xl" body-class="modal-style" scrollable centered :cancel-title="$t('action.cancel')" :id="modalId" :title="title" @ok="handleOk" @show="handleModalShow">
        
            <b-form @submit.stop.prevent="handleSubmit">
                <b-card-group columns>
                    <b-card>
                        <h3 class="mb-0 font-weight-bold">{{ $t('main.info') }}</h3>
                        <hr>
                        <b-form-group :label="$t('main.name')">
                            <b-form-input v-model="productEdit.name" :placeholder="$t('main.name')" required/>
                        </b-form-group>
                        <b-form-group :label="$t('main.description')">
                            <b-form-textarea
                                v-model="productEdit.description"
                                :placeholder="$t('main.description')"
                                rows="3"
                                required
                                max-rows="6"
                            ></b-form-textarea>
                        </b-form-group>
                        <b-form-group :label="$t('main.price')">
                            <b-form-input type="number" v-model="productEdit.price" :placeholder="$t('main.productPrice')" required/>
                        </b-form-group>
                        <b-form-group :label="$t('main.category')">
                            <b-form-select v-model="productEdit.category" :options="categoryOptions" required>
                                <template #first>
                                    <b-form-select-option :value="null" disabled>{{ $t('main.selectCategory') }}</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-card>

                    <b-card>
                        <h3 class="mb-0 font-weight-bold">{{ $t('main.photo') }} <span v-if="productEdit.images">({{productEdit.images.length}}/3)</span></h3>
                        <hr>
                        <b-form-group class="m-0">
                            <div class="d-flex mb-3">
                                <b-form-file v-model="selectedImage" accept="image/jpeg" :placeholder="$t('main.selectPhoto')" class="w-auto flex-grow-1"><b-icon icon="search" /></b-form-file>
                            </div>
                            <b-row>
                                <b-col cols="12" md="6" lg="4" class="mb-0 position-relative" v-for="(image, imageIndex) in productEdit.images" :key="imageIndex">
                                    <b-button size="sm" variant="danger" class="image-delete position-absolute" @click="handleImageDelete(imageIndex)"><b-icon icon="x" /></b-button>
                                    <b-img v-if="image.fileB64" class="image" thumbnail :src="image.fileB64"/>
                                    <b-img v-if="image.fileName" class="image" thumbnail :src="`${$config.baseFileUrl}/market/${image.fileName}`"/>
                                </b-col>
                            </b-row>
                        </b-form-group>
                    </b-card>

                    <b-card v-if="!$user.uin">
                        <h5 class="mb-3">{{ $t('main.warning') }}</h5>
                        <b-alert class="mt-3 mb-0" show variant="warning">
                            <i18n path="main.addUserName" tag="p" class="mb-0">
                                <strong>{{ $t('main.username') }}</strong>
                            </i18n>                        
                        </b-alert>
                    </b-card>
                </b-card-group>
            </b-form>
    </b-modal>
</template>
<script>
    const base64Encode = data => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    export default {
        props: {
            id: null
        },
        data() {
            return {
                productEdit: {
                    category: null,
                    images: []
                },
                selectedImage: null,
                show: true,
            }
        },
        computed: {
            modalId() {
                return this.id ? `product-modal-${this.id}` : 'product-modal'
            },
            title() {
                return this.id ? `${this.$t('main.editProduct')}` : this.$t('main.addProduct')
            },
            categoryOptions() {
                return [
                    { text: this.$t('market.category.EQUIPMENT'), value: 'EQUIPMENT' },
                    { text: this.$t('market.category.TRANSPORT'), value: 'TRANSPORT' },
                    { text: this.$t('market.category.SPARE_PARTS'), value: 'SPARE_PARTS' },
                    { text: this.$t('market.category.ACCESSORIES'), value: 'ACCESSORIES' },
                    { text: this.$t('market.category.OTHER'), value: 'OTHER' }
                ]
            }
        },
        watch: {
            'selectedImage'(newValue, oldValue) {
                if (newValue !== oldValue && newValue) {
                    base64Encode(newValue).then(value => {
                        this.productEdit.images.push({ fileB64: value });
                        this.selectedImage = null
                    });
                }
            }
        },
        methods: {
            getProduct () {
                this.$axios.$get(`${this.$config.apiUrl}/marketProducts/${this.id}`).then((response) => {
                    this.productEdit = response;
                });
            },
            handleImageDelete(idx) {
                this.productEdit.images.splice(idx, 1)
            },
            handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault();

                // Trigger submit handler
                this.handleSubmit()
            },
            handleSubmit() {
                const data = JSON.parse(JSON.stringify(this.productEdit));
                data.images.forEach(image => {
                    if (image.fileB64) {
                        image.fileB64 = image.fileB64.split(',')[1]
                    }
                });

                if (this.id) {
                    this.$axios.$put(`${this.$config.apiUrl}/marketProducts/${this.id}`, data).then(() => {
                        this.$toast.success('Success');
                        this.$nextTick(() => {
                            this.$emit('save');
                            this.$bvModal.hide(this.modalId)
                        })
                    });
                } else {
                    this.$axios.$post(`${this.$config.apiUrl}/marketProducts`, data).then(() => {
                        this.$toast.success('Success');
                        this.$nextTick(() => {
                            this.$emit('save');
                            this.$bvModal.hide(this.modalId)
                        })
                    });
                }
            },
            handleModalShow() {
                if (this.id) {
                    this.getProduct()
                } else {
                    this.productEdit = {
                        category: null,
                        images: []
                    }
                }
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
    .image-delete,
    .btn-close {
        top:0; right:15px;
    }
    @media (min-width: 576px) {
        .card-columns {
            column-count: 2;
        }
    }
    .transportImage {
        cursor: pointer;
    }
</style>
