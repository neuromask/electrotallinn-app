<template>
  <section>
    
    <div class="upper position-relative d-flex justify-content-center" style="z-index:10">
      <div class="w-100 h-100 position-absolute" style="background-color:rgba(26, 39, 64, 0.7)"></div>
      <div class="overflow-hidden w-100" :style="[user.transportPhotoName ? {'background-size': 'cover','background-position': 'center', 'background-image': 'url(' + $config.baseUrl + '/users/image/' + user.transportPhotoName + ')'} : {'background-image': 'url(' + require('~/assets/img/pattern-icons.png') + ')'}]"></div>
      <b-img class="profile position-absolute shadow" :src="user.photoUrl" rounded="circle" thumbnail/>
      <div class="position-absolute mt-4 bg-transparent text-center">
        <h2 v-if="$user.uin != user.uin" class="m-0 text-info shadow-sm"><strong>{{ user.firstName }} </strong></h2>
        <h2 v-if="$user.uin == user.uin" class="m-0 text-info shadow-sm"><strong>{{ $t('nav.myProfile') }}</strong></h2>
        <i v-if="user.location" class="text-light shadow-sm">{{ user.location }}</i>
      </div>
      <a v-if="$user.uin == user.uin" v-b-modal.profile-modal class="position-absolute" style="top:1rem; right:1.5rem;font-size:2rem">
        <b-icon class="shadow-sm" variant="info" icon="pencil-square" />
      </a>
      <MarketProductModal />
    </div>

    <b-navbar id="submenu" type="primary" class="my-3">
      <b-navbar-nav>
        <b-nav-item :to="localePath('/')" nuxt disabled><b-icon variant="dark" icon="arrow-return-right"></b-icon></b-nav-item>
        <b-nav-item :to="{ path: localePath(`/users/${$route.params.id}`), hash:'#submenu'}" exact nuxt>{{ $t('nav.profile') }}</b-nav-item>
        <b-nav-item :to="{ path: localePath(`/users/${$route.params.id}/products`), hash:'#submenu'}" nuxt>{{ $t('nav.products') }}</b-nav-item>
        <b-nav-item :to="{ path: localePath(`/users/${$route.params.id}/locations`), hash:'#submenu'}" nuxt>{{ $t('nav.locations') }}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <NuxtChild  />

  </section>
</template>

<script>
export default {
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
      this.$axios.$get(`${this.$config.baseUrl}/users/${this.$route.params.id}`).then((response) => {
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
    width: 15rem;
    bottom:-1rem;
}
</style>
