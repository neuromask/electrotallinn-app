<template>
    <div>
        <div v-if="!$user.isLogged">
          <div class="d-flex justify-content-center align-items-center telegram-login-box">
            <TelegramLogin mode="callback" telegram-login="ElectroTallinnBot" :init-auth="true" :lang="$i18n.locale" size="large" radius="4" @callback="loginTelegram" />
          </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    loginTelegram(data) {
      this.$axios
        .$post(this.$config.baseUrl + '/authentication/login', data)
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
            location: response.user.location,
            transportPhotoName: response.user.transportPhotoName
          });
        });
    }
  }
};
</script>
