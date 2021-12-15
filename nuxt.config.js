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
      { hid: "og:image", property: "og:image", content: "/etapp.jpg" },
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

  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },

  transition: {
    mode: "out-in"
  },

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
    '@nuxtjs/device',
    ['@nuxtjs/google-analytics', {
      id: 'G-H7BDVQX6FQ'
    }]
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
    '@nuxtjs/toast',
  ],

  bootstrapVue: {
    icons: true,
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: '~/locales/',
    vueI18nLoader: true,
    locales: [
      {
         code: 'en',
         name: 'English',
         flag: '🇬🇧',
         iso: 'en-US',
         file: 'en.yaml'
      },
      {
         code: 'ru',
         name: 'Русский',
         flag: '🇷🇺',
         iso: 'ru-RU',
         file: 'ru.yaml'
      }
    ],
    vueI18n: {
      locale: 'en',
      silentFallbackWarn: true,
      fallbackLocale: 'en'
    }
  },

  toast: {
    position: 'top-right',
    duration: 3000
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
