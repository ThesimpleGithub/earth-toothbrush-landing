/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV == 'development';

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },

  basePath: isDev ? '' : '/earth-toothbrush-landing',

  assetPrefix: isDev
    ? ''
    : 'https://cdn.jsdelivr.net/gh/thesimplegithub/earth-toothbrush-landing@gh-pages',
  env: {
    PATH: isDev
      ? ''
      : 'https://cdn.jsdelivr.net/gh/thesimplegithub/earth-toothbrush-landing@gh-pages',
    // PATH: isDev ? "" : "/mycolor-nextJS",
    URL: isDev ? '' : 'https://mask.mycolor.kr',
    isDev: isDev ? true : false,
    REACT_APP_SC_DISABLE_SPEEDY: true,
  },
};

module.exports = nextConfig;
