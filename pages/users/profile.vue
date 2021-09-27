
<template>
  <div id="user-profile">
    <h2 class="m-0"><strong>Your profile</strong> to customize</h2>
    <h5>Add more info about yourself here</h5>
    <hr/>
    <b-row>
      <b-col cols="12" lg="8">

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-card img-alt="Image" img-top>
            <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">Info</b-badge> About you</h3>
            <b-card-text class="mt-4">
              <h5>Fill info about yourself to see it on <strong>Profiles</strong> page.</h5> 
            </b-card-text>

            <b-form-group>
              <b-input-group append="Name">
                <b-form-input id="input-1" v-model="form.name" placeholder="Your name" required></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group>
              <b-input-group append="Age">
                <b-form-input id="input-1-1" v-model="form.age" placeholder="Your age" required></b-form-input>
              </b-input-group>
            </b-form-group>
            
            <b-form-group>
              <b-input-group append="Lang">
              <b-form-checkbox-group
                :options="languages"
                button-variant="light"
                name="buttons-1"
                buttons
              ></b-form-checkbox-group>
              </b-input-group>
            </b-form-group>

            <b-form-group>
              <b-input-group append="🏠">
                <b-form-input id="input-2" v-model="form.location" placeholder="Your location: City, Area" required></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group>
              <b-input-group append="🛴">
                <b-form-input id="input-3" v-model="form.transport" placeholder="Your transport model" required></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-form-file
                v-model="form.transportPhoto"
                :state="Boolean(form.transportPhoto)"
                placeholder="Upload transport photo"
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
            <template #footer>
              <b-button class="mr-1" type="submit" variant="primary">Update</b-button>
            </template>
          </b-card>
        </b-form>

      </b-col>
      <b-col cols="12" lg="4">
        
        <div v-if="!$user.isLogged">
          <b-alert show variant="primary" class="d-flex justify-content-center align-items-center">
            <b-button v-b-toggle.sidebar-variant class="mr-3"><b-icon-list></b-icon-list></b-button> Please login with telegram from menu
          </b-alert>
        </div>
        <div v-if="$user.isLogged">
          <b-alert show variant="primary" class="py-4">
            <div class="d-flex justify-content-left align-items-center">
              <b-img  class="float-left" rounded="circle" width="80" height="80" :src="$user.photoUrl"></b-img>
              <div class="ml-4">
                  <h5 class="m-0">{{$user.firstName}}</h5>
                  <a :href='"https://t.me/"+$user.username' target="_blank">@{{$user.username}}</a>
              </div>
            </div>
              <b-list-group class="mt-4">
                <b-list-group-item>Name: </b-list-group-item>
                <b-list-group-item>Age: </b-list-group-item>
                <b-list-group-item>Lang: </b-list-group-item>
                <b-list-group-item>Location:</b-list-group-item>
                <b-list-group-item>Model:</b-list-group-item>
              </b-list-group>
              <b-img fluid :src="require('@/assets/img/step-1.jpg')"></b-img>
          </b-alert>
        </div>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserProfile',
  props: {},
  data() {
    return {
      BACKEND_BASE: 'https://etmap.nuforms.com',
      bgImages: [
        require("@/assets/img/pattern-icons.png"),
        require("@/assets/img/top.jpg"),
        require("@/assets/img/tallinn.svg"),
        require("@/assets/img/mol.svg")
      ],
      form: {
        name: '',
        age: '',
        location: '',
        transport: '',
        transportPhoto: null,
        checked: []
      },
      languages: [
          { text: '🇬🇧', value: 'english' },
          { text: '🇪🇪', value: 'estonian' },
          { text: '🇷🇺', value: 'russian' },
          { text: '🇸🇪', value: 'swedish' },
          { text: '🇪🇸', value: 'spanish' }
        ],
      show: true
    }
  },
  mounted () {
      axios
        .get(this.$root.BACKEND_BASE + '/user')
  },
  methods: {

    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }

  }
}
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

