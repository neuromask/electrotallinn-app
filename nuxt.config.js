export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    '@/assets/styles/main.scss'
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-cookie-law', ssr: false },
    { src: '~/plugins/axios', ssr: true },
    { src: '~/plugins/load-script' },
    { src: '~/plugins/vue-tube', ssr: true },
    { src: '~/plugins/observe-visibility', ssr: true },
    { src: '~/plugins/vue-tinybox', ssr: false },
    '~/plugins/globals'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/device',
    '@nuxtjs/svg'
    //'@aceforth/nuxt-optimized-images'
  ],

  optimizedImages: {
    optimizeImages: false,
    optimizeImagesInDev: true,
    handleImages: ['jpeg', 'png', 'svg']
  },

  serverMiddleware: [
    // Will register file from project server-middleware directory to handle /server-middleware/* requires
    { path: "/api", handler: "~/api/rest.js" }
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    '@nuxtjs/google-gtag',
    '@nuxtjs/sitemap'
  ],

  'google-gtag':{
    id: process.env.GTAG_ID || 'G-73HXKBCYBZ', // required
    config:{
      // this are the config options for `gtag
      // check out official docs: https://developers.google.com/analytics/devguides/collection/gtagjs/
      anonymize_ip: false, // anonymize IP 
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker:{
        domains:['app.electrotallinn.ee']
      }
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...)
  },

  router: {
    scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        return {selector: to.hash}
      } else {
        return {x: 0, y: 0}
      }
    }
  },

  bootstrapVue: {
    icons: true,
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: '~/locales/',
    baseUrl: 'https://electrotallinn.ee',
    detectBrowserLanguage: {
      useCookie: true,
      cookieDomain: null,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: "en",
      redirectOn: 'root'  // recommended
    },
    seo: true,
    vueI18nLoader: true,
    lazy: false,
    locales: [
      {
         code: 'en',
         name: 'English',
         iso: 'en',
         file: 'en.yaml',
         text: 'ENG'
      },
      {
         code: 'ru',
         name: 'Русский',
         iso: 'ru',
         file: 'ru.yaml',
         text: 'РУС'
      },
      {
         code: 'et',
         name: 'Eesti',
         iso: 'et',
         file: 'et.yaml',
         text: 'EST'
      }
    ],
    vueI18n: {
      locale: 'en',
      silentFallbackWarn: true,
      fallbackLocale: 'en'
    }
  },

  sitemap: {
    hostname: 'https://electrotallinn.ee',
    //xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    exclude: [
      '/admin*',
      '/admin/*',
      '/et/admin*',
      '/et/admin/*',
      '/ru/admin**',
      '/ru/admin/*'
    ],
    i18n: true,
    i18n: {
      locales: ['en', 'ru', 'et'],
      routesNameSeparator: '___'
    }
  },

  toast: {
    position: 'top-center',
    duration: 4000
  },

  loading: {
    color: '#ec970f',
    height: '5px'
  },

  server: {
    port: process.env.SERVER_PORT || 3000, host: 'localhost', timing: false
    //port: 80, host: 'localhost', timing: false
  },

  publicRuntimeConfig: {
    baseFileUrl: process.env.BASE_FILE_URL || 'https://files.electrotallinn.ee',
    siteUrl: process.env.SITE_URL || 'https://electrotallinn.ee',
    apiUrl: process.env.API_URL || 'https://electrotallinn.ee/api',
    googleKey: process.env.GOOGLE_KEY,
    flickrKey: process.env.FLICKR_KEY
  },
  privateRuntimeConfig: {
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
    meta: {
      theme_color: '#1a2740'
    }
  },
  render: {
    // Setting up cache for 'static' directory - a year in milliseconds
    // https://web.dev/uses-long-cache-ttl
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000,
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-plugin-load-script'],
    cssSourceMap: false,
    babel: {
      compact: true,
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      }),
      config.module.rules.push({
        test: /\.mp3$/,
        use: 'file-loader'
      })
    }
  }
}
