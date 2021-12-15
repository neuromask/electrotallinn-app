<i18n lang="yaml">
  en:
    chat: "Chat"
  ru:
    chat: "Чат"
</i18n>
<template>
    <a href="https://t.me/electrotallinnbot" target="_blank">
      <div class="botAvatarCont mb-0 w-100 d-flex justify-content-center align-items-center bg-light p-2 text-dark rounded">
        <b-avatar variant="info" :src="require('@/assets/img/bot-avatar.svg')"></b-avatar>
        <p class="mb-0 ml-2"><strong class="text-dark">ElectroBot</strong> {{ $t('main.chat') }}</p>
        </div>
    </a>
</template>
<style>
.botAvatar {
  float: left;
  width: 32px;
  height:32px;
}
.botAvatarCont {
  border: 0;
  margin: 0 auto;
  width: 100%;
  height:48px;
}
</style>
