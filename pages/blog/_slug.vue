<template>
<article>
  <b-row class="justify-content-md-center">
    <b-col cols="12" lg="8">
      <h1 class="font-weight-bold underline">{{ post.title }}</h1>
      <nuxt-content :document="post" />
      <h3 class="underline mt-5">{{ $t('action.share') }}</h3>
      <div class="share-network-list text-white">
        <ShareNetwork
          v-for="network in networks"
          :network="network.network"
          :key="network.network"
          :style="{backgroundColor: network.color}"
          :url="$config.siteUrl+post.path"
          :title="post.title"
          :description="post.description"
          twitterUser="electrotallinn"
        >
          <b-icon :icon="network.icon" />
          <span>{{ network.name }}</span>
        </ShareNetwork>
      </div>
    </b-col>
  </b-row>
  </article>
</template>

<script>
export default {
  name: 'BlogSlug',
  async asyncData({ $content, params, app, error }) {
    const post = await $content(app.i18n.locale, 'blog', params.slug)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
      post.sharing
    return { post }
  },
  head() { 
    return { 
      title: this.post.title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description },
        { hid: "og:image", property: "og:image", content: this.$config.siteUrl + require(`/assets/blog/${this.post.image}`) },
        { hid: 'og:url', property: 'og:url', content: this.$config.siteUrl+this.post.path },
        { hid: "og:title", property: "og:title", content: this.post.title },
        { hid: "og:description", property: "og:description", content: this.post.description },
        { hid: "og:type", property: "og:type", content: 'article' },
      ]
    }
  },
  data () {
    return {
      networks: [
        { network: 'facebook', name: 'Facebook', icon: 'facebook', color: '#1877f2' },
        { network: 'reddit', name: 'Reddit', icon: 'bookmark-fill', color: '#ff4500' },
        { network: 'telegram', name: 'Telegram', icon: 'card-text', color: '#0088cc' },
        { network: 'twitter', name: 'Twitter', icon: 'twitter', color: '#1da1f2' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'telephone', color: '#25d366' }
      ]
    }
  }
}
</script>

<style>
  .share-network-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-width: 1000px;
  }
  a[class^="share-network-"] {
    flex: none;
    color: #FFFFFF;
    background-color: #333;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 10px 10px 0;
  }
  a[class^="share-network-"] .b-icon {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 6px;
    width:32px;
    height: 100%;
    flex: 1 1 auto;
  }
  a[class^="share-network-"] span {
    padding: 6px 10px;
    flex: 1 1 0%;
    font-weight: 500;
  }
</style>