import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swUrl: 'sw.js',
  swSrc: 'lib/sw.js', 
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
};

export default withSerwist(nextConfig);
