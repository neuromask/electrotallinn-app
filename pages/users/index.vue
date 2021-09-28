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
          <b-list-group-item v-if="user.username">Telegram: {{ user.username }}</b-list-group-item>
          <b-list-group-item v-if="user.birthyear">Age: {{ new Date().getFullYear() - user.birthyear }}</b-list-group-item>
          <b-list-group-item v-if="user.languages">Lang: {{ user.languages }}</b-list-group-item>
          <b-list-group-item v-if="user.location">Location: {{ user.location }}</b-list-group-item>
          <b-list-group-item v-if="user.transport_model">Model:</b-list-group-item>
        </b-list-group>
      </b-card-body>
        <b-img v-if="user.transport_photo" fluid :src="require('@/assets/img/step-1.jpg')"></b-img>
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
