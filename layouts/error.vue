<template>
  <section>
    <b-row class="mt-5 d-flex justify-content-center align-items-center">
      <b-col cols="12" lg="6" class="mb-5">
        <b-img center fluid-grow :src="require('@/assets/img/not-found.png')" />
      </b-col>
      <b-col cols="12" lg="6">
        <b-card bg-variant="info" class="rounded shadow-sm">
          <h1 class="font-weight-bold">{{ $t('error.error') }} <strong>{{error.statusCode}}</strong></h1>
          <hr>
          <h5 v-if="error.statusCode === 404">{{ $t('error.notFound') }}</h5>
          <h5>{{ $t('error.try') }}</h5>
          <b-button class="nowrap mt-3" variant="primary" :to="localePath('/')" nuxt exact><b-icon icon="house-door-fill" /> {{ $t('nav.home') }}</b-button>
        </b-card>
      </b-col>
    </b-row>
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