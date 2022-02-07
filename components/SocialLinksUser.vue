<template>
    <div v-if="socialUrls.length > 0" class="social-links d-flex justify-content-center mb-3">
      <a v-for="socialIcon in socialUrls" :key="socialIcon.type" :href="socialIcon.href" target="_blank"><b-icon :icon="socialIcon.type"></b-icon></a>
    </div>
</template>

<script>
export default {
  props: {
    facebookUrl: null,
    instagramUrl: null,
    youtubeUrl: null
  },
  computed: {
    socialUrls () {
      return this.social.filter(item => this[item.fieldName]).map(item => ({
        type: item.type,
        href: this[item.fieldName]
      }))
    }
  },
  data() {
    return {
      social: [
        { "type": "facebook", "fieldName": "facebookUrl" },
        { "type": "instagram", "fieldName": "instagramUrl" },
        { "type": "youtube", "fieldName": "youtubeUrl" },
      ]
    };
  }
}
</script>