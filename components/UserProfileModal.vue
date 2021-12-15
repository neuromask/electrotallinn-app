<template>
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
</template>
<script>
const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export default {
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
      marketProducts: [],
      marketProductFields: [
          { key: 'name', sortable: true, label: 'Product' }
      ],
      marketProductsSortBy: 'id',
      marketProductsSortDesc: true,
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
      this.userEdit = JSON.parse(JSON.stringify(this.user));
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      const data = JSON.parse(JSON.stringify(this.userEdit));
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
.text-capitalize:first-letter {
    text-transform:capitalize;
}
</style>

