const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true,
});

module.exports = withPWA({
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3333/admin/:path*'
            : '/admin/index.html',
      },
    ];
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's30991.pcdn.co',
      },
    ],
  },
});
