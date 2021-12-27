<template>
    <div>
        <div v-if="!$user.isLogged">
          <div class="d-flex justify-content-center align-items-center telegram-login-box">
            <TelegramLogin mode="callback" telegram-login="ElectroTallinnBot" :init-auth="true" :lang="$i18n.locale" :key="telegramComponent" size="large" radius="4" @callback="loginTelegram" />
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      telegramComponent: 0
    }
  },
  beforeUpdate () {
    this.forceRerender();
  },
  methods: {
    forceRerender() {
      this.telegramComponent += 1
    },
    loginTelegram(data) {
      this.$axios
        .$post(this.$config.apiUrl + '/authentication/login', data)
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('jwt', response.token);

          Object.assign(this.$user, {
            isLogged: true,
            firstName: data.first_name,
            uin: data.id,
            photoUrl: data.photo_url,
            username: data.username,
            role: response.user.role,
            balance: response.user.balance,
            location: response.user.location,
            transportPhotoName: response.user.transportPhotoName
          });
        });
    }
  }
};
</script>
