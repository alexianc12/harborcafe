/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'cafenea-harbor.vercel.app',
          },
        ],
        destination: 'https://harborcafe.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;