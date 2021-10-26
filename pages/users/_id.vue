<template>
  <div id="user-profile" class="position-relative">
    <h2 v-if="$user.uin != user.uin" class="m-0"><strong>{{ user.firstName }}'s profile</strong></h2>
    <h2 v-if="$user.uin === user.uin" class="m-0"><strong>Your profile</strong></h2>
    <a v-if="$user.uin === user.uin" v-b-modal.profile-modal @click="onUserEdit" class="position-absolute" style="top:0; right:15px;font-size:2rem"><b-icon icon="pencil-square" /></a>
    <hr/>

    <b-card bg-variant="light" no-body class="border-0">
      <div class="upper mb-5 position-relative d-flex justify-content-center">
          <div class="overflow-hidden w-100" :style="[user.transportPhoto ? {'background-image': 'url(' + user.transportPhoto + ')'} : {'background-image': 'url(' + require('~/assets/img/pattern-icons.png') + ')'}]"></div>
          <b-img class="profile position-absolute" :src="user.photoUrl" rounded="circle" thumbnail/>
      </div>
      <h3 class="my-3 font-weight-bold"><b-badge variant="warning" class="text-white">Profile</b-badge> Information</h3>
      <b-row>
        <b-col cols="12" lg="6">
          <b-list-group class="text-left">
            <b-list-group-item>Name: {{ user.firstName }}</b-list-group-item>
            <b-list-group-item v-if="user.username">Telegram: {{ user.username }}</b-list-group-item>
            <b-list-group-item v-if="user.birthyear">Age: {{ new Date().getFullYear() - user.birthyear }}</b-list-group-item>
            <b-list-group-item v-if="user.languages && user.languages.length">Lang: {{ getFlags() }}</b-list-group-item>
            <b-list-group-item v-if="user.location">Location: {{ user.location }}</b-list-group-item>
            <b-list-group-item v-if="user.transportModel">Model: {{ user.transportModel }}</b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col cols="12" lg="6">
          <b-img v-if="user.transportPhotoName" center fluid rounded :src="$config.baseUrl + '/users/image/' + user.transportPhotoName"></b-img>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="12" lg="6">
          <h3 class="my-3 font-weight-bold"><b-badge variant="warning" class="text-white">Locations</b-badge> Added</h3>
          <b-table
            class="bg-info rounded"
            borderless
            striped
            hover
            sticky-header
            :items="listFull"
            :fields="fieldsLoc"
          >
            <template #cell(title)="data">
              <h4>{{ data.item.title }}</h4><p>{{ data.item.description }}</p>
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
        </b-col>
        <b-col cols="12" lg="6">
          <h3 class="my-3 font-weight-bold"><b-badge variant="warning" class="text-white">Market</b-badge> Items</h3>
          <h3 class="my-3 font-weight-bold"><b-badge variant="warning" class="text-white">User</b-badge> Achievements</h3>
        </b-col>
      </b-row>
    </b-card>

  <b-modal id="profile-modal" title="Edit your profile" @ok="handleOk">
      <b-form  @submit.stop.prevent="handleSubmit">
        <h5>Personal info</h5>
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
          <b-input-group append="🏠">
            <b-form-input id="input-2" v-model="userEdit.location" placeholder="Your location: City, Area" required/>
          </b-input-group>
        </b-form-group>
        
        <b-form-group>
          <b-input-group append="Lang">
              <b-form-checkbox-group
                v-model="userEdit.languages"
                :options="languageOptions"
                button-variant="light"
                name="buttons-1"
                buttons
              />
          </b-input-group>
        </b-form-group>
        <hr />
        <h5>Your main electric transport</h5>
        <b-form-group>
          <b-input-group append="🛴">
            <b-form-input id="input-3" v-model="userEdit.transportModel" placeholder="Your transport model" required/>
          </b-input-group>
        </b-form-group>
        <b-form-group class="m-0">
          <div class="d-flex mb-3">
            <b-form-file v-model="userEdit.transportPhoto" accept="image/jpeg" placeholder="Choose transport photo" class="w-auto flex-grow-1"/>
            <b-button v-if="hasImage" variant="danger" class="ml-3" @click="clearImage"><b-icon icon="x" /></b-button>
          </div>
          <b-img v-if="hasImage" :src="imageSrc" class="p-3 bg-light" fluid block rounded/>
          <div v-if="!hasImage && userEdit.transportPhotoName" class="position-relative">
            <b-img :src="$config.baseUrl + '/users/image/' + userEdit.transportPhotoName" class="p-3 bg-light" fluid block rounded/>
            <b-button variant="danger" class="m-3 position-absolute" @click="clearImage"><b-icon icon="x" /></b-button>
          </div>
        </b-form-group>
    </b-form>
  </b-modal>

  </div>
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
  name: 'UserProfile',
  props: {},
  data() {
    return {
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
    this.getUser();
  },
  watch: {
    $route () {
     this.getUser();
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
  async mounted () {
    this.listFull = await this.$axios.$get(`${this.$config.baseUrl}/users/${this.$route.params.id}/locations`)
  },
  methods: {
    getUser () {
      this.$axios.$get(`${this.$config.baseUrl}/users/${this.$route.params.id}`).then((response) => {
        this.user = response;
        console.log(response);
        this.user.languages = (this.user.languages || '').split(',').filter(i => !!i);
      });
    },
    clearImage() {
      if (this.hasImage) {
        this.userEdit.transportPhoto = null;
      } else {
        this.userEdit.transportPhotoName = null;
      }
    },
    getFlags () {
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
      console.log(this.imageSrc)
      data.languages = data.languages.join()
      this.$axios.$put(`${this.$config.baseUrl}/users/${this.$route.params.id}`, data).then(() => {
        this.getUser()
        this.$nextTick(() => {
          this.$bvModal.hide('profile-modal')
        })
      });
    }
  }
}
// d-flex justify-content-center align-items-center
</script>

<style scoped>
.upper>div {
    height: 250px;
    background-color: #1a2740;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.profile {
    width: 15rem;
    bottom:-3rem;

}
</style>
