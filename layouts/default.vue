<template>
  <div id="app" class="layout-default">
    <Sidebar />
    <Header class="mb-3" />
    <Breadcrumbs />
    <main class="mt-2">
      <b-container fluid="xl" class="bg-light px-lg-5 pt-0 main-container rounded position-relative overflow-visible">
        <Nav />
        <b-alert v-show="!this.$user.isLogged" class="mt-3 mb-0" variant="warning" show dismissible><b-icon icon="arrow-up" /> {{ $t('main.loginToastWarning') }}</b-alert>
        <Nuxt />
      </b-container>
    </main>
    <Footer />
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
import jsonLd from "~/assets/json/jsonld.json";

export default {
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })

    return {
      titleTemplate: '%s - ElectroTallinn',
      htmlAttrs: {
        lang: this.$i18n.locale,
        ...i18nHead.htmlAttrs
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.$t('meta.description') },
        { hid: "og:image", property: "og:image", content:`${this.$config.siteUrl}/app-et-${this.$i18n.locale}.jpg`, },
        { hid: 'og:url', property: 'og:url', content: this.$config.siteUrl+this.$nuxt.$route.path },
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
  },
  jsonld() {
     return jsonLd;
  }
}
</script>