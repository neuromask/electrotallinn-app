<template>
  <section>
    <div class="d-flex w-100 justify-content-between align-items-center">
    <h3 class="font-weight-bold mb-0">{{ $t('nav.users') }} <span class="small">({{ userTable.length }})</span></h3>
    <b-button-group>
      <b-button @click="tableLayout = false" :pressed="!tableLayout" variant="primary"><b-icon icon="grid" /></b-button>
      <b-button @click="tableLayout = true" :pressed="tableLayout" variant="primary"><b-icon icon="list-ul" /></b-button>
    </b-button-group>
    </div>
    <hr>
    <b-table v-if="tableLayout" @row-clicked="gotoUserProfile" table-variant="light" tbody-tr-class="clickable" class="rounded scoreTable" hover borderless striped :items="userTable" :fields="userFields">
      <template #cell(photoUrl)="data">
        <b-avatar variant="info" class="text-dark profile profileTable shadow" :src="data.item.photoUrl" size="3rem"></b-avatar>
      </template>
      <template #cell(firstName)="data">
        <h4 class="font-weight-bold mb-0">{{ data.item.firstName }}</h4>
        <p class="small"><i>{{ data.item.location }}</i></p>
      </template>
      <template #cell(balance)="data">
        <b-button size="sm" variant="primary" class="text-info nowrap" nuxt :to="localePath(`/users/${data.item.uin}`)">
          <b-icon icon="person-bounding-box" /> {{ $t('nav.profile') }}
        </b-button>
      </template>
    </b-table>
    <transition-group v-if="!tableLayout" name="card-list" mode="out-in" class="row">
      <b-col cols="12" md="6" lg="4" class="card-list-item mb-4" v-for="user in userTable" :key="user.id">
        <b-card bg-variant="info" no-body style="font-size:0.9rem; line-height:1rem;" >
          <div class="upper p-3 position-relative d-flex justify-content-center align-items-end">
            <div class="overflow-hidden w-100" :style="[user.transportPhotoName ? {'background-size': 'cover','background-position': 'center', 'background-image': 'url(' + $config.apiUrl + '/users/image/' + user.transportPhotoName + ')'} : {'background-image': 'url(' + require('~/assets/img/pattern-icons.png') + ')'}]"></div>
            <b-avatar :to="localePath(`/users/${user.uin}`)" variant="info" class="text-dark profile position-absolute shadow" :src="user.photoUrl" size="12rem"></b-avatar>
          </div>
          <div class="text-center mt-4">
              <nuxt-link :to="localePath(`/users/${user.uin}`)"><h4 class="mb-0 font-weight-bold" role="button">{{ user.firstName }}</h4></nuxt-link>
              <p class="text-muted d-block m-0" v-if="user.location"><i>{{ user.location }}</i></p>
              <b-button size="sm" variant="warning" class="text-info mt-2" nuxt :to="localePath(`/users/${user.uin}`)"><b-icon icon="person-bounding-box" /> {{ $t('nav.profile') }}</b-button>
          </div>
          <b-card-body>        
            <b-list-group class="text-left">
              <b-list-group-item variant="light" class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1 text-dark"><strong>{{ $t('main.info') }}</strong></h5>
                  <h5><b-icon variant="primary" icon="info-circle-fill" /></h5>
                </div>
                <div class="mb-1">
                  <p class="mb-1" v-if="user.username">{{ $t('profile.telegram') }}: <a :href="'https://t.me/'+user.username" target="_blank"><strong>{{ user.username }}</strong></a></p>
                  <p class="mb-1" v-if="user.birthyear">{{ $t('profile.age') }}: <strong>{{ new Date().getFullYear() - user.birthyear }}</strong></p>
                  <p class="mb-1" v-if="user.languages && user.languages.length">{{ $t('profile.language') }}: {{ getFlags(user.languages) }}</p>
                  <p class="mb-0" v-if="user.transportModel">{{ $t('profile.model') }}: <strong>{{ user.transportModel }}</strong></p>
                </div>
              </b-list-group-item>
              <b-list-group-item variant="light" class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1 text-dark"><strong>{{ $t('main.achievements') }}</strong></h5>
                  <h5><b-icon variant="warning" icon="trophy-fill" /></h5>
                </div>
                <div class="mb-1 d-flex justify-content-between align-items-center">
                  <nuxt-link class="m-0 font-weight-bold" :to="localePath(`/users/${user.uin}/products`)">{{ $t('nav.market') }}</nuxt-link>
                  <b-badge class="pb-0">{{ user.marketProductsCount }}</b-badge>
                </div>
                <div class="mb-1 d-flex justify-content-between align-items-center">
                  <nuxt-link class="m-0 font-weight-bold" :to="localePath(`/users/${user.uin}/locations`)">{{ $t('nav.locations') }}</nuxt-link>
                  <b-badge class="pb-0">{{ user.locationsCount }}</b-badge>
                </div>
                <div class="mb-1 d-flex justify-content-between align-items-center">
                  <nuxt-link class="m-0 font-weight-bold" :to="localePath(`/game/score`)">{{ $t('game.balance') }}</nuxt-link>
                  <b-badge class="pb-0">{{ user.balance }}</b-badge>
                </div>
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-card>
      </b-col>
    </transition-group>
  </section>
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
      tableLayout: false
    };
  },
  computed: {
    userFields() {
      return [
        {
          key: 'photoUrl',
          sortable: false,
          label: this.$t('main.photo'),
          thClass: 'text-white bg-secondary',
          tdClass: 'text-center bg-secondary'
        },
        {
          key: 'firstName',
          sortable: false,
          label: this.$t('profile.name'),
          tdClass: 'w-100'
        },
        {
          key: 'balance',
          sortable: false,
          label: this.$t('main.info')
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
    getFlags (userLang) {
      return this.languageOptions.filter(language => userLang.includes(language.value)).map(language => language.text).join(" ")
    },
    gotoUserProfile(item, index, event) {
      this.$router.push({path: this.localePath(`/users/${item.uin}`)});
    }
  }
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
    bottom:-1rem;
}
.profileTable {
    bottom:0;
}

.card-list-item {
  transition: transform .4s ease;
}
.card-list-enter {
  transform: scale(0);
}
.card-list-enter-to {
  transform: scale(1);
}
.card-list-leave-to,
.card-list-leave {
  display: none;
}
</style>
