module.exports = {
  ssr: false,
  // Headers of the page
  head: {
    title: 'mikan-peel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Juicy interface for mikan' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    { src: '~/assets/styles/main.scss', lang: 'scss' },
  ],

  // Customize the progress bar color
  loading: { color: '#3B8070' },

  // Build configuration
  build: {
    // Run ESLint on save
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  plugins: [{ src: '~/plugins/nuxt-client-init.js', ssr: false }],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/font-awesome',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
  ],

  pwa: {
    icon: {
      source: '/icon.png',
      filename: 'icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      targetDir: 'icons',
      plugin: true,
    },
    manifest: {
      name: 'mikan-peel',
      lang: 'ja',
      short_name: 'mikan-peel',
      title: 'mikan-peel',
      'og:title': 'mikan-peel',
      description: 'Juicy interface for mikan',
      'og:description': 'Juicy interface for mikan',
      theme_color: '#f08300',
      background_color: '#ffffff'
    },
    workbox: {
      dev: true,
    },
  },
}
