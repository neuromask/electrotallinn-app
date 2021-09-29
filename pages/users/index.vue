<template>
  <div>
    <b-card-group deck>
      <b-card
        :img-src="user.photo_url" :img-alt="user.first_name" img-top
        v-for="(user, idx) in userTable" :key="idx"
        bg-variant="info"
        no-body
        style="font-size:0.9rem; line-height:1rem;"
      >
        <template #header>
          <div class="d-flex align-items-center w-100 justify-content-between">
            <b-badge role="button" nuxt :to="`users/${user.uin}`" class="pointer" variant="dark"><h5 class="mb-0"><strong>{{ user.first_name }}</strong></h5></b-badge>
            <b-button size="sm" variant="warning" class="text-info" nuxt :to="`users/${user.uin}`"><b-icon icon="person-bounding-box" /> Profile</b-button>
          </div>
        </template>
        <b-card-body>
          <b-list-group class="text-left">
            <b-list-group-item variant="light" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-dark"><strong>Information</strong></h5>
                <h5><b-icon variant="primary" icon="info-circle-fill" /></h5>
              </div>
              <div class="mb-1">
                <p class="m-0" v-if="user.username">Telegram: <strong>{{ user.username }}</strong></p>
                <p class="m-0" v-if="user.birthyear">Age: <strong>{{ new Date().getFullYear() - user.birthyear }}</strong></p>
                <p class="m-0" v-if="user.languages">Lang: {{ getFlags(user.languages) }}</p>
                <p class="m-0" v-if="user.location">Location: <strong>{{ user.location }}</strong></p>
                <p class="m-0" v-if="user.transport_model">Model: <strong>{{ user.transport_model }}</strong></p>
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
</style>
