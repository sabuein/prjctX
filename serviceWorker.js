const regex = new RegExp("\/\..$");

const addResourcesToCache = async (appShellFiles, cacheName) => {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(appShellFiles);
  } catch (error) {
    console.log("Error occured while caching...");
    console.log(error);
  }
};

self.addEventListener("install", function (event) {
  // Activate right away
  self.skipWaiting();
  // Cache the core assets
  event.waitUntil(
    addResourcesToCache(
      [
        "/serviceWorker.js",
        "/prjctx.webmanifest",
        "/assets/js/app.js",
        "/assets/js/lib/handlebars-v4.7.7.js",
        "/assets/js/classes/Member.mjs",
        "/assets/js/classes/Collector.mjs",
        "/assets/js/components/communication.mjs",
        "/assets/js/modules/pwa.mjs",
        "/assets/js/modules/storage.mjs",
        "/assets/js/modules/bluetooth.mjs",
        "/assets/js/modules/members.mjs",
        "/assets/js/modules/helpers.mjs",
        "/assets/js/modules/hints.mjs",
        "/assets/js/components/static.mjs",
        "/assets/js/modules/view.mjs",
        "/assets/css/main.css",
        "/404.html",
        "/collector.html",
        "/communication.html",
        "/forums.html",
        "/login.html",
        "/index.html",
        "/members.html",
        "/offline.html",
        "/signup.html",
        "/subscribe.html",
        "/upload.html"
      ],
      "prjctx"
    )
  );
});

self.addEventListener("fetch", event => {
  // Bug fix https://stackoverflow.com/a/49719964
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  ) {
    return;
  }
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
              return cache.put(request.url, copy);
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
    request.headers.get("Accept").includes("text/javascript") ||
    request.headers.get("Accept").includes("module")
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
