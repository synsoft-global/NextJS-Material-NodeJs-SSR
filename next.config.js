/** @type {import('next').NextConfig} */
const config = require('./config/config.json')


const nextConfig = {
  reactStrictMode: false,
  basePath: config.basePath,
  trailingSlash: true,
  images: {
    domains: ['www.synsoftglobal.net', 'synsoft-website.s3.amazonaws.com', 'www.synsoftglobal.com', 'api.synsoftglobal.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: 'https://portfolio.synsoftglobal.com/',
        permanent: true,
      },
      {
        source: "/web-application-development/fullstack-development-company",
        destination: "/web-application-development/fullstack-services",
        permanent: false,
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: "/landing/hire-react-developers",
        destination: "/landing/hire-react-developers/index.html",
      },
      {
        source: "/landing/hire-react-developers/thankyou",
        destination: "/landing/hire-react-developers/thankyou/index.html",
      },
      {
        source: "/landing/hire-fullstack-developers",
        destination: "/landing/hire-fullstack-developers/index.html",
      },
      {
        source: "/landing/hire-fullstack-developers/thankyou",
        destination: "/landing/hire-fullstack-developers/thankyou/index.html",
      },
      {
        source: "/voip-testing",
        destination: "/voip-testing/index.html",
      },
      {
        source: "/voip-testing/thankyou",
        destination: "/voip-testing/thankyou/index.html",
      }
    ]
  }
}

module.exports = nextConfig
