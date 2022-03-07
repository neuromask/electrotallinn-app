<template>
  <section>
    <div class="d-flex justify-content-between align-items-start">
      <h3 class="underline font-weight-bold">{{ $t('nav.gallery') }}</h3>
      <b-button font-scale="2" variant="primary" href="https://www.flickr.com/photos/electrotallinn/" target="_blank"><b-icon icon="card-image" /> {{ $t('main.allPhotos') }}</b-button>
    </div>
    <Flickr />
  </section>
</template>

<script>
export default {
    head() { return { title: this.$t("nav.gallery"), }; }
}
</script>