<template>
  <div id="app">
    <Sidebar />
    <ToastLogin />
    <main v-cloak>
      <Banner />
      <b-container class="bg-light mt-3 px-5 pt-0 main-container rounded position-relative">
        <NavBar />
          <b-alert v-show="!this.$user.isLogged" class="mt-3 mb-0" variant="warning" show dismissible><b-icon icon="arrow-up" /> {{ $t('main.loginToastWarning') }}</b-alert>
        <Nuxt />
      </b-container>
    </main>
    <footer>
      <client-only><cookie-law :buttonText="$t('main.cookieBtn')" :message="`🍪 ${$t('main.cookieText')}`" theme="et"></cookie-law></client-only>
      <Bottom />
    </footer>
  </div>
</template>

<style scoped>
.main-container {
  background: url('~/assets/img/tallinn-white.svg') center bottom no-repeat;
  padding-bottom: 5rem!important;
  min-height: 960px;  
}
</style>
<script>
export default {
  
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })

    return {
      titleTemplate: '%s - ElectroTallinn App',
      htmlAttrs: {
        lang: this.$i18n.locale,
        ...i18nHead.htmlAttrs
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.$t('meta.description') },
        { hid: "og:image", property: "og:image", content:`${this.$config.siteUrl}/app-et-${this.$i18n.locale}.jpg`, },
        { hid: 'og:url', property: 'og:url', content: `https://app.electrotallinn.ee` },
        { hid: "og:title", property: "og:title", content: 'ElectroTallinn App' },
        { hid: "og:description", property: "og:description", content: this.$t('meta.description') },
        { hid: "og:type", property: "og:type", content: 'website' },
        ...i18nHead.meta
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: `${this.$config.siteUrl}/favicon.png` },
        ...i18nHead.link
      ]
    }
  }

}
</script>