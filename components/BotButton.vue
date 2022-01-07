<template>
    <b-button block class="shadow-sm mb-0" variant="light" href="https://t.me/electrotallinnbot" target="_blank">
        <b-avatar class="shadow-sm" variant="info" :src="require('@/assets/img/bot-avatar.svg')" />
        <span class="ml-2"><strong class="text-dark">ElectroBot</strong> {{ $t('main.chat') }}</span>
    </b-button>
</template>

<script></script>

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
