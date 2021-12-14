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
          <UserProfileBox />
          <UserLoginBox />
        </div>
        <b-list-group class="my-4 side-menu">
          <b-list-group-item variant="info" class="font-weight-bold" nuxt :to="localePath('/')" exact><b-icon icon="house-door-fill"></b-icon>{{ $t('nav.home') }}</b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold" nuxt :to="localePath('/market')"><b-icon icon="basket2-fill"></b-icon>{{ $t('nav.market') }}</b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold" nuxt :to="localePath('/map')"><b-icon icon="geo-alt-fill"></b-icon>{{ $t('nav.map') }}</b-list-group-item>
          <b-list-group-item variant="info" class="font-weight-bold" nuxt :to="localePath('/users')"><b-icon icon="person-fill"></b-icon>{{ $t('nav.users') }}</b-list-group-item>
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

  </div>
</template>

<style scoped>

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
