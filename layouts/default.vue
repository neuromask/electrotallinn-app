<template>
  <div id="app" class="layout-default">
    <Sidebar />
    <Header />
    <main v-cloak>
      <b-container fluid="xl" class="bg-light px-lg-5 pt-0 mt-2 main-container rounded position-relative overflow-visible">
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
        { rel: 'icon', type: 'image/png', href: `${this.$config.siteUrl}/favicon.png` },
        ...i18nHead.link
      ]
    }
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'NGO',
      'name': 'ElectroTallinn',
      'legalName': 'ElectroTallinn',
      'url': 'https://electrotallinn.ee',
      'logo': 'https://store.electrotallinn.ee/electrotallinn-logo.jpg',
      'foundingDate': '2020',
      'founders': [
        {
          '@type': 'Person',
          'name': 'Aleksandr Ponomarjov'
        }
      ],
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Paepargi 45',
        'addressLocality': 'Harjumaa',
        'addressRegion': 'EE',
        'postalCode': '11417',
        'addressCountry': 'Estonia'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'joint rides',
        'telephone': '[+372 55604175]',
        'email': 'electrotallinn.ee@gmail.com'
      },
      'sameAs': [
        'https://www.facebook.com/groups/electrotallinn',
        'https://www.instagram.com/electrotallinn',
        'https://www.reddit.com/r/electrotallinn',
        'https://t.me/electrotallinn',
        'https://discord.io/electrotallinn',
        'https://500px.com/p/electrotallinn',
        'https://www.youtube.com/electrotallinn',
        'https://www.tiktok.com/@electrotallinn',
        'https://vk.com/electrotallinn',
        'https://www.flickr.com/electrotallinn'
      ]
    }
  }
}
</script>