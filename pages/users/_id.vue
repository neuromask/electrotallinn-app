<template>
  <section>
    <div id="submenu" class="upper position-relative d-flex justify-content-center mb-5" style="z-index:10">
      <div class="rounded shadow-sm p-container bg-secondary">
        <b-img-lazy v-if="user.transportPhotoName" class="p-image opacity-25" :src="$config.apiUrl + '/users/image/' + user.transportPhotoName" />
        <b-img v-else blank class="p-image bg-pat-dark" />
      </div>
      <b-avatar style="bottom:-2rem;right: calc(50% - 8rem)" variant="info" class="profile text-dark position-absolute shadow-sm" :src="user.photoUrl" size="16rem" />
      <div class="position-absolute mt-4 bg-transparent text-center">
        <h2 v-if="$user.uin != user.uin" class="m-0 text-info"><strong>{{ user.firstName }} </strong></h2>
        <h2 v-if="$user.uin == user.uin" class="m-0 text-info"><strong>{{ $t('nav.myProfile') }}</strong></h2>
        <i v-if="user.location" class="text-light">{{ user.location }}</i>
      </div>
      <a v-if="$user.uin == user.uin" v-b-modal.profile-modal class="position-absolute" style="top:1rem; right:1.5rem;font-size:2rem">
        <b-icon class="shadow-sm" variant="info" icon="pencil-square" />
      </a>
      <UserProfileModal @save="getUser"/>
    </div>
    <SocialLinksUser :facebookUrl="user.facebookUrl" :instagramUrl="user.instagramUrl" :youtubeUrl="user.youtubeUrl" />
    <div class="sub-page">
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
      this.$axios.$get(`/api/users/${this.$route.params.id}`).then((response) => {
        this.user = response;
      });
    }
  }
}
</script>

<style scoped>
.upper>div {
    height: 320px;
}
.sub-page {
  min-height: 640px;
}
</style>
