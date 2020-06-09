/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-4f8dc7189ec1ef319f2e.js"
  },
  {
    "url": "framework-57c6ed5bd2ab5610b977.js"
  },
  {
    "url": "app-036dbf6e61c489a1c797.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "18f2f947d417f562c3116afb8df803de"
  },
  {
    "url": "google-fonts/s/hindsiliguri/v6/ijwOs5juQtsyLLR5jN4cxBEoRCf_0uYVKw.woff2",
    "revision": "997142b32846a3bcbb5c602080912338"
  },
  {
    "url": "google-fonts/s/hindsiliguri/v6/ijwOs5juQtsyLLR5jN4cxBEoRDf40uYVKw.woff2",
    "revision": "ddef2dfa226d7dd2205d347c980e1c46"
  },
  {
    "url": "google-fonts/s/hindsiliguri/v6/ijwOs5juQtsyLLR5jN4cxBEoREP-0uYVKw.woff2",
    "revision": "fca10615d42fdb306cd785e387ab521a"
  },
  {
    "url": "google-fonts/s/hindsiliguri/v6/ijwOs5juQtsyLLR5jN4cxBEoRG_50uYVKw.woff2",
    "revision": "bd43209916051fe4ed1f1ba8dc9287aa"
  },
  {
    "url": "google-fonts/s/hindsiliguri/v6/ijwTs5juQtsyLLR5jN4cxBEoTJzaxw.woff2",
    "revision": "0dc5c4e8db4a051e3e5816f7cfec46ac"
  },
  {
    "url": "google-fonts/s/ibmplexmono/v5/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2",
    "revision": "762415236b4a11831f9fc064ea48dbdb"
  },
  {
    "url": "google-fonts/s/ibmplexmono/v5/-F6qfjptAgt5VM-kVkqdyU8n3pQPwlBFgg.woff2",
    "revision": "7d3e2006c08ae4fc5f9fd4ec4b6687fa"
  },
  {
    "url": "google-fonts/s/ibmplexmono/v5/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgg.woff2",
    "revision": "129e3b37c9d80c7e421b432c887c6a7b"
  },
  {
    "url": "google-fonts/s/ibmplexmono/v5/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFgg.woff2",
    "revision": "0c4a54706495d75dc9e484eb51714f46"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-5224537b09cbd0556359.js"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "08b568d7504c4363894fb3e8a2f95dd4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */

importScripts(`idb-keyval-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-036dbf6e61c489a1c797.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
