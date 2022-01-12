<template>
  <figure class="m-0 position-relative">
    <b-img-lazy class="rounded shadow-sm" :src="imgSrc()" :alt="alt" />
    <figcaption v-if="caption" class="small text-center position-absolute" style="bottom:.2rem;left:.5rem"><b-badge>{{caption}}</b-badge></figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: false,
    },
  },
  methods: {
    imgSrc() {
      try {
        return require(`~/assets/blog/${this.src}`)
      } catch (error) {
        return null
      }
    },
  },
}
</script>