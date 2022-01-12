<template>
  <section>
    <h1 class="underline font-weight-bold">{{ $t('nav.articles') }} <span class="small">({{ posts.length }})</span></h1>
    <transition-group name="card-list" mode="out-in" class="row">
      <b-col cols="12" md="6" lg="4" class="card-list-item mb-4" v-for="post in posts" :key="post.title">
        <b-card class="shadow-sm" bg-variant="info" no-body style="font-size:0.9rem; line-height:1rem;" >
          <div class="px-3 pt-3 pb-0">
            <div class="p-container position-relative">
              <nuxt-link v-if="post.image" :to="localePath(post.path)">
                <markdown-image class="p-image" :src="post.image" :alt="post.title"></markdown-image>
              </nuxt-link>
            </div>
          </div>
          <b-card-body>
            <div class="mb-3">
              <nuxt-link v-if="post.title" :to="localePath(post.path)"><h5 class="title mb-1 text-secondary font-weight-bold">{{ cutText(post.title, 25) }}</h5></nuxt-link>
              <p class="text-muted d-block mb-0" v-if="post.description">{{ cutText(post.description, 35) }}</p>
            </div>
            <b-button size="sm" variant="warning" class="text-info" nuxt :to="localePath(post.path)"><b-icon icon="search" /> {{ $t('blog.readMore') }}</b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </transition-group>
  </section>
</template>

<script>
export default {
  name: 'BlogOverview',
  async asyncData({ $content, app, error }) {
    const posts = await $content(app.i18n.locale, 'blog')
      .only(['title', 'image', 'description', 'path'])
      .sortBy('createdAt', 'asc')
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      posts: posts.map((posts) => ({
        ...posts,
        path: posts.path.replace(`/${app.i18n.locale}`, ''),
      }))
    }
  },
  methods: {
      cutText(text, limit){
      if (text.length > limit){
        for (let i = limit; i > 0; i--){
          if(text.charAt(i) === ' ' && (text.charAt(i-1) != ','||text.charAt(i-1) != '.'||text.charAt(i-1) != ';')) {
            return text.substring(0, i) + '..';
          }
        }
        return text.substring(0, limit) + '..';
      }
      else return text;
    }
  }
}
</script>