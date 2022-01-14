<template>
  <div class="d-flex justify-content-center" v-if="crumbs.length != 0">
<!--       <b-button size="sm" v-bind="attrs" v-on="on" @click="$router.back()" >
        <b-icon>back</b-icon>
      </b-button> -->

    <b-breadcrumb class="py-0" :items="crumbs"></b-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    crumbs() {
      let fullPath = this.$route.fullPath
      fullPath = (fullPath.substr(-1) === '/') ? fullPath.slice(0, -1) : fullPath;
      const params = fullPath.substring(1).split('/')  
      const crumbs = []
      let path = ''
      console.log(fullPath)
      
      params.forEach((param, index) => {
        
        path = `${path}/${param}`
        const match = this.$router.match(path)
        console.log(match.name)
        if (match.name !== null && !match.name.includes('index')) {
          console.log(index)
          crumbs.push({
            text: this.$t(`nav.${param}`),
            to: { name: match.name },
            ...match,
          })
        }
        if (match.name.includes('index')) {
          crumbs.push({
            text: this.$t('nav.home'),
            to: { name: match.name }
          })
        }
        
      })
      console.log(crumbs)
      return crumbs
    },
  },
}
</script>