<template>
  <div>
    <b-row>
      <b-col cols="12" md="6" lg="4" class="mb-4" v-for="(user, idx) in userTable" :key="idx">
        <b-card
          bg-variant="info"
          no-body
          style="font-size:0.9rem; line-height:1rem;"
          >
          <div class="upper p-3 position-relative d-flex justify-content-center align-items-end">
            <div class="overflow-hidden w-100" :style="[user.transportPhotoName ? {'background-size': 'cover','background-position': 'center', 'background-image': 'url(' + $config.baseUrl + '/users/image/' + user.transportPhotoName + ')'} : {'background-image': 'url(' + require('~/assets/img/pattern-icons.png') + ')'}]"></div>
            <nuxt-link class="profile position-absolute" :to="`users/${user.uin}`"><b-img :src="user.photoUrl" rounded="circle" thumbnail></b-img></nuxt-link>
          </div>
          <div class="text-center mt-4">
              <h4 class="mb-0" role="button" nuxt :to="`users/${user.uin}`">{{ user.firstName }}</h4> 
              <p class="text-muted d-block m-0" v-if="user.location">{{ user.location }}</p>
              <b-button size="sm" variant="warning" class="text-info mt-2" nuxt :to="`users/${user.uin}`"><b-icon icon="person-bounding-box" /> Profile</b-button>
          </div>
          <b-card-body>        
            <b-list-group class="text-left">
              <b-list-group-item variant="light" class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1 text-dark"><strong>Info</strong></h5>
                  <h5><b-icon variant="primary" icon="info-circle-fill" /></h5>
                </div>
                <div class="mb-1">
                  <p class="mb-1" v-if="user.username">Telegram: <a :href="'https://t.me/'+user.username" target="_blank"><strong>{{ user.username }}</strong></a></p>
                  <p class="mb-1" v-if="user.birthyear">Age: <strong>{{ new Date().getFullYear() - user.birthyear }}</strong></p>
                  <p class="mb-1" v-if="user.languages && user.languages.length">Lang: {{ getFlags(user.languages) }}</p>
                  <p class="mb-0" v-if="user.transportModel">Model: <strong>{{ user.transportModel }}</strong></p>
                </div>
              </b-list-group-item>
              <b-list-group-item variant="light" class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1 text-dark"><strong>Achievements</strong></h5>
                  <h5><b-icon variant="warning" icon="trophy-fill" /></h5>
                </div>
                <div class="mb-1 d-flex justify-content-between align-items-center">
                  <p class="m-0">Market</p>
                  <b-badge>{{ user.marketProductsCount }}</b-badge>
                </div>
                <div class="mb-1 d-flex justify-content-between align-items-center">
                  <p class="m-0">Locations</p>
                  <b-badge>{{ user.locationsCount }}</b-badge>
                </div>
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userTable: [],
      languageOptions: [
          { text: '🇬🇧', value: 'english' },
          { text: '🇪🇪', value: 'estonian' },
          { text: '🇷🇺', value: 'russian' },
          { text: '🇸🇪', value: 'swedish' },
          { text: '🇪🇸', value: 'spanish' }
      ],
      listUserLocs: [],
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
          console.log(this.userTable)
        });
    },
    getFlags (userLang) {
      return this.languageOptions.filter(language => userLang.includes(language.value)).map(language => language.text).join(" ")
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
    height: 12rem;
    background-color: #1a2740;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}
.card {
  border-radius: 10px;
}

.profile {
    width: 10rem;
    bottom:-1rem;
}
</style>
