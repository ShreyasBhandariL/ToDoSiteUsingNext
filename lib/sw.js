import { defaultCache } from '@serwist/next/worker';
import { Serwist } from 'serwist';

// Set this to `true` to enable logging of cache actions.
// This is helpful for debugging.
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST || [],
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();