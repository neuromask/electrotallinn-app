<template>

  <div class="navbar">
    <b-sidebar
      id="sidebar-variant"
      title="ET⚡ App"
      bg-variant="dark"
      text-variant="light"
      shadow
      backdrop
    >
      <div class="px-3 py-0">
        <nuxt-link to="/"><b-img class="my-4" src="~/assets/img/circle.svg" fluid center /></nuxt-link>
        <b-list-group class="my-4">
          <b-list-group-item variant="info" class="font-weight-bold"><nuxt-link exact to="/">Home</nuxt-link></b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold"><nuxt-link to="/map">Map</nuxt-link></b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold"><nuxt-link to="/market">Market</nuxt-link></b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold"><nuxt-link to="/users">Users</nuxt-link></b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold"><nuxt-link to="/locations/ranks">Ranks</nuxt-link></b-list-group-item>
          <b-list-group-item variant="primary" class="font-weight-bold" href="https://electrotallinn.ee/" target="_blank">ElectroTallinn Site</b-list-group-item>
          <!--<b-list-group-item variant="primary" class="font-weight-bold" href="#" v-b-modal.modal-login>Admin Access</b-list-group-item>-->
        </b-list-group>

        <div v-if="$root.isLogged">
          <b-alert show variant="primary">
            <div class="d-flex justify-content-left align-items-center">
              <b-img class="float-left" rounded="circle" width="80" height="80" :src="$root.user.photoUrl" />
              <div class="ml-3">
                <h5 class="m-0">{{ $root.user.firstName }}</h5>
                <p class="m-0"><a :href="&quot;https://t.me/&quot;+$root.user.username" target="_blank">@{{ $root.user.username }}</a></p>
                <nuxt-link to="profile"><b-icon icon="person-bounding-box" /> Profile</nuxt-link>
              </div>
            </div>
          </b-alert>
        </div>
        <div v-if="!$root.isLogged">
          <b-alert show variant="primary" class="d-flex justify-content-center align-items-center telegram-login-box">
            <!--<vue-telegram-login mode="redirect" telegram-login="ElectroTallinnBot" size="large" radius="4" :redirect-url="$root.BACKEND_BASE+'/login'" />-->
            <!--<vue-telegram-login mode="callback" telegram-login="ElectroTallinnBot" size="large" radius="4" @callback="$root.loginTelegram" />-->
            <!--<telegram-login mode="callback" telegram-login="ElectroTallinnBot" :init-auth="true" size="large" radius="4" @callback="$root.loginTelegram" />-->
          </b-alert>
        </div>
        <b-modal id="modal-login" title="Access Admin area" ok-only ok-variant="secondary" ok-title="Cancel">
          <app-login />
        </b-modal>
        <p class="text-center small">Copyright © 2021 – ElectroTallinn<br>Crafted by Leo & <a href="https://nuforms.com/" target="_blank">Nuforms Design</a><br>v 0.1 (Beta) ElectroTallinn App</p>
      </div>
    </b-sidebar>

    <div id="badge">
      <a v-b-toggle.sidebar-variant><b-icon-list /></a>
    </div>
  </div>
</template>

<style scoped>
#badge {position: fixed; top: 10px; left: 0;height: 48px; z-index: 10; background-color: #1a2740; border-right: 4px solid #ec970f; cursor: pointer;}
#badge:hover {border-color: #f8da19;}
#badge a { height: 48px;  line-height: 48px; padding: 8px 12px; font-weight: bold; font-size: 36px; color: white;}
.nuxt-link-active {
  border-bottom: #ec970f 3px solid;
}
</style>
