import getSiteMeta from "./utils/getSiteMeta";
const meta = getSiteMeta();

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: "en-GB",
    },
    title: 'ElectroTallinn App',
    meta: [
      ...meta,
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Electric market, charging and repair map, ElectroPeople profiles.' },
      { hid: "og:image", property: "og:image", content: "/app-et-02-en.jpg" },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { hid: 'og:url', property: 'og:url', content: `https://app.electrotallinn.ee` }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { hid: "canonical", rel: "canonical", href: "https://app.electrotallinn.ee", },
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
    // '@nuxtjs/eslint-module'
    '@nuxtjs/google-gtag',
    '@nuxtjs/device'
  ],

  serverMiddleware: [
    // Will register file from project server-middleware directory to handle /server-middleware/* requires
    { path: "/api", handler: "~/api/rest.js" }
      // { path: "/api", handler: "~/api/rest_old.js" }
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/toast'
  ],

  'google-gtag':{
    id: process.env.GTAG_ID || 'G-1720L3K7S5', // required
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
    vueI18nLoader: true,
    locales: [
      {
         code: 'en',
         name: 'English',
         flag: '🇬🇧',
         iso: 'en-US',
         file: 'en.yaml',
         text: 'ENG'
      },
      {
         code: 'ru',
         name: 'Русский',
         flag: '🇷🇺',
         iso: 'ru-RU',
         file: 'ru.yaml',
         text: 'РУС'
      },
      {
         code: 'et',
         name: 'Eesti',
         flag: '🇪🇪',
         iso: 'et-EE',
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
    //baseUrl: process.env.BASE_URL || 'http://localhost:3000/api',
    baseFileUrl: process.env.BASE_FILE_URL || 'https://files.electrotallinn.ee',
    baseUrl: process.env.BASE_URL || 'https://app.electrotallinn.ee/api',
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
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      })
    }
  }
}
