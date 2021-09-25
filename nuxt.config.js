export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ElectroTallinn',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
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
    { src: '~plugins/vue-cookie-law.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module'
    '@nuxtjs/device',
    ['@nuxtjs/google-analytics', {
      id: 'G-H7BDVQX6FQ'
    }]
  ],

  serverMiddleware: [
    // Will register file from project server-middleware directory to handle /server-middleware/* requires
    //{ path: '/api', handler: '~/api/index.js' },
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
    '@nuxtjs/pwa'
  ],

  bootstrapVue: {
    icons: true,
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome'
        },
        fr: {
          welcome: 'Bienvenue'
        },
        es: {
          welcome: 'Bienvenido'
        }
      }
    }
  },

  loading: {
    color: '#ec970f',
    height: '5px'
  },

  publicRuntimeConfig: {
    baseUrl: '/api',
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
  build: {}
}
