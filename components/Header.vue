<template>
  <header v-observe-visibility="visibilityChanged">
    <NuxtLink :to="localePath('/')"><b-img-lazy src="~assets/img/site-top-anim.svg" alt="ElectroTallinn - Electric transport group in Tallinn" center id="banner" /></NuxtLink>
    <transition name="fade">
      <b-button v-if="!isVisible" variant="primary" class="back-top shadow-sm rounded" @click="scrollToTop"><b-icon icon="arrow-up" /></b-button>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible
    },
    scrollToTop() {
      window.scrollTo({ top: 0 });
    }
  }
}
</script>

<style>
#banner {
  width: 100%;
  height: 32vw;
  max-height:360px;
  object-fit: cover;
}

.back-top {
  position: fixed;
  right:1rem;
  bottom:1rem;
  z-index: 100;
  transition: .6s;
}

</style>
