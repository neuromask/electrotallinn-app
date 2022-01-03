<template>
  <b-img-lazy :src="imgSrc()" :alt="alt" />
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