<template>
  <div>
    <b-button variant="primary" size="sm" class="btn-lang" exact v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)"><small>{{ locale.text }}</small></b-button>
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
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

</style>