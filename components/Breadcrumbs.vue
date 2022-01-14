<template>
  <div class="d-flex justify-content-center" v-if="crumbs.length != 0">
<!--       <b-button size="sm" v-bind="attrs" v-on="on" @click="$router.back()" >
        <b-icon>back</b-icon>
      </b-button> -->

    <b-breadcrumb class="py-0 mb-0 small" :items="crumbs"></b-breadcrumb>
  </div>
</template>

<script>
export default {
  jsonld() {
    const items = this.crumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.fullUrl,
        name: item.text,
      },
    }));
    return {
      "name":"ElectroTallinn",
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  },
  computed: {
    crumbs() {
      let fullPath = this.$route.fullPath
      fullPath = (fullPath.substr(-1) === '/') ? fullPath.slice(0, -1) : fullPath;
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          if (index == 0) {
            crumbs.push({
              text: this.$t('nav.home'),
              to: this.localePath('/'),
              fullUrl: this.$config.siteUrl + this.localePath('/').slice(0, -1)
            })
          }
          if (!match.name.includes(['index___']) && !match.name.includes('users-id') && !match.name.includes('blog-slug') && !match.name.includes('market-id')) {
            crumbs.push({
              text: this.$t(`nav.${param}`),
              to: path,
              fullUrl: this.$config.siteUrl + path,
              ...match,
            })
          }
          if (match.name.includes('users-id') && !match.hash) {
            crumbs.push({
              text: this.$t('nav.profile'),
              to: path,
              fullUrl: this.$config.siteUrl + path,
              ...match,
            })
          }
          if (match.name.includes('market-id') && !match.hash) {
            crumbs.push({
              text: this.$t('main.product'),
              to: path,
              fullUrl: this.$config.siteUrl + path,
              ...match,
            })
          }
          if (match.name.includes('blog-slug') && !match.hash) {
            crumbs.push({
              text: this.$t('nav.article'),
              to: path,
              fullUrl: this.$config.siteUrl + path,
              ...match,
            })
          }
        }
      })
      //console.log(crumbs)
      return crumbs
    },
  },
}
</script>