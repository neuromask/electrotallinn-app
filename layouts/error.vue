<template>
  <div id="NotFound">
    <b-container class="bg-light p-5 mt-4">
      <h2 class="m-0"><strong>Error 404</strong> - not found.</h2>
      <h5>Please try something new :)</h5>
      <hr>
      <b-img center :src="require('@/assets/img/not-found.png')" />
    </b-container>
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
