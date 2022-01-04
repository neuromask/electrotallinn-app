<template>
  <div>
    <b-row>
      <b-col class="mb-3" cols="12" lg="4" v-for="(image, imageIndex) in images" :key="imageIndex">
        <b-link :href="image.href" target="_blank">
          <b-img-lazy role="button" class="shadow-sm" center fluid rounded :alt="image.src" :src="require(`~/assets/img/social-banners/${image.src}.png`)" />
        </b-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { "src": "facebook", "href": "https://www.facebook.com/groups/electrotallinn" },
        { "src": "telegram", "href": "https://t.me/electrotallinn" },
        { "src": "youtube", "href": "https://www.youtube.com/electrotallinn" },
        { "src": "instagram", "href": "https://www.instagram.com/electrotallinn/" },
        { "src": "discord", "href": "https://discord.io/electrotallinn" },
        { "src": "tiktok", "href": "https://www.tiktok.com/@electrotallinn" },
        { "src": "reddit", "href": "https://www.reddit.com/r/ElectroTallinn/" },
        { "src": "500px", "href": "https://500px.com/p/electrotallinn" },
        { "src": "vkontakte", "href": "https://vk.com/electrotallinn" }
      ]
    };
  },
};
</script>