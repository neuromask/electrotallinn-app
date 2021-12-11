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
        <nuxt-link to="/"><b-img class="mb-4 px-5" src="~/assets/img/circle.svg" fluid center /></nuxt-link>
        <div class="mb-4">
          <div v-if="$user.isLogged">
            <b-alert show variant="primary">
                <div class="d-flex justify-content-left align-items-center">
                    <b-img class="float-left" rounded="circle" width="80" height="80" :src="$user.photoUrl" />
                    <div class="ml-3">
                    <h5 class="m-0">{{ $user.firstName }}</h5>
                    <nuxt-link :to="`/users/${$user.uin}`"><b-icon icon="person-bounding-box" /> Profile</nuxt-link>
                    </div>
                </div>
            </b-alert>
        </div>
        <UserLoginBox />
        </div>
        <b-list-group class="my-4 side-menu">
          <b-list-group-item variant="info" class="font-weight-bold" nuxt to="/" exact><b-icon icon="house-door-fill"></b-icon>Home</b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold" nuxt to="/map"><b-icon icon="geo-alt-fill"></b-icon>Map</b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold" nuxt to="/market"><b-icon icon="basket2-fill"></b-icon>Market</b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold" nuxt to="/users"><b-icon icon="person-fill"></b-icon>Users</b-list-group-item>
          <!--<<b-list-group-item variant="info" class="font-weight-bold" nuxt to="/help"><b-icon icon="info-circle-fill"></b-icon>Help</b-list-group-item>-->
          <b-list-group-item variant="primary" class="font-weight-bold" href="/admin" v-if="$user.role === 'ADMIN'"><b-icon icon="shield-lock-fill" />Admin</b-list-group-item>
        </b-list-group>
        <div class="mb-3">
          <BotButton />
        </div>
        <div class="mb-3">
          <SocialLinks />
        </div>
        <a class="text-center d-block" href="https://electrotallinn.ee/" target="_blank">ElectroTallinn Website</a>
        <p class="text-center small">Copyright © 2021 – ElectroTallinn<br>Crafted by Leo & <a href="https://nuforms.com/" target="_blank">Nuforms Design</a><br>v 0.1 (Beta) ElectroTallinn App</p>
      </div>
    </b-sidebar>

    <!--<div id="badge">
      <a v-b-toggle.sidebar-variant><b-icon-list /></a>
    </div>-->
  </div>
</template>

<style scoped>
#badge {position: fixed; top: 10px; left: 0;height: 48px; z-index: 1030; background-color: #1a2740; border-right: 4px solid #ec970f; cursor: pointer;}
#badge:hover {border-color: #f8da19;transition: border-color 0.4s ease-out;}
#badge a { height: 48px;  line-height: 48px; padding: 8px 12px; font-weight: bold; font-size: 36px; color: white;}

.side-menu img,
.side-menu svg {
  width: 1.6em;
  height: 1.6em;
  margin-right: 1em;
}
.side-menu .list-group-item {
  display: flex;
  align-items: center;
  position: relative;
}
.side-menu .list-group-item-info.list-group-item-action:hover, 
.side-menu .list-group-item-info.list-group-item-action:focus {
    color: #1a2740;
    background-color: #c0d1e6;
    transition: background-color 0.4s ease-out;
}

.side-menu .list-group-item:after {
  content: '';
  position: absolute;
  width: 4px;
  height: 100%;
  transform: scaleY(0);
  bottom: 0;
  left: 0;
  background-color: #ec970f;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.side-menu .list-group-item:hover:after {
  transform: scaleY(1);
  transform-origin: top left;
}
.side-menu .nuxt-link-active {
  background-color: #c0d1e6;
}
.list-group-item.nuxt-link-active:after  {
  content: '';
  position: absolute;
  width: 4px;
  height: 100%;
  bottom: 0;
  left: 0;
  transform: scaleX(1);
  background-color: #ec970f;
}
</style>
