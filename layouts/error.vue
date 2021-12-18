<template>
  <section>
      <h1 class="mt-5">Error <strong>{{error.statusCode}}</strong></h1>
      <h5 v-if="error.statusCode === 404">Page not found</h5>
      <h5>Please try something new :)</h5>
      <hr>
      <b-img center fluid :src="require('@/assets/img/not-found.png')" />
  </section>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error',
    data() {
    return {
      errorCode: 'Error ' + this.error.statusCode || 'Error'
    }
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })

    return {
      title: this.errorCode,
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