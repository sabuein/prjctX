const addResourcesToCache = async (appShellFiles, cacheName) => {
  const cache = await caches.open(cacheName);
  for (let asset of appShellFiles) {
    await cache.add(new Request(asset));
  }
};

self.addEventListener("install", function (event) {
  // Activate right away
  self.skipWaiting();
  // Cache the core assets
  event.waitUntil(
    addResourcesToCache([
      "/prjctx.webmanifest",
      "/index.html",
      "/offline.html",
      "/404.html",
      "/assets/css/main.css",
      "/assets/js/app.js",
      "/assets/js/components/static.mjs",
      "/assets/js/modules/helpers.mjs",
      "/assets/images/logo.svg",
      "/assets/images/favicon.ico",
      "/assets/images/icons8-easel-100.png"
    ], "prjctx")
  );
});

self.addEventListener("fetch", (event) => {
  // Bug fix https://stackoverflow.com/a/49719964
  if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") { return; }
  // Getting the request object itself
  let request = event.request;
  console.log(`[Service Worker] Fetched resource ${event.request.url}`);
  // HTML files
  // Network-first
  if (request.headers.get("Accept").includes("text/html")) {
    // Handle HTML files...
    // Send the request to the network first
    // If it's not found, look in the cache
    event.respondWith(
      fetch(request)
        .then(function (response) {
          // Create a copy of the response and save it to the cache
          let copy = response.clone();
          event.waitUntil(
            caches.open("prjctx").then(function (cache) {
              return cache.put(request, copy);
            })
          );
          return response;
        })
        .catch(async function (error) {
          return caches.match(request).then(function (response) {
            return response || caches.match("/offline.html");
          });
        })
    );
    return;
  }

  // CSS & JavaScript
  // Offline-first
  if (
    request.headers.get("Accept").includes("text/css") ||
    request.headers.get("Accept").includes("text/javascript")
  ) {
    // Check the cache first
    // If it's not found, send the request to the network
    event.respondWith(
      caches.match(request).then(function (response) {
        return (
          response ||
          fetch(request).then(function (response) {
            return response;
          })
        );
      })
    );
    return;
  }

  // Images
  // Offline-first
  if (request.headers.get("Accept").includes("image")) {
    // Check the cache first
    // If it's not found, send the request to the network
    event.respondWith(
      caches.match(request).then(function (response) {
        return (
          response ||
          fetch(request).then(function (response) {
            // Save a copy of it in cache
            let copy = response.clone();
            event.waitUntil(
              caches.open("prjctx").then(function (cache) {
                return cache.put(request, copy);
              })
            );
            return response;
          })
        );
      })
    );
  }
});

// Receive push messages
self.addEventListener("push", (event) => {
  const payload = event.data?.text() ?? "No payload";
  event.waitUntil(
    self.registration.showNotification("Push messages received", {
      body: payload,
    })
  );
});