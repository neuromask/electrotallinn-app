<template>
    <a href="https://t.me/electrotallinnbot" target="_blank">
      <div class="botAvatarCont mb-0 w-100 d-flex justify-content-center align-items-center bg-light p-2 text-dark rounded">
        <b-img class="botAvatar" rounded="circle" :src="require('@/assets/img/bot-avatar.svg')" />
        <p class="mb-0 ml-2"><strong>ElectroTallinn Bot</strong> Chat</p>
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
