<template>
  <section>
    <b-row>
      <b-col cols="12" lg="4" class="pb-3">
        <h3 class="font-weight-bold mb-0">{{ $t('game.rules') }}</h3>
        <hr>
        <b-card>
          <h4 class="font-weight-bold">{{ $t('game.rule1Title') }}</h4>
          <h5 class="mb-0">{{ $t('game.rule1') }}</h5>
          <hr>
          <h4 class="font-weight-bold">{{ $t('game.rule2Title') }}</h4>
          <i18n path="game.rule2" tag="h5" class="my-3">
            <NuxtLink :to="localePath('/map')"><strong>{{ $t('main.textMap') }}</strong></NuxtLink>
            <a href="https://t.me/electrotallinnbot" target="_blank"><strong>ElectroBot</strong></a>
          </i18n>
          <div class="bg-light p-3 rounded mt-3">
            <b-img rounded="circle" src="@/assets/img/game/map-bonus.svg"></b-img>
            <h5 class="mb-0 font-weight-bold text-center mt-3 text-uppercase">{{ $t('game.mapBonus') }}</h5>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" lg="8">

          <h3 class="font-weight-bold mb-0">{{ $t('nav.score') }}</h3>
          <hr>
          <b-table table-variant="light" class="rounded" :sort-by.sync="sortRankBy" :sort-desc.sync="sortRankDesc" hover borderless striped @row-clicked="goToProfile" :items="userTable" :fields="scoreFields">
            <template #cell(index)="data">
              <b-badge variant="light" class="pb-0">
                <h3 class="font-weight-bold mb-0">{{ data.index + 1 }}</h3>
              </b-badge>
            </template>
            <template #cell(firstName)="data">
              <div class="d-flex justify-content-start align-items-center">
                <b-avatar :to="localePath(`/users/${data.item.uin}`)" variant="info" class="text-dark profile shadow mr-3" :src="data.item.photoUrl" size="3rem"></b-avatar>
                <h4 class="font-weight-bold mb-0">{{ data.item.firstName }}</h4>
              </div>
            </template>
            <template #cell(balance)="data">
              <h3 class="font-weight-bold mb-0">{{ data.item.balance }}</h3>
            </template>
          </b-table>

      </b-col>
    </b-row>
  </section>
</template>

<script>

export default {
  data() {
    return {
      userTable: [],
      sortRankBy: 'balance',
      sortRankDesc: true
    };
  },
  computed: {
    scoreFields() {
      return [
        {
          key: 'index',
          sortable: false,
          label: this.$t('game.place'),
          thClass: 'text-white bg-secondary',
          tdClass: 'text-center bg-secondary'
        },
        {
          key: 'firstName',
          sortable: false,
          label: this.$t('profile.name'),
          tdClass: 'text-center w-100'
        },
        {
          key: 'balance',
          sortable: false,
          label: this.$t('game.balance')
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
