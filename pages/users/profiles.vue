<template>
  <div>
    <b-card-group deck>
      <b-card
        v-for="(user, idx) in userTable" :key="idx"
        bg-variant="info"
        :header="user.first_name"
        class="text-center"
        styles="flex: 1 0 0%;"
      >
        <b-img thumbnail fluid :src="user.photo_url" :alt="user.first_name" />
        <b-card-text class="text-left ml-2 mt-3 mr-2">{{ user.username }}</b-card-text>
        <b-button @click="$router.push(`${user.id}`)">View profile</b-button>
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
