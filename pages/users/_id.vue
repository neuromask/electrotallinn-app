<template>
  <section>
    <div id="submenu" class="upper position-relative d-flex justify-content-center" style="z-index:10">
      <div class="w-100 h-100 position-absolute" style="background-color:rgba(26, 39, 64, 0.7)"></div>
      <div class="overflow-hidden w-100 shadow-sm" :style="[user.transportPhotoName ? {'background-size': 'cover','background-position': 'center', 'background-image': 'url(' + $config.apiUrl + '/users/image/' + user.transportPhotoName + ')'} : {'background-image': 'url(' + require('~/assets/img/pattern-icons-dark.svg') + ')'}]"></div>
      <b-avatar class="profile position-absolute shadow text-dark" variant="info" size="15rem" :src="user.photoUrl" rounded="circle" thumbnail></b-avatar>
      <div class="position-absolute mt-4 bg-transparent text-center">
        <h2 v-if="$user.uin != user.uin" class="m-0 text-info shadow-sm"><strong>{{ user.firstName }} </strong></h2>
        <h2 v-if="$user.uin == user.uin" class="m-0 text-info shadow-sm"><strong>{{ $t('nav.myProfile') }}</strong></h2>
        <i v-if="user.location" class="text-light shadow-sm">{{ user.location }}</i>
      </div>
      <a v-if="$user.uin == user.uin" v-b-modal.profile-modal class="position-absolute" style="top:1rem; right:1.5rem;font-size:2rem">
        <b-icon class="shadow-sm" variant="info" icon="pencil-square" />
      </a>
      <UserProfileModal @save="getUser"/>
    </div>
    <div class="mt-5 sub-page">
      <b-card no-body bg-variant="info" class="shadow-sm">
        <b-card-header header-tag="nav">
          <b-nav card-header justified tabs>
            <b-nav-item :to="{ path: localePath(`/users/${$route.params.id}`), hash:'#submenu' }" exact nuxt exact-active-class="active">{{ $t('nav.profile') }}</b-nav-item>
            <b-nav-item :to="{ path: localePath(`/users/${$route.params.id}/products`), hash:'#submenu' }" nuxt exact-active-class="active">{{ $t('nav.products') }}</b-nav-item>
            <b-nav-item :to="{ path: localePath(`/users/${$route.params.id}/locations`), hash:'#submenu' }" nuxt exact-active-class="active">{{ $t('nav.locations') }}</b-nav-item>
          </b-nav>
        </b-card-header>
        <b-card-body>
          <NuxtChild  />
        </b-card-body>
      </b-card>
    </div>
  </section>
</template>

<script>
export default {
  head() { return { title: this.user.firstName } },
  props: {},
  data() {
    return {
      user: {}
    }
  },
  mounted () {
    this.getUser()
  },
  watch: {
    $route () {
     this.getUser();
    }
  },
  methods: {
    getUser() {
      this.$axios.$get(`${this.$config.apiUrl}/users/${this.$route.params.id}`).then((response) => {
        this.user = response;
      });
    }
  }
}
</script>

<style scoped>
.upper>div {
    height: 320px;
    background-color: #1a2740;
    border-radius: 6px;
}
.profile {
    bottom:-2rem;
}
.sub-page {
  min-height: 640px;
}
</style>
