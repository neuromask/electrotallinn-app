<template>
  <div id="NotFound">
      <h2 class="mt-5"><strong>Error 404</strong> - not found.</h2>
      <h5>Please try something new :)</h5>
      <hr>
      <b-img center fluid :src="require('@/assets/img/not-found.png')" />
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {},
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {

  }
}
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
