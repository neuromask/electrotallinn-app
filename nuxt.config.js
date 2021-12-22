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
    { src: '~/plugins/axios', ssr: false },
    { src: '~/plugins/load-script' },
    '~/plugins/globals'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module',
    '@nuxtjs/device'
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
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap'
  ],

  gtm: {
    id: process.env.GTAG_ID || 'G-1720L3K7S5', // Used as fallback if no runtime config is provided
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
    baseUrl: 'https://app.electrotallinn.ee',
    detectBrowserLanguage: {
      useCookie: true,
      cookieDomain: null,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
      fallbackLocale: ""
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
    exclude: [
      '/admin*',
      '/admin/*',
      '/et/admin*',
      '/et/admin/*',
      '/ru/admin**',
      '/ru/admin/*'
    ],
    i18n: true
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
    siteUrl: process.env.SITE_URL || 'https://app.electrotallinn.ee',
    apiUrl: process.env.API_URL || 'https://app.electrotallinn.ee/api',
    googleKey: process.env.GOOGLE_KEY
  },
  privateRuntimeConfig: {
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
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
      })
    }
  }
}
