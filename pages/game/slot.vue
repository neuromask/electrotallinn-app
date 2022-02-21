<template>
  <section>
  <div v-if="$user.isLogged">
    <GameSlot />
    <b-row>
      <b-col cols="12" lg="8">
        <h3 class="underline font-weight-bold">{{ $t('nav.score') }}</h3>
        <b-table @row-clicked="gotoUserProfile" tbody-tr-class="clickable" sticky-header="770px" table-variant="light" class="shadow-sm rounded overflow-auto" :sort-by.sync="sortRankBy" :sort-desc.sync="sortRankDesc" hover borderless striped :items="userTable" :fields="scoreFields">
          <template #cell(index)="data">
            <b-badge variant="light" class="pb-0">
              <h3 class="font-weight-bold">{{ data.index + 1 }}</h3>
            </b-badge>
          </template>
          <template #cell(firstName)="data">
            <div class="d-flex justify-content-start align-items-center">
              <b-avatar variant="info" class="text-dark profile shadow mr-3" :src="data.item.photoUrl" size="3rem"></b-avatar>
              <h4 class="font-weight-bold mb-0">{{ data.item.firstName }}</h4>
            </div>
          </template>
          <template #cell(balance)="data">
            <h3 class="font-weight-bold">{{ data.item.balance }}</h3>
          </template>
        </b-table>
      </b-col>
      <b-col cols="12" lg="4" class="mb-lg-0 mb-5">
        <h3 class="underline font-weight-bold">{{ $t('game.rules') }}</h3>
        <b-card class="shadow-sm">
          <h4 class="font-weight-bold">{{ $t('game.rule2Title') }}</h4>
          <i18n path="game.rule2" tag="p" class="my-3 lead">
            <NuxtLink :to="localePath('/map')"><span class="font-weight-bold">{{ $t('main.textMap') }}</span></NuxtLink>
            <a href="https://t.me/electrotallinnbot" target="_blank"><span class="font-weight-bold">ElectroBot</span></a>
          </i18n>
          <div class="bg-light p-3 rounded my-3">
            <b-img rounded="circle" src="@/assets/img/game/map-bonus.svg"></b-img>
            <h5 class="mb-0 font-weight-bold text-center mt-3 text-uppercase">{{ $t('game.mapBonus') }}</h5>
          </div>
          <h4 class="font-weight-bold">{{ $t('game.rule1Title') }}</h4>
          <p class="lead mb-0">{{ $tc('game.rule1', 1) }}</p>
          <p class="font-italic mb-0">{{ $tc('game.rule1', 2) }}</p>
        </b-card>
      </b-col>
    </b-row>
  </div>
  <div class="alertBox mx-auto mt-5" v-else>
    <b-alert variant="warning" show>
      <h3 class="alert-heading">{{ $t('game.warnTitle') }}</h3>
      <h5>{{ $t('game.available') }}</h5>
      <div class="d-flex w-100 justify-content-start align-items-center">
        <b-button class="mr-3" size="lg" v-b-toggle.sidebar-variant variant="primary"><b-icon icon="list" /></b-button>
        <h5 class="font-weight-bold mb-0">{{ $t('game.warning') }}</h5>
      </div>
    </b-alert>
  </div>
  </section>
</template>

<script>

export default {
  head() { return { title: this.$t("nav.slot") } },
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
      });
    },
    gotoUserProfile(item, index, event) {
      this.$router.push({path: this.localePath(`/users/${item.uin}`)});
    }
  }
};
</script>

<style scoped>
.alertBox {
    max-width: 512px;
}
</style>