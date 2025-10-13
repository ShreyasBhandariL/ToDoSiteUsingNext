import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: 'lib/sw.js',  
  swDest: 'public/sw.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
};

export default withSerwist(nextConfig);
