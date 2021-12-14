<template>
  <div>
    <b-button class="btn-lang" v-if="$i18n.locale == 'ru'" exact :to="switchLocalePath('en')" variant="primary" size="sm"><small>Eng</small></b-button>
    <b-button class="btn-lang" v-if="$i18n.locale == 'en'" :to="switchLocalePath('ru')" variant="primary" size="sm"><small>Рус</small></b-button>
  </div>
</template>
<script>
export default {}
</script>
<style>
.btn-lang {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

</style>