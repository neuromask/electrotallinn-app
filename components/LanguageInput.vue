<template>
  <div>
    <b-button-group vertical>
      <b-button variant="primary" size="sm" class="btn-lang text-white" v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)"><small>{{ locale.text }}</small></b-button>
    </b-button-group>
  </div>
</template>
<script>
export default {
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>
<style>
.btn-lang {
  border-top-right-radius: 0!important;
  border-bottom-right-radius: 0!important;
  padding: 0.15rem 0.4rem!important;
  font-size: 0.8rem!important;
  line-height: 1.2!important;
}
</style>