self.addEventListener("install", (event) => {
  let cacheName = "prjctx",
    appShell = [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css",
      "/app.webmanifest",
      "/assets/collectors.json",
      "/assets/js/app.js",
      "/assets/js/lib/handlebars-v4.7.7.js",
      "/assets/js/classes/User.mjs",
      "/assets/js/classes/Collector.mjs",
      "/assets/js/components/communication.mjs",
      "/assets/js/modules/pwa.mjs",
      "/assets/js/modules/storage.mjs",
      "/assets/js/modules/bluetooth.mjs",
      "/assets/js/modules/members.mjs",
      "/assets/js/modules/helpers.mjs",
      "/assets/js/modules/hints.mjs",
      "/assets/js/modules/push.mjs",
      "/assets/js/modules/view.mjs",
      "/assets/js/components/static.mjs",
      "/assets/css/main.css",
      "/assets/images/notifications/tetris.jpg",
      "/assets/images/notifications/minecraft.jpg",
      "/assets/images/notifications/super-mario-bros.jpg",
      "/assets/images/notifications/the-legend-of-zelda.jpg",
      "/404.html",
      "/collector.html",
      "/communication.html",
      "/dashboard.html",
      "/forums.html",
      "/login.html",
      "/members.html",
      "/offline.html",
      "/signup.html",
      "/subscribe.html",
      "/upload.html",
      "/index.html"
    ];
  // Cache the core assets
  event.waitUntil(addManyToCache(cacheName, appShell));
  // Activate right away
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Clear the old cache
  let cacheName = "prjctx";
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.matchAll({ type: "window" }).then((windowClients) => {
    windowClients.forEach((windowClient) => {
      windowClient.navigate(windowClient.url);
    });
  });
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  ) {
    console.log(`Bug fix https://stackoverflow.com/a/49719964`);
    return;
  }

  let request = event.request,
    cacheName = "prjctx";

  /*
  // Log request URL
  console.log(`[Service Worker] Fetched resource ${request.url}`);

  // Log headers
  request.headers.forEach((value, key) => {
    console.log(`${key} ==> ${value}`);
  });
  */
  if (
    request.headers.get("accept").includes("image") ||
    request.headers.get("accept").includes("text/plain") ||
    request.headers.get("accept").includes("text/html") ||
    request.headers.get("accept").includes("application/xml") ||
    request.headers.get("accept").includes("application/xhtml+xml") ||
    request.headers.get("accept").includes("text/css") ||
    request.headers.get("accept").includes("text/javascript") ||
    request.headers.get("accept").includes("application/javascript") ||
    request.headers.get("accept").includes("module") ||
    request.headers.get("accept").includes("application/json") ||
    request.headers.get("accept").includes("manifest+json") ||
    request.headers.get("accept").includes("application/manifest+json") ||
    request.headers.get("accept").includes("json") ||
    request.headers.get("accept").includes("manifest")
  ) {
    /*
    try {
      event.respondWith(async () => {
        const cached = await getCachedResource(cacheName, request);
        const fetching = await fetchTheResource(cacheName, request);
        return cached || fetching;
      });
    } catch (error) {
      console.error(`The requested resource is not available...`);
      console.log(error);
    }
    */
   console.log("Hello there...")
  }

});

// Receive push messages
self.addEventListener("push", (event) => {
  const payload = event.data?.text() ?? "No payload";
  event.waitUntil(
    self.registration.showNotification("Push messages received...", {
      body: payload,
    })
  );
});

const addOneToCache = async (request, cacheName, response) => {
  try {
    const cache = await caches.open(cacheName);
    if (cache) cache.put(request, response);
  } catch (error) {
    console.error(`Error occured while caching...`);
    console.log(error);
  }
};

const addManyToCache = async (cacheName, appShellResources) => {
  try {
    const cache = await caches.open(cacheName);
    if (cache) return await cache.addAll(appShellResources);
  } catch (error) {
    console.error(`Error occured while caching...`);
    console.log(error);
  }
};

const getCachedResource = async (cacheName, request) => {
  try {
    const cache = await caches.open(cacheName);
    if (cache) return await cache.match(request, { ignoreSearch: true });
  } catch (error) {
    console.error(`Error occured returning cached resource...`);
    console.log(error);
  }
};

const fetchTheResource = async (cacheName, request) => {
  try {
    const response = await fetch(request, { mode: "cors" });
    if (!response || response.status !== 200 || response.type !== "basic") {
      await addOneToCache(request, cacheName, response.clone());
      return response;
    }
  } catch (error) {
    console.error(`Error occured while fetching...`);
    console.log(error);
  }
};