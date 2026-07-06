import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.io', 'robots.txt', 'apple-touch-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

        runtimeCaching: [
          {
            // api req caching
            urlPattern: /^https:\/\/api\.example\.com\/.*/i, //caches api request matching this pattern

            handler: 'NetworkFirst', // network first then cache if fails

            options: {
              cacheName: 'api-cache', //cache name

              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200], //only cache status codes 0 (CORS) and 200 (success)
              }
            }
          },
          {
            //image caching
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,

            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Test PWA App',
        short_name: 'PWA App',
        description: 'testing progress',
        start_url: '/',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',  // Small icon
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',  // Large icon
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'  // Works in various environments
          }
        ]
      }
    })
  ],
})
