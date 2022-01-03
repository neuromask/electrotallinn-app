<template>
  <div id="app">
    <Sidebar />
    <div class="navWrap"><Nav /></div>
    <main>
      <div class="fullScreen"><Nuxt /></div>
    </main>
  </div>
</template>
<style scoped>
main {
  height:100%;
}
.navWrap {
  position: fixed;
  height: 48px;
  width: 100%;
  z-index: 1;
}
.fullScreen {
  height:calc(100% - 48px);
  position: absolute;
  top:48px; left:0;
  width:100%;
}
</style>
<script>
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
        { hid: 'og:url', property: 'og:url', content: `https://app.electrotallinn.ee` },
        { hid: "og:title", property: "og:title", content: 'ElectroTallinn App' },
        { hid: "og:description", property: "og:description", content: this.$t('meta.description') },
        { hid: "og:type", property: "og:type", content: 'website' },
        ...i18nHead.meta
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        ...i18nHead.link
      ]
    }
  }

}
</script>
