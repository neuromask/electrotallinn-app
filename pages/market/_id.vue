<template>
  <section id="product-page">
    <CoolLightBox 
      :items="items" 
      :index="index"
      :effect="'fade'"
      @close="index = null">
    </CoolLightBox>
    <h2 class="mb-3" variant="light" v-if="product.name">{{ product.name }}</h2>
    <b-card-group columns>
      <b-card v-if="product.transportPhotoName">
        <b-img class="transportImage" @click="index = 0" center fluid rounded :src="$config.baseUrl + '/users/image/' + product.transportPhotoName"></b-img>
      </b-card>

      <b-card>
        <h3 class="mb-3 font-weight-bold"><b-badge variant="warning" class="text-white">Product</b-badge> Information</h3>
        <b-list-group class="text-left">
          <b-list-group-item variant="light" v-if="product.name">Name: <strong>{{ product.name }}</strong></b-list-group-item>
          <b-list-group-item variant="light" v-if="product.description">Decription<br />{{ product.description }}</b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card>
        <h3 class="mb-3 font-weight-bold"><b-badge variant="warning" class="text-white">User</b-badge> Information</h3>
        <b-list-group class="text-left">
          <b-list-group-item variant="light" v-if="product.userFirstName">Added by: <nuxt-link :to="`/users/${product.userUin}`"><strong>{{ product.userFirstName }}</strong></nuxt-link></b-list-group-item>
          <b-list-group-item variant="light" v-if="product.userUin">User UIN: <strong>{{ product.userUin }}</strong></b-list-group-item>
          <p class="m-0" v-if="product.username">Telegram: <a :href="'https://t.me/'+product.username" target="_blank"><strong>{{ product.username }}</strong></a></p>
        </b-list-group>
        <b-alert class="mt-3 mb-0" show variant="warning">
          <p class="mb-0">Join <a href="https://t.me/electrotallinn" target="_blank"><strong>ElectroTallinn</strong></a> Telegram channel and find user by name: <strong>{{ product.userFirstName }}</strong></p>
        </b-alert>
      </b-card>
      <b-card class="images">
        <h3 class="mb-3 font-weight-bold"><b-badge variant="warning" class="text-white">Product</b-badge> Image</h3>
        <div class="row">
          <div class="col-sm-6 mb-0" v-for="(image, imageIndex) in items" :key="imageIndex">
            <b-img
              class="image"
              thumbnail
              @click="index = imageIndex"
              :src="image.src"
            ></b-img>
          </div>
        </div>
      </b-card>
    </b-card-group>

    <b-modal body-bg-variant="light" header-bg-variant="light" size="xl" body-class="modal-style" scrollable centered id="profile-modal" title="Edit your profile" @ok="handleOk">
      <b-form  @submit.stop.prevent="handleSubmit">
        <b-card-group columns>
          <b-card>
            <div class="text-center mb-3">
              <b-img class="profile shadow" :src="product.photoUrl" rounded="circle" thumbnail />
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
      product: {},
      userEdit: {},
      image: null,
      imageSrc: null,
      bgImages: [
        require("@/assets/img/pattern-icons.png"),
        require("@/assets/img/top.jpg"),
        require("@/assets/img/tallinn.svg"),
        require("@/assets/img/mol.svg")
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
    this.getProduct()
    //this.getUserProducts()
  },
  watch: {
    $route () {
     this.getProduct();
     //this.getUserProducts();
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
    getProduct () {
      console.log(this.$nuxt.$route.path)
      this.$axios.$get(`${this.$config.baseUrl}/marketProducts/${this.$route.params.id}`).then((response) => {
        this.product = response;
        console.log(response);
        this.items = this.product.images.map(img => ({
          title: this.product.name,
          src: this.$config.baseFileUrl + '/market/' + img.fileName
        }))
        console.log(this.items)
      });
    },
    getUserProducts () {
      this.$axios.$get(`${this.$config.baseUrl}/users/${this.$route.params.id}/locations`).then((response) => {
        this.listFull = response;
      });
    },
    clearImage() {
      if (this.hasImage) {
        this.userEdit.transportPhoto = null;
      } else {
        this.userEdit.transportPhotoName = null;
      }
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
      console.log(this.imageSrc)
      data.languages = data.languages.join()
      this.$axios.$put(`${this.$config.baseUrl}/users/${this.$route.params.id}`, data).then(() => {
        this.getProduct()
        this.$nextTick(() => {
          this.$bvModal.hide('profile-modal')
        })
      });
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
}
.images > img:last-child {
  margin-bottom: 0!important;
}
</style>
