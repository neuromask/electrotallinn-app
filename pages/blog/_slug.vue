<template>
  <div>
    <h1 class="font-weight-bold underline">{{ post.title }}</h1>
    <nuxt-content :document="post" />
  </div>
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
    return { post }
  },
  head() { 
    return { 
      title: this.post.title,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.post.description
      }]
    }
  }
}
</script>