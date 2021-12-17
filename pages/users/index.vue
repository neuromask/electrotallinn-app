<template>
  <div>
    <transition-group name="card-list" mode="out-in" class="row">
      <b-col cols="12" md="6" lg="4" class="card-list-item mb-4" v-for="user in userTable" :key="user.id">
        <b-card
          bg-variant="info"
          no-body
          style="font-size:0.9rem; line-height:1rem;"
          >
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
                  <nuxt-link class="m-0" :to="localePath(`/users/${user.uin}/products`)">{{ $t('nav.market') }}</nuxt-link>
                  <b-badge>{{ user.marketProductsCount }}</b-badge>
                </div>
                <div class="mb-1 d-flex justify-content-between align-items-center">
                  <nuxt-link class="m-0" :to="localePath(`/users/${user.uin}/locations`)">{{ $t('nav.locations') }}</nuxt-link>
                  <b-badge>{{ user.locationsCount }}</b-badge>
                </div>
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-card>
      </b-col>
    </transition-group>
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
    padding: 0.25rem;
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
