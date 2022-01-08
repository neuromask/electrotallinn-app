<template>
  <aside>
    <b-sidebar
      id="sidebar-variant"
      title="ET⚡ App"
      bg-variant="dark"
      text-variant="light"
      shadow
      backdrop
    >
      <div class="px-3 py-0">
        <nuxt-link to="/"><b-img-lazy class="mb-4 px-5 shadow-sm" src="~/assets/img/logo/circle.svg" fluid center /></nuxt-link>
        <div class="mb-4">
          <UserProfileBox />
          <UserLoginBox />
        </div>
        <div class="my-4">
          <Menu />
        </div>
        <div class="mb-4">
          <SocialLinks />
        </div>
        <div class="mb-4">
          <BotButton />
        </div>
        <Copyright />
      </div>
    </b-sidebar>
  </aside>
</template>

<script></script>