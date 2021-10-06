<template>
  <div>
    <b-card-group columns>
      <b-card
        v-for="(user, idx) in userTable" :key="idx"
        bg-variant="info"
        no-body
        style="font-size:0.9rem; line-height:1rem;"
      >
      <div class="upper p-2 mb-5 position-relative d-flex justify-content-center align-items-end">
        <div class="overflow-hidden w-100" :style="[user.transportPhoto ? {'background-image': 'url(' + user.transportPhoto + ')'} : {'background-image': 'url(' + require('~/assets/img/pattern-icons.png') + ')'}]"></div>
        <b-img class="profile position-absolute" :src="user.photoUrl" rounded="circle" thumbnail></b-img>
      </div>
        <div class="mt-5 text-center">
            <h4 class="mb-0" role="button" nuxt :to="`users/${user.uin}`">{{ user.firstName }}</h4> 
            <p class="text-muted d-block mb-2" v-if="user.location">{{ user.location }}</p>
            <b-button size="sm" variant="warning" class="text-info" nuxt :to="`users/${user.uin}`"><b-icon icon="person-bounding-box" /> Profile</b-button>
        </div>
        <b-card-body>
          
          <b-list-group class="text-left">
            <b-list-group-item variant="light" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5><b-icon variant="primary" icon="info-circle-fill" /></h5>
              </div>
              <div class="mb-1">
                <p class="m-0" v-if="user.username">Telegram: <strong>{{ user.username }}</strong></p>
                <p class="m-0" v-if="user.birthyear">Age: <strong>{{ new Date().getFullYear() - user.birthyear }}</strong></p>
                <p class="m-0" v-if="user.languages">Lang: {{ getFlags(user.languages) }}</p>
                
                <p class="m-0" v-if="user.transport_model">Model: <strong>{{ user.transportModel }}</strong></p>
              </div>
            </b-list-group-item>
            <b-list-group-item variant="light" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-dark"><strong>Achievements</strong></h5>
                <h5><b-icon variant="warning" icon="trophy-fill" /></h5>
              </div>
              <div class="mb-1 d-flex justify-content-between align-items-center">
                <p class="m-0">Rank</p>
                <b-badge>Captain</b-badge>
              </div>
              <div class="mb-1 d-flex justify-content-between align-items-center">
                <p class="m-0">Market</p>
                <b-badge>14</b-badge>
              </div>
              <div class="mb-1 d-flex justify-content-between align-items-center">
                <p class="m-0">Locations</p>
                <b-badge>3</b-badge>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userTable: [],
      languages: [
        { text: '🇬🇧', value: 'english' },
        { text: '🇪🇪', value: 'estonian' },
        { text: '🇷🇺', value: 'russian' },
        { text: '🇸🇪', value: 'swedish' },
        { text: '🇪🇸', value: 'spanish' }
      ],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$axios
        .$get(this.$config.baseUrl + "/users").then((response) => {
          this.userTable = response;
        });
    },
    getFlags(userLangs) {
      function getByValue(arr, value) {
        var result  = arr.filter(function(o){return o.b == value;} );
        return result? result[0] : null; // or undefined
      }

      const userLangsArr = userLangs.split(',');
      const intersection = this.languages.filter(element => userLangsArr.includes(element));
      console.log(intersection)
    }
  },
};
</script>

<style scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
.upper>div {
    height: 150px;
    background-color: #1a2740;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.card {
  border-radius: 10px;
}

.profile {
    width: 10rem;
    bottom:-3rem;
}
</style>
