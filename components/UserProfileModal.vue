<template>
    <b-modal body-bg-variant="light" header-bg-variant="light" size="xl" body-class="modal-style" :cancel-title="$t('action.cancel')" scrollable centered id="profile-modal" :title="$t('main.editProfile')" @ok="handleOk">
      <b-form  @submit.stop.prevent="handleSubmit">
        <b-card-group columns>
          <b-card>
            <div class="text-center mb-3">
              <b-img class="profile shadow" :src="user.photoUrl" rounded="circle" thumbnail />
            </div>
            <h3 class="underline font-weight-bold">{{ $t('main.info') }}</h3>

            <b-form-group :label="$t('profile.name')">
              <b-form-input id="input-1" v-model="userEdit.firstName" :placeholder="$t('profile.name')" required/>
            </b-form-group>

            <b-form-group :label="$t('profile.birthYear')">
              <b-form-input type="number" :formatter="formatYear" id="input-1-1" v-model="userEdit.birthyear" placeholder="####" required/>
            </b-form-group>

            <b-form-group :label="$t('profile.location')">
              <b-form-input id="input-2" v-model="userEdit.location" :placeholder="$t('profile.locationPlace')" required/>
            </b-form-group>
            
            <b-form-group class="m-0" :label="$t('profile.language')">
              <b-form-checkbox-group
                v-model="userEdit.languages"
                :options="languageOptions"
                button-variant="light"
                name="buttons-1"
                buttons
              />
            </b-form-group>
          </b-card>
          <b-card>
            <h3 class="underline font-weight-bold">{{ $t('main.transport') }}</h3>

            <b-form-group :label="$t('profile.model')">
              <b-form-input id="input-3" v-model="userEdit.transportModel" :placeholder="$t('profile.model')" required/>
            </b-form-group>
            <b-form-group class="m-0" :label="$t('main.photo')">
              <div class="d-flex mb-3">
                <b-form-file v-model="userEdit.transportPhoto" accept="image/jpeg" :placeholder="$t('main.selectPhoto')" class="w-auto flex-grow-1"/>
                <b-button v-if="hasImage" variant="danger" class="ml-3" @click="clearImage"><b-icon icon="x" /></b-button>
              </div>
              <b-img v-if="hasImage" :src="imageSrc" fluid block rounded/>
              <div v-if="!hasImage && userEdit.transportPhotoName" class="position-relative">
                <b-img :src="$config.apiUrl + '/users/image/' + userEdit.transportPhotoName" fluid block rounded/>
                <b-button variant="danger" class="m-3 position-absolute btn-close" @click="clearImage"><b-icon icon="x" /></b-button>
              </div>
            </b-form-group>
          </b-card>
        </b-card-group>
      </b-form>
    </b-modal>
</template>
<script>
const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export default {
  props: {},
  data() {
    return {
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
      ],
      show: true
    }
  },
  computed: {
    hasImage() {
      return !!this.userEdit.transportPhoto;
    }
  },
  created () {
    this.getUser()
  },
  watch: {
    $route () {
     this.getUser();
    },
    'userEdit.transportPhoto'(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then(value => {
              this.imageSrc = value;
            })
            .catch(() => {
              this.imageSrc = null;
            });
        } else {
          this.imageSrc = null;
        }
      }
    }
  },
  methods: {
    getUser() {
      //console.log(this.$nuxt.$route.path)
      this.$axios.$get(`${this.$config.apiUrl}/users/${this.$route.params.id}`).then((response) => {
        this.user = response;
        this.user.languages = (this.user.languages || '').split(',').filter(i => !!i);
        this.items = [{
          title: this.user.transportModel,
          src: this.$config.apiUrl + '/users/image/' + this.user.transportPhotoName
        }]
        this.userEdit = JSON.parse(JSON.stringify(this.user));
      });
    },
    clearImage() {
      if (this.hasImage) {
        this.userEdit.transportPhoto = null;
      } else {
        this.userEdit.transportPhotoName = null;
      }
    },
    getFlags() {
      return this.languageOptions.filter(language => this.user.languages.includes(language.value)).map(language => language.text).join(" ")
    },
    formatYear(e){
     return String(e).substring(0,4);
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      const data = JSON.parse(JSON.stringify(this.userEdit));
      if (this.imageSrc) data.transportPhoto = this.imageSrc.split(',')[1]
      data.languages = data.languages.join()
      this.$axios.$put(`${this.$config.apiUrl}/users/${this.$route.params.id}`, data).then(() => {
        this.getUser()
        this.$nextTick(() => {
          this.$emit('save');
          this.$bvModal.hide('profile-modal')
        })
      });
    }
  }
}
</script>

<style scoped>
.btn-close {
  top:0; right:0;
}
@media (min-width: 576px) {
  .card-columns {
    column-count: 2;
  }
}
</style>

