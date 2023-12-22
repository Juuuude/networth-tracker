// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@invictus.codes/nuxt-vuetify',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    manifest: {
      name: "Financial Playbook",
      short_name: "Financial Playbook",
      description: "An application where you can see your user's total networth and the breakdown of their assets, income, expenses and liabilities.",
      icons: [
        {
          src: 'icons/FS_logo_64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'icons/FS_logo_144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'icons/FS_logo_192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/FS_logo_512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*'],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    }
  },
})
