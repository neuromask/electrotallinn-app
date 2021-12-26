<template>
  <section>
    <b-row>
      <b-col cols="12" class="pb-3">
        <b-card class="rounded">
          <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">{{ $t('nav.score') }}</b-badge> {{ $t('game.table') }}</h3>
          <hr>
        </b-card>
      </b-col>
    </b-row>
    <b-table table-variant="info" class="rounded overflow-hidden" hover borderless striped @row-clicked="goToProfile" :items="userTable" :fields="scoreFields">
      <template #cell(index)="data">
        <b-badge variant="primary" class="pb-0 text-left">
          <h3 class="font-weight-bold mb-0 text-center">{{ data.index + 1 }}</h3>
        </b-badge>
      </template>
      <template #cell(firstName)="data">
        <div class="d-flex justify-content-start align-items-center">
          <b-avatar :to="localePath(`/users/${data.item.uin}`)" variant="info" class="text-dark profile shadow mr-3" :src="data.item.photoUrl" size="3rem"></b-avatar>
          <h3 class="mb-0">{{ data.item.firstName }}</h3>
        </div>
      </template>
      <template #cell(photoUrl)="data">
        <b-badge variant="primary" class="pb-0 text-left">
          <b-avatar :to="localePath(`/users/${data.item.uin}`)" variant="info" class="text-dark profile position-absolute shadow" :src="data.item.photoUrl" size="3rem"></b-avatar>
        </b-badge>
      </template>
    </b-table>
  </section>
</template>

<script>

export default {
  data() {
    return {
      userTable: []
    };
  },
  computed: {
    scoreFields() {
      return [
        {
          key: 'index',
          sortable: false,
          label: this.$t('main.rank'),
          variant: 'primary'
        },
        {
          key: 'firstName',
          sortable: false,
          label: this.$t('profile.name')
        },
      ]
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$axios.$get(`${this.$config.apiUrl}/users`).then((response) => {
        this.userTable = response;
        console.log(response)
      });
    },
    goToProfile() {

    }
  }
};
</script>

<style scoped>
</style>
