<template>
  <section>
  </section>
</template>
<script>
export default {
  mounted() {
    this.redirect();
  },
  methods: {
    redirect() {
      this.$router.push(this.localePath('/game/minecraft'))
    }
  }
}
</script>