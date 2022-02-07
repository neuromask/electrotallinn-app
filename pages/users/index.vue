<template>
  <section>
    <div class="d-flex w-100 justify-content-between align-items-start">
    <h3 class="underline font-weight-bold">{{ $t('nav.users') }} <span class="small">({{ userTable.length }})</span></h3>
    <b-button-group size="sm">
      <b-button @click="tableLayout = false" :pressed="!tableLayout" variant="primary"><b-icon icon="grid" /></b-button>
      <b-button @click="tableLayout = true" :pressed="tableLayout" variant="primary"><b-icon icon="list-ul" /></b-button>
    </b-button-group>
    </div>
    <b-table v-if="tableLayout" @row-clicked="gotoUserProfile" table-variant="light" tbody-tr-class="clickable" class="rounded scoreTable shadow-sm" hover borderless striped :items="userTable" :fields="userFields">
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
    <b-row v-if="!tableLayout">
      <b-col cols="12" md="6" lg="4" class="card-list-item mb-4" v-for="user in userTable" :key="user.id">
        <b-card class="shadow-sm" bg-variant="info" style="font-size:0.9rem; line-height:1rem;" >
          <div class="mb-3 rounded shadow-sm p-container bg-secondary">
            <b-img-lazy v-if="user.transportPhotoName" class="p-image opacity-75" :src="$config.apiUrl + '/users/image/' + user.transportPhotoName" />
            <b-img v-else blank class="p-image bg-pat-dark" />
          </div>
          <!--<b-avatar :text="user.firstName.substring(0,2)" style="top:2rem;right: calc(50% - 6rem)" :to="localePath(`/users/${user.uin}`)" variant="info" class="profile text-dark position-absolute shadow-sm" size="12rem" />-->
          <b-avatar style="top:2rem;right: calc(50% - 6rem)" :to="localePath(`/users/${user.uin}`)" variant="info" class="profile text-dark position-absolute shadow-sm" :src="user.photoUrl" size="12rem" />
          <div class="text-center mt-4 mb-3">
            <nuxt-link :to="localePath(`/users/${user.uin}`)">
              <h4 class="mb-0 font-weight-bold" role="button">{{ user.firstName }}</h4>
            </nuxt-link>
            <p class="text-muted d-block m-0" v-if="user.location"><i>{{ user.location }}</i></p>
          </div>
          <SocialLinksUser :facebookUrl="user.facebookUrl" :instagramUrl="user.instagramUrl" :youtubeUrl="user.youtubeUrl" />
          <b-list-group class="text-left shadow-sm">
            <b-list-group-item variant="light" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-dark"><strong>{{ $t('main.info') }}</strong></h5>
                <h5><b-icon variant="primary" icon="info-circle-fill" /></h5>
              </div>
              <div class="mb-1">
                <p class="mb-1 text-dark" v-if="user.username">{{ $t('profile.telegram') }}: <a :href="'https://t.me/'+user.username" target="_blank"><strong>{{ user.username }}</strong></a></p>
                <p class="mb-1 text-dark" v-if="user.birthyear">{{ $t('profile.age') }}: <strong>{{ new Date().getFullYear() - user.birthyear }}</strong></p>
                <p class="mb-1 text-dark" v-if="user.languages && user.languages.length">{{ $t('profile.language') }}: {{ getFlags(user.languages) }}</p>
                <p class="mb-0 text-dark" v-if="user.transportModel">{{ $t('profile.model') }}: <strong>{{ user.transportModel }}</strong></p>
              </div>
            </b-list-group-item>
            <b-list-group-item variant="light" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-dark"><strong>{{ $t('main.achievements') }}</strong></h5>
                <h5><b-icon variant="warning" icon="trophy-fill" /></h5>
              </div>
              <div class="mb-1 d-flex justify-content-between align-items-center">
                <nuxt-link class="m-0 font-weight-bold" :to="localePath(`/users/${user.uin}/products`)">{{ $t('nav.market') }}</nuxt-link>
                <b-badge>{{ user.marketProductsCount }}</b-badge>
              </div>
              <div class="mb-1 d-flex justify-content-between align-items-center">
                <nuxt-link class="m-0 font-weight-bold" :to="localePath(`/users/${user.uin}/locations`)">{{ $t('nav.locations') }}</nuxt-link>
                <b-badge>{{ user.locationsCount }}</b-badge>
              </div>
              <div class="mb-1 d-flex justify-content-between align-items-center">
                <nuxt-link class="m-0 font-weight-bold" :to="localePath(`/game/score`)">{{ $t('game.balance') }}</nuxt-link>
                <b-badge>{{ user.balance }}</b-badge>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row >
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
        console.log(this.userTable)
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

.card {
  border-radius: 10px;
}
.profileTable {
    bottom:0;
}
</style>
