if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, i) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let t = {};
    const o = (e) => a(e, c),
      r = { module: { uri: c }, exports: t, require: o };
    s[c] = Promise.all(n.map((e) => r[e] || o(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-50de5c5d'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/4788.svg',
          revision: '686506657260568e9437d51f2d8b3998',
        },
        {
          url: '/Arrows.svg',
          revision: '3eab51f146f94e1d28ec5e5ac8bc95b6',
        },
        {
          url: '/_next/static/chunks/314-c39756e7f9cfb0dc.js',
          revision: 'c39756e7f9cfb0dc',
        },
        {
          url: '/_next/static/chunks/435-aa4213784e146a1a.js',
          revision: 'aa4213784e146a1a',
        },
        {
          url: '/_next/static/chunks/framework-2c79e2a64abdb08b.js',
          revision: '2c79e2a64abdb08b',
        },
        {
          url: '/_next/static/chunks/main-e9a1acb106426a8b.js',
          revision: 'e9a1acb106426a8b',
        },
        {
          url: '/_next/static/chunks/pages/404-959388d88bde4eca.js',
          revision: '959388d88bde4eca',
        },
        {
          url: '/_next/static/chunks/pages/_app-19680c272848c87d.js',
          revision: '19680c272848c87d',
        },
        {
          url: '/_next/static/chunks/pages/_error-8353112a01355ec2.js',
          revision: '8353112a01355ec2',
        },
        {
          url: '/_next/static/chunks/pages/index-a1aafa52c8143aaf.js',
          revision: 'a1aafa52c8143aaf',
        },
        {
          url: '/_next/static/chunks/pages/outreach-b8878ab5c369ab4a.js',
          revision: 'b8878ab5c369ab4a',
        },
        {
          url: '/_next/static/chunks/pages/robots-889c8b58dd454d74.js',
          revision: '889c8b58dd454d74',
        },
        {
          url: '/_next/static/chunks/pages/socials-3fba22771299fd1d.js',
          revision: '3fba22771299fd1d',
        },
        {
          url: '/_next/static/chunks/pages/sponsors-407d88e6239e8ed6.js',
          revision: '407d88e6239e8ed6',
        },
        {
          url: '/_next/static/chunks/pages/warp-085bdf4cd1059085.js',
          revision: '085bdf4cd1059085',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-59c5c889f52620d6.js',
          revision: '59c5c889f52620d6',
        },
        {
          url: '/_next/static/css/0e2f984c0d304976.css',
          revision: '0e2f984c0d304976',
        },
        {
          url: '/_next/static/jT-6nMCVjXLk2tjbCREpa/_buildManifest.js',
          revision: '6781277e7758d5d4c2f6769d6217883e',
        },
        {
          url: '/_next/static/jT-6nMCVjXLk2tjbCREpa/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/browserconfig.xml',
          revision: 'f74b32b70089ac408323a12fb23cd4bf',
        },
        {
          url: '/favicon.ico',
          revision: '26929d53852e682d7ce549cb10635f82',
        },
        {
          url: '/favicon.svg',
          revision: '1f451706f523c02c853e39ef9a3aa08d',
        },
        {
          url: '/favicon/PWA-192x192.png',
          revision: '40aa1d5fa554e65c556f07d35ff7e453',
        },
        {
          url: '/favicon/PWA-192x192.psd',
          revision: '7285790a2dfb78b4aa4ce7a5c61157dd',
        },
        {
          url: '/favicon/PWA-512x512.png',
          revision: '5e5df1a459fc13e201eee95ff34f2306',
        },
        {
          url: '/favicon/PWA-512x512.psd',
          revision: '5481c036214b6fefca534e04619072ca',
        },
        {
          url: '/favicon/apple-touch-icon.png',
          revision: '74f30f886ecc86069097529c8c208fb5',
        },
        {
          url: '/favicon/apple-touch-icon.psd',
          revision: 'a76d636a657049f7c2c438c4d492bb61',
        },
        {
          url: '/favicon/favicon-16x16.png',
          revision: 'e73aec3df0ae1cda156e4adbc3c00805',
        },
        {
          url: '/favicon/favicon-16x16.psd',
          revision: 'fd5357f87f9b1bf67fe9a1836917f408',
        },
        {
          url: '/favicon/favicon-32x32.png',
          revision: 'e82e52d4bd4f3bb2c97aa02731b8ca72',
        },
        {
          url: '/favicon/favicon-32x32.psd',
          revision: '3b9a98a024b986906147450bc681b726',
        },
        {
          url: '/favicon/favicon.png',
          revision: 'e82e52d4bd4f3bb2c97aa02731b8ca72',
        },
        {
          url: '/favicon/favicon.psd',
          revision: 'f96430b7098c7ca13170ede3f599ec43',
        },
        {
          url: '/favicon/maskable-PWA-192x192.png',
          revision: 'eea77c64b14a2b9d0e7e21617b693545',
        },
        {
          url: '/favicon/maskable-PWA-192x192.psd',
          revision: '68fba549c941c5e65a4785f80fe8742e',
        },
        {
          url: '/favicon/maskable-PWA-512x512.png',
          revision: '97152c554b9b8b593a0be13ce206dd70',
        },
        {
          url: '/favicon/maskable-PWA-512x512.psd',
          revision: 'd7080212badfde05e35bda24e9f0b702',
        },
        {
          url: '/favicon/mstile-150x150.png',
          revision: '87ae6f8b51726528c04eb2d9aac2ce80',
        },
        {
          url: '/favicon/mstile-150x150.psd',
          revision: 'fb1b79219b9fe44d10405ced49f05a64',
        },
        {
          url: '/favicon/safari-pinned-tab.svg',
          revision: '3bae84d71d05696aa112c2485b81312a',
        },
        {
          url: '/fonts/23XX.woff2',
          revision: '5c7227b2bde1aba7b29d6f7b38e650ca',
        },
        {
          url: '/fonts/SansaSoftPro.woff2',
          revision: 'a4d4372cc69e2b4de447d8fb7a36ef2d',
        },
        {
          url: '/fonts/kollektif.woff2',
          revision: '5ed1578b3be5186c8041807b1d78df8b',
        },
        {
          url: '/robot2023.jpg',
          revision: '4021bf5a00e615acc21f6a2e09d51cdb',
        },
        {
          url: '/site.webmanifest',
          revision: '2e85a0e2fc61e92d5855b700e7acf3df',
        },
        {
          url: '/tmp/Altronics.png',
          revision: 'eb621dc7df1a8400b7429730ebf4eede',
        },
        {
          url: '/tmp/Curtin.png',
          revision: '6b4ec673ae71200b5b57c044da944a27',
        },
        {
          url: '/warp-logo.png',
          revision: '1af8bf33785632e9682de2950ba3e2bf',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 3600,
          }),
        ],
      }),
      'GET'
    );
});
