<template>
  <div id="user-profile">
    <h2 v-if="$user.uin != user.uin" class="m-0"><strong>{{ user.first_name }}'s profile</strong> page</h2>
    <h2 v-if="$user.uin === user.uin" class="m-0"><strong>Your profile</strong> page</h2>
    <hr/>

    <b-card
      bg-variant="light"
      no-body
      class="border-0"
    >
    <div class="upper mb-5 position-relative d-flex justify-content-center">
      <div class="overflow-hidden w-100" :style="[user.transport_photo2 ? {'background-image': 'url(' + user.transport_photo + ')'} : {'background-image': 'url(' + require('~/assets/img/pattern-icons.png') + ')'}]"></div>
      <b-img class="profile position-absolute" :src="user.photo_url" rounded="circle" thumbnail></b-img>
    </div>
      <b-row class="mt-4">
        <b-col cols="12" lg="6">
          <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">Profile</b-badge> Information</h3>
          <a v-if="$user.uin === user.uin" v-b-modal.profile-modal class="position-absolute" style="top:0; right:15px;font-size:2rem"><b-icon icon="pencil-square" /></a>
          <b-list-group class="text-left">
            <b-list-group-item>Name: {{ user.first_name }}</b-list-group-item>
            <b-list-group-item v-if="user.username">Telegram: {{ user.username }}</b-list-group-item>
            <b-list-group-item v-if="user.birthyear">Age: {{ new Date().getFullYear() - user.birthyear }}</b-list-group-item>
            <b-list-group-item v-if="user.languages">Lang: {{ user.languages }}</b-list-group-item>
            <b-list-group-item v-if="user.location">Location: {{ user.location }}</b-list-group-item>
            <b-list-group-item v-if="user.transport_model">Model: {{ user.transport_model }}</b-list-group-item>
          </b-list-group>
          <b-img class="mb-3" v-if="user.transport_photo" center thumbnail fluid rounded="circle" :src="require('@/assets/img/step-1.jpg')"></b-img>
        </b-col>
        <b-col cols="12" lg="6">
          <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">User</b-badge> Achievements</h3>
        </b-col>
      </b-row>
    </b-card>

  <b-modal id="profile-modal" title="Edit your profile">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group>
              <b-input-group append="Name">
                <b-form-input id="input-1" v-model="user.first_name" placeholder="Your name" required></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group>
              <b-input-group append="Birth Year">
                <b-form-input id="input-1-1" v-model="user.birthyear" placeholder="Your birth year" required></b-form-input>
              </b-input-group>
            </b-form-group>
            
            <b-form-group>
              <b-input-group append="Lang">
              <b-form-checkbox-group
                :options="user.languages"
                button-variant="light"
                name="buttons-1"
                buttons
              ></b-form-checkbox-group>
              </b-input-group>
            </b-form-group>

            <b-form-group>
              <b-input-group append="🏠">
                <b-form-input id="input-2" v-model="user.location" placeholder="Your location: City, Area" required></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group>
              <b-input-group append="🛴">
                <b-form-input id="input-3" v-model="user.transport_model" placeholder="Your transport model" required></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-form-file
                v-model="user.transport_photo"
                :state="Boolean(user.transport_photo)"
                placeholder="Upload transport photo"
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
            <template #footer>
              <b-button class="mr-1" type="submit" variant="primary">Update</b-button>
            </template>
        </b-form>
  </b-modal>




  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  props: {},
  data() {
    return {
      profile: {},
      user: {},
      bgImages: [
        require("@/assets/img/pattern-icons.png"),
        require("@/assets/img/top.jpg"),
        require("@/assets/img/tallinn.svg"),
        require("@/assets/img/mol.svg")
      ],
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
  created () {
    this.getUser();
  },
  watch: {
    $route () {
     this.getUser();
    },
  },
  methods: {
    getUser () {
      this.$axios
        .$get(`${this.$config.baseUrl}/users/${this.$route.params.id}`).then((response) => {
        this.user = response;
      });
    },

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
