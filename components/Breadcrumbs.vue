<template>
    <b-breadcrumb>
      <b-breadcrumb-item :to="'/'" class="title">
        Home
      </b-breadcrumb-item>
      <b-breadcrumb-item 
        nuxt
        v-for="link, i in breadcrumbsLinks"
        :key="i"
        :to="link"
        >
        {{ link.title }}
      </b-breadcrumb-item>
    </b-breadcrumb>
</template>

<script>
import startCase from 'lodash.startcase'

  export default {
    name: 'breadcrumbs',
    computed: {
      breadcrumbsLinks () {
        let tmp = []
        if (this.$route.matched) {
          this.$route.matched.forEach(link => {
            tmp.push(Object.assign({title: startCase(link.path)}, link))
          })
        }
        return tmp
      }
    }
  }
</script>