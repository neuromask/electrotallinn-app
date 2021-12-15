<template>
  <section>
    <CoolLightBox 
      :items="items" 
      :index="index"
      :effect="'fade'"
      @close="index = null">
    </CoolLightBox>
    <b-card-group columns>
      <b-card>
        <h3 class="mb-0 font-weight-bold d-flex justify-content-between align-items-center">
          <span>
            <b-badge variant="warning" class="text-white">{{ $t('nav.profile') }}</b-badge> 
            <span>{{ $t('main.info') }}</span>
          </span>
          <a v-if="$user.uin === user.uin" v-b-modal.profile-modal><b-icon class="align-middle" variant="primary" icon="pencil-square" /></a>
        </h3>
        <hr />
        <b-list-group class="text-left">
          <b-list-group-item variant="light">{{ $t('profile.name') }}: <strong>{{ user.firstName }}</strong></b-list-group-item>
          <b-list-group-item variant="light" v-if="user.username">{{ $t('profile.telegram') }}: <a :href="'https://t.me/'+user.username" target="_blank"><strong>{{ user.username }}</strong></a></b-list-group-item>
          <b-list-group-item variant="light" v-if="user.birthyear">{{ $t('profile.age') }}: <strong>{{ new Date().getFullYear() - user.birthyear }}</strong></b-list-group-item>
          <b-list-group-item variant="light" v-if="user.languages && user.languages.length">{{ $t('profile.language') }}: {{ getFlags() }}</b-list-group-item>
          <b-list-group-item variant="light" v-if="user.location">{{ $t('profile.location') }}: <strong>{{ user.location }}</strong></b-list-group-item>
          <b-list-group-item variant="light" v-if="user.transportModel">{{ $t('profile.model') }}: <strong>{{ user.transportModel }}</strong></b-list-group-item>
        </b-list-group>
      </b-card>

      <b-card v-if="user.transportPhotoName">
        <h3 class="mb-0 font-weight-bold">
          <span>
            <b-badge variant="warning" class="text-white">{{ $t('main.transport') }}</b-badge> 
            <span>{{ $t('main.photo') }}</span>
          </span>
        </h3>
        <hr />
        <figure class="figure mb-0">
        <b-img class="transportImage" @click="index = 0" center fluid rounded :src="$config.baseUrl + '/users/image/' + user.transportPhotoName"></b-img>
        <figcaption class="figure-caption text-center mb-0">{{ user.transportModel }}</figcaption>
        </figure>
      </b-card>
    </b-card-group>

  </section>
</template>

<script>
  // use the component
  import CoolLightBox from 'vue-cool-lightbox'
  import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  components: {
    CoolLightBox,
  },
  name: 'UserProfile',
  props: {},
  data() {
    return {
      items: [],
      index: null,
      profile: {},
      user: {},
      userEdit: {},
      image: null,
      imageSrc: null,
      languageOptions: [
          { text: '🇬🇧', value: 'english' },
          { text: '🇪🇪', value: 'estonian' },
          { text: '🇷🇺', value: 'russian' },
          { text: '🇸🇪', value: 'swedish' },
          { text: '🇪🇸', value: 'spanish' }
      ]
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
      //console.log(this.$nuxt.$route.path)
      this.$axios.$get(`${this.$config.baseUrl}/users/${this.$route.params.id}`).then((response) => {
        this.user = response;
        this.user.languages = (this.user.languages || '').split(',').filter(i => !!i);
        this.items = [{
          title: this.user.transportModel,
          src: this.$config.baseUrl + '/users/image/' + this.user.transportPhotoName
        }]
      });
    },
    getFlags() {
      return this.languageOptions.filter(language => this.user.languages.includes(language.value)).map(language => language.text).join(" ")
    }
  }
}
</script>

<style scoped>
@media (min-width: 576px) {
  .card-columns {
    column-count: 2;
  }
}
</style>
