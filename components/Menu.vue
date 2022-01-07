<template>
  <div>
    <b-list-group flush class="side-menu w-100">
      <b-list-group-item class="font-weight-bold text-primary" nuxt :to="localePath('/')" exact><b-icon icon="house-door-fill"></b-icon>{{ $t('nav.home') }}</b-list-group-item>
      <b-list-group-item class="font-weight-bold text-primary" nuxt :to="localePath('/market')"><b-icon icon="basket2-fill"></b-icon>{{ $t('nav.market') }}</b-list-group-item>
      <b-list-group-item class="font-weight-bold text-primary" nuxt :to="localePath('/blog')"><b-icon icon="chat-square-text-fill"></b-icon>{{ $t('nav.blog') }}</b-list-group-item>
      <b-list-group-item class="font-weight-bold text-primary" nuxt :to="localePath('/map')"><b-icon icon="geo-alt-fill"></b-icon>{{ $t('nav.map') }}</b-list-group-item>
      <b-list-group-item class="font-weight-bold text-primary" nuxt :to="localePath('/game')"><b-icon icon="dice-5-fill"></b-icon>{{ $t('nav.game') }}</b-list-group-item>
      <b-list-group-item class="font-weight-bold text-primary" nuxt :to="localePath('/users')"><b-icon icon="person-fill"></b-icon>{{ $t('nav.users') }}</b-list-group-item>
      <b-list-group-item class="font-weight-bold text-primary" href="/admin" v-if="$user.role === 'ADMIN'"><b-icon icon="shield-lock-fill" />Admin</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script></script>

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
.side-menu .nuxt-link-active {
  color: #1a2740 !important;
}
.b-sidebar-body .side-menu .list-group-item-info.list-group-item-action:hover, 
.b-sidebar-body .side-menu .list-group-item-info.list-group-item-action:focus {
    background-color: #c0d1e6;
    transition: background-color 0.4s ease-out;
}

.b-sidebar-body .side-menu .list-group-item:after {
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
.b-sidebar-body .side-menu .list-group-item:hover:after {
  transform: scaleY(1);
  transform-origin: top left;
}
.b-sidebar-body .side-menu .nuxt-link-active {
  background-color: #c0d1e6;
}
.b-sidebar-body .list-group-item.nuxt-link-active:after  {
  content: '';
  position: absolute;
  width: 4px;
  height: 100%;
  bottom: 0;
  left: 0;
  transform: scaleX(1);
  background-color: #ec970f;
}

footer .list-group-item {
  padding: 0.4rem 1.25rem;
  border:0;
}
footer .side-menu svg {
  width: 1em;
  height: 1em;
}
</style>
