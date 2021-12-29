<template>
  <section>
    <CoolLightBox :items="items" :index="index" :effect="'fade'" @close="index = null" />
    <b-row>
      <b-col cols="12" lg="6" class="mb-3">
        <div class="d-flex justify-content-between align-items-start">
          <h3 class="underline font-weight-bold">{{ $t('main.info') }}</h3>
          <b-icon v-if="$user.uin == $route.params.id" role="button" v-b-modal.profile-modal class="align-middle" font-scale="2" variant="primary" size icon="pencil-square" />
        </div>
        <b-list-group class="text-left">
          <b-list-group-item variant="light" class="text-dark">{{ $t('profile.name') }}: <strong>{{ user.firstName }}</strong></b-list-group-item>
          <b-list-group-item v-if="user.username" variant="light" class="text-dark">{{ $t('profile.telegram') }}: <a :href="'https://t.me/'+user.username" target="_blank"><strong>{{ user.username }}</strong></a></b-list-group-item>
          <b-list-group-item v-if="user.birthyear" variant="light" class="text-dark">{{ $t('profile.age') }}: <strong>{{ new Date().getFullYear() - user.birthyear }}</strong></b-list-group-item>
          <b-list-group-item v-if="user.languages && user.languages.length" variant="light" class="text-dark">{{ $t('profile.language') }}: {{ getFlags() }}</b-list-group-item>
          <b-list-group-item v-if="user.location" variant="light" class="text-dark">{{ $t('profile.location') }}: <strong>{{ user.location }}</strong></b-list-group-item>
          <b-list-group-item v-if="user.transportModel" variant="light" class="text-dark">{{ $t('profile.model') }}: <strong>{{ user.transportModel }}</strong></b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col v-if="user.transportPhotoName" cols="12" lg="6">
        <h3 class="underline font-weight-bold">{{ $t('main.photo') }}</h3>
        <figure class="figure mb-0">
          <b-img role="button" class="transportImage" center fluid rounded @click="index = 0" :src="`${$config.apiUrl}/users/image/${user.transportPhotoName}`" />
          <figcaption class="figure-caption text-center mb-0">{{ user.transportModel }}</figcaption>
        </figure>
      </b-col>
    </b-row>
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
      this.$axios.$get(`${this.$config.apiUrl}/users/${this.$route.params.id}`).then((response) => {
        this.user = response;
        this.user.languages = (this.user.languages || '').split(',').filter(i => !!i);
        this.items = [{
          title: this.user.transportModel,
          src: this.$config.apiUrl + '/users/image/' + this.user.transportPhotoName
        }]
      });
    },
    getFlags() {
      return this.languageOptions.filter(language => this.user.languages.includes(language.value)).map(language => language.text).join(" ")
    }
  }
}
</script>
