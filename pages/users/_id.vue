<template>
  <section id="user-profile">
    <MarketProductModal @save="findMarketProducts; getUser" />
    <CoolLightBox 
      :items="items" 
      :index="index"
      :effect="'fade'"
      @close="index = null">
    </CoolLightBox>
    <div class="upper my-3 position-relative d-flex justify-content-center" style="z-index:10">
      <div class="w-100 h-100 position-absolute" style="background-color:rgba(26, 39, 64, 0.7)"></div>
      <div class="overflow-hidden w-100" :style="[user.transportPhotoName ? {'background-size': 'cover','background-position': 'center', 'background-image': 'url(' + $config.baseUrl + '/users/image/' + user.transportPhotoName + ')'} : {'background-image': 'url(' + require('~/assets/img/pattern-icons.png') + ')'}]"></div>
      <b-img class="profile position-absolute shadow" :src="user.photoUrl" rounded="circle" thumbnail/>
      <div class="position-absolute mt-4 bg-transparent text-center">
        <h2 v-if="$user.uin != user.uin" class="m-0 text-info shadow-sm"><strong>{{ user.firstName }}'s profile</strong></h2>
        <h2 v-if="$user.uin === user.uin" class="m-0 text-info shadow-sm"><strong>Your profile</strong></h2>
        <i v-if="user.location" class="text-light shadow-sm">{{ user.location }}</i>
      </div>
      <a v-if="$user.uin === user.uin" v-b-modal.profile-modal @click="onUserEdit" class="position-absolute" style="top:1rem; right:1.5rem;font-size:2rem">
        <b-icon class="shadow-sm" variant="info" icon="pencil-square" />
      </a>
    </div>
    <b-card-group columns>
      <b-card>
        <h3 class="mb-3 font-weight-bold d-flex justify-content-between align-items-center">
          <span>
            <b-badge variant="warning" class="text-white">Profile</b-badge> 
            <span>Info</span>
          </span>
          <a v-if="$user.uin === user.uin" v-b-modal.profile-modal @click="onUserEdit"><b-icon class="align-middle" variant="primary" icon="pencil-square" /></a>
        </h3>
        <b-list-group class="text-left">
          <b-list-group-item variant="light">Name: <strong>{{ user.firstName }}</strong></b-list-group-item>
          <b-list-group-item variant="light" v-if="user.username">Telegram: <a :href="'https://t.me/'+user.username" target="_blank"><strong>{{ user.username }}</strong></a></b-list-group-item>
          <b-list-group-item variant="light" v-if="user.birthyear">Age: <strong>{{ new Date().getFullYear() - user.birthyear }}</strong></b-list-group-item>
          <b-list-group-item variant="light" v-if="user.languages && user.languages.length">Lang: {{ getFlags() }}</b-list-group-item>
          <b-list-group-item variant="light" v-if="user.location">Location: <strong>{{ user.location }}</strong></b-list-group-item>
          <b-list-group-item variant="light" v-if="user.transportModel">Model: <strong>{{ user.transportModel }}</strong></b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card v-if="user.transportPhotoName">
        <figure class="figure mb-0">
        <b-img class="transportImage" @click="index = 0" center fluid rounded :src="$config.baseUrl + '/users/image/' + user.transportPhotoName"></b-img>
        <figcaption class="figure-caption text-center mb-0">{{ user.transportModel }}</figcaption>
        </figure>
      </b-card>
      <b-card>
        <h3 class="mb-3 font-weight-bold d-flex justify-content-between align-items-center">
          <span>
            <b-badge variant="warning" class="text-white">Market</b-badge> 
            <span>Items<sup><b-badge class="text-white ml-2">{{ marketProducts.length }}</b-badge></sup></span>
          </span>
          <span>
            <a v-if="$user.uin === user.uin" v-b-modal.product-modal><b-icon class="align-middle" variant="primary" icon="plus-square" /></a>
          </span>
        </h3>
          <b-table
              class="rounded m-0 productList"
              borderless
              striped
              table-variant="light"
              sticky-header
              :items="marketProducts"
              :fields="marketProductFields"
              :sort-by.sync="marketProductsSortBy"
              :sort-desc.sync="marketProductsSortDesc"
          >

              <template #cell(name)="data">
                <div class="w-100 d-flex justify-content-between align-items-center">
                  <div>
                    <b-avatar v-if="data.item.images[0]" :to="`/market/${data.item.id}`" rounded :src="`${$config.baseFileUrl}/market/${data.item.images[0].fileName}`" size="4.5rem"></b-avatar>
                    <b-avatar v-else :to="`/market/${data.item.id}`" rounded :src="require('@/assets/img/no-image.png')" size="4.5rem"></b-avatar>
                  </div>
                  <div class="ml-3 w-100">
                    <nuxt-link :to="`/market/${data.item.id}`">
                      <h4>{{ cutText(data.item.name, 20) }}</h4>
                    </nuxt-link>
                    <p class="small">{{ cutText(data.item.description, 15) }}</p>
                    <p class="small"><strong>{{ getCat(data.item.category) }}</strong> | <strong>{{ data.item.price }}€</strong></p>
                  </div>
                  <b-button variant="primary" @click="data.toggleDetails" v-if="$user.uin == data.item.userUin">
                    <b-icon icon="pencil-fill" variant="white"/>
                  </b-button>
                </div>
              </template>

              <template #row-details="data">

                    <b-button size="sm" variant="primary" v-b-modal="'product-modal-' + data.item.id">
                      Edit <b-icon icon="pencil-fill" variant="white"/>
                    </b-button>
                    
                    <b-button size="sm" :class="data.item.status == 'ACTIVE' ? 'btn-warning' : 'btn-success'" @click="statusProduct(data.item.id)">
                      Status <b-icon icon="check-circle-fill" variant="white"/>
                    </b-button>
                    <b-button size="sm" variant="danger" v-b-modal="'delete-modal-' + data.item.id">
                      Delete <b-icon icon="trash-fill" variant="white"/>
                    </b-button>

                <MarketProductModal :id="data.item.id" @save="findMarketProducts" />
                <b-modal centered :id="'delete-modal-' + data.item.id" title="Confirm delete">
                  <b-alert class="mb-0" show variant="danger">
                    <h5>Are you sure you want to delete?</h5><strong>Product:</strong> {{data.item.name}}
                  </b-alert>
                  <template #modal-footer="{ cancel, hide }">
                      <b-button variant="danger" size="sm" @click="deleteProduct(data.item.id), hide()">Delete</b-button>
                      <b-button size="sm" @click="cancel()">Cancel</b-button>
                  </template>
                </b-modal>
              </template>

          </b-table>
      </b-card>
      <b-card>
        <h3 class="mb-3 font-weight-bold d-flex justify-content-between align-items-center">
          <span>
            <b-badge variant="warning" class="text-white">Map</b-badge> 
            <span>Locations<sup><b-badge class="text-white ml-2">{{ user.locationsCount }}</b-badge></sup></span>
          </span>
        </h3>
        <b-table
          class="rounded m-0"
          borderless
          striped
          table-variant="light"
          sticky-header
          :items="listFull"
          :fields="fieldsLoc"
        >
          <template #cell(title)="data">
            <h4>{{ data.item.title }}</h4><p class="small">{{ data.item.description }}</p>
          </template>
          <template #cell(type)="data">
            <b-img :src="require(`~/assets/img/icon/${locationIcons[data.item.type]}.svg`)" center fluid-grow class="table-icon" />
          </template>
          <template #cell(imageName)="data">
            <b-button-group size="sm" vertical>
              <b-button v-b-modal="'image-modal-'+data.item.id">Image</b-button>
              <b-button v-b-modal="'map-modal-'+data.item.id" variant="primary" size="sm">Map</b-button>
            </b-button-group>
            <b-modal :id="'image-modal-'+data.item.id" title="Photo" ok-only>
              <b-img :src="$config.baseUrl + '/locations/image/' + data.item.imageName" center fluid />
            </b-modal>
            <b-modal :id="'map-modal-'+data.item.id" title="Point on map" ok-only>
              <iframe width="100%" height="460px" frameBorder="0" :src="'https://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'" />
            </b-modal>
          </template>
        </b-table>
      </b-card>
      <!--<b-card>
        <h3 class="mb-3 font-weight-bold"><b-badge variant="warning" class="text-white">User</b-badge> Achievements</h3>
      </b-card>-->
    </b-card-group>

    <b-modal body-bg-variant="light" header-bg-variant="light" size="xl" body-class="modal-style" scrollable centered id="profile-modal" title="Edit your profile" @ok="handleOk">
      <b-form  @submit.stop.prevent="handleSubmit">
        <b-card-group columns>
          <b-card>
            <div class="text-center mb-3">
              <b-img class="profile shadow" :src="user.photoUrl" rounded="circle" thumbnail />
            </div>
            <h5 class="mb-3">Personal info</h5>
            <b-form-group>
              <b-input-group append="Name">
                <b-form-input id="input-1" v-model="userEdit.firstName" placeholder="Your name" required/>
              </b-input-group>
            </b-form-group>

            <b-form-group>
              <b-input-group append="Birth Year">
                <b-form-input id="input-1-1" v-model="userEdit.birthyear" placeholder="Your birth year" required/>
              </b-input-group>
            </b-form-group>

            <b-form-group>
              <b-input-group append="Home">
                <b-form-input id="input-2" v-model="userEdit.location" placeholder="Your location: City, Area" required/>
              </b-input-group>
            </b-form-group>
            
            <b-form-group class="m-0">
              <b-input-group append="Lng">
                <b-form-checkbox-group
                  v-model="userEdit.languages"
                  :options="languageOptions"
                  button-variant="light"
                  name="buttons-1"
                  buttons
                />
              </b-input-group>
            </b-form-group>
          </b-card>
          <b-card>
            <h5 class="mb-3">Your main electric transport</h5>
            <b-form-group>
              <b-input-group append="Model">
                <b-form-input id="input-3" v-model="userEdit.transportModel" placeholder="Your transport model" required/>
              </b-input-group>
            </b-form-group>
            <b-form-group class="m-0">
              <div class="d-flex mb-3">
                <b-form-file v-model="userEdit.transportPhoto" accept="image/jpeg" placeholder="Transport photo" class="w-auto flex-grow-1"/>
                <b-button v-if="hasImage" variant="danger" class="ml-3" @click="clearImage"><b-icon icon="x" /></b-button>
              </div>
              <b-img v-if="hasImage" :src="imageSrc" fluid block rounded/>
              <div v-if="!hasImage && userEdit.transportPhotoName" class="position-relative">
                <b-img :src="$config.baseUrl + '/users/image/' + userEdit.transportPhotoName" fluid block rounded/>
                <b-button variant="danger" class="m-3 position-absolute btn-close" @click="clearImage"><b-icon icon="x" /></b-button>
              </div>
            </b-form-group>
          </b-card>
        </b-card-group>
      </b-form>
    </b-modal>

  </section>
</template>

<script>
const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  // use the component
  import CoolLightBox from 'vue-cool-lightbox'
  import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  components: {
    CoolLightBox,
  },
  name: 'UserProfile',
  props: {},
  data() {
    return {
      items: [],
      index: null,
      profile: {},
      user: {},
      userEdit: {},
      image: null,
      imageSrc: null,
      bgImages: [
        require("@/assets/img/pattern-icons.png"),
        require("@/assets/img/top.jpg"),
        require("@/assets/img/tallinn.svg"),
        require("@/assets/img/mol.svg")
      ],
      locationIcons: {
        CHARGE: 'icon-charge',
        REPAIR: 'icon-repair',
        AIR: 'icon-air',
        WATER: 'icon-water'
      },
      listFull: [],
      fieldsLoc: [
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
        }
      ],

      marketProducts: [],
      marketProductFields: [
          { key: 'name', sortable: true, label: 'Product' }
      ],
      marketProductsSortBy: 'id',
      marketProductsSortDesc: true,
      catOptions: [
          { text: 'Equipment', value: 'EQUIPMENT' },
          { text: 'Transport', value: 'TRANSPORT' },
          { text: 'Spare parts', value: 'SPARE_PARTS' },
          { text: 'Accessories', value: 'ACCESSORIES' },
          { text: 'Other', value: 'OTHER' }
      ],
      languageOptions: [
          { text: '🇬🇧', value: 'english' },
          { text: '🇪🇪', value: 'estonian' },
          { text: '🇷🇺', value: 'russian' },
          { text: '🇸🇪', value: 'swedish' },
          { text: '🇪🇸', value: 'spanish' }
      ],
      show: true
    }
  },
  computed: {
    hasImage() {
      return !!this.userEdit.transportPhoto;
    }
  },
  created () {
    this.getUser()
    this.getLocList()
    this.findMarketProducts();
  },
  watch: {
    $route () {
     this.getUser();
     this.getLocList();
     this.findMarketProducts();
    },
    'userEdit.transportPhoto'(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then(value => {
              this.imageSrc = value;
            })
            .catch(() => {
              this.imageSrc = null;
            });
        } else {
          this.imageSrc = null;
        }
      }
    }
  },
  methods: {
    getUser() {
      //console.log(this.$nuxt.$route.path)
      this.$axios.$get(`${this.$config.baseUrl}/users/${this.$route.params.id}`).then((response) => {
        this.user = response;
        this.user.languages = (this.user.languages || '').split(',').filter(i => !!i);
        this.items = [{
          title: this.user.transportModel,
          src: this.$config.baseUrl + '/users/image/' + this.user.transportPhotoName
        }]
      });
    },
    getLocList() {
      this.$axios.$get(`${this.$config.baseUrl}/users/${this.$route.params.id}/locations`).then((response) => {
        this.listFull = response;
      });
    },
    getCat(productCat) {
      return this.catOptions.filter(catOption => productCat.includes(catOption.value)).map(catOption => catOption.text).join(", ")
    },
    findMarketProducts() {
        this.$axios.$get(`${this.$config.baseUrl}/users/${this.$route.params.id}/marketProducts`).then((response) => {
            this.marketProducts = response;
            console.log(response)
        });
    },
    deleteProduct(productId) {
      this.$axios
        .$delete(`${this.$config.baseUrl}/users/${this.$route.params.id}/marketProducts/${productId}`)
        .then(() => {
            this.$toast.success('Success');
            this.findMarketProducts();
            this.getUser();
        })
    },
    statusProduct(productId) {
      this.$axios
        .$put(`${this.$config.baseUrl}/users/${this.user.uin}/marketProducts/${productId}/status/toggle`)
        .then(() => {
            this.$toast.success('Success');
            this.findMarketProducts();
        })
    },
    clearImage() {
      if (this.hasImage) {
        this.userEdit.transportPhoto = null;
      } else {
        this.userEdit.transportPhotoName = null;
      }
    },
    getFlags() {
      return this.languageOptions.filter(language => this.user.languages.includes(language.value)).map(language => language.text).join(" ")
    },
    onUserEdit () {
      this.userEdit = Object.assign({}, this.user)
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      const data = Object.assign({}, this.userEdit)
      if (this.imageSrc) data.transportPhoto = this.imageSrc.split(',')[1]
      data.languages = data.languages.join()
      this.$axios.$put(`${this.$config.baseUrl}/users/${this.$route.params.id}`, data).then(() => {
        this.getUser()
        this.$nextTick(() => {
          this.$bvModal.hide('profile-modal')
        })
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
.productList {
    max-height: 512px;
}
</style>
