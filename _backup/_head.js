  // Global page headers: https://go.nuxtjs.dev/config-head
  export default {
  head: {
    htmlAttrs: {
      lang: "en-GB",
    },
    title: 'ElectroTallinn App',
    meta: [
      ...meta,
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Electric market, charging and repair map, ElectroPeople profiles.' },
      { hid: "og:image", property: "og:image", content: "/app-et-02-en.jpg" },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { hid: 'og:url', property: 'og:url', content: `https://app.electrotallinn.ee` }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { hid: "canonical", rel: "canonical", href: "https://app.electrotallinn.ee", },
    ]
  }
}
export default {
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    
    return {
      title: 'ElectroTallinn App',
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