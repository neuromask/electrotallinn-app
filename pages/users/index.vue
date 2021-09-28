<template>
  <div>
    <b-card-group deck>
      <b-card
        :img-src="user.photo_url" :img-alt="user.first_name" img-top
        v-for="(user, idx) in userTable" :key="idx"
        bg-variant="info"
        no-body
      >
        <template #header>
          <h5 class="mb-0 float-left">{{ user.first_name }}</h5>
          <b-button size="sm" variant="warning" class="float-right text-info" @click="$router.push(`users/${user.uin}`)"><b-icon icon="person-bounding-box" /> Profile</b-button>
        </template>
        <b-card-body>
          <b-list-group class="text-left">
            <b-list-group-item href="#" active class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1"><strong>Information</strong></h5>
                <b-icon variant="info" icon="info-circle-fill" />
              </div>
              <div class="mb-1">
                <p class="m-0" v-if="user.username">Telegram: <strong>{{ user.username }}</strong></p>
                <p class="m-0" v-if="user.birthyear">Age: <strong>{{ new Date().getFullYear() - user.birthyear }}</strong></p>
                <p class="m-0" v-if="user.languages">Lang: {{ user.languages }}</p>
                <p class="m-0" v-if="user.location">Location: <strong>{{ user.location }}</strong></p>
                <p class="m-0" v-if="user.transport_model">Model: <strong>{{ user.transport_model }}</strong></p>
              </div>
            </b-list-group-item>
            <b-list-group-item href="#" class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1"><strong>Achievements</strong></h5>
                  <b-icon variant="dark" icon="trophy-fill" />
                </div>

              <div class="mb-1 d-flex justify-content-between align-items-center">
                <p class="m-0" v-if="user.username">Locations</p>
                <b-badge>2</b-badge>
              </div>
              <div class="mb-1 d-flex justify-content-between align-items-center">
                <p class="m-0" v-if="user.username">Market</p>
                <b-badge>14</b-badge>
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
  },
};
</script>

<style scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
