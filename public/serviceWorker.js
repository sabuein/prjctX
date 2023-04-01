const regex = new RegExp("/..$");

const addResourcesToCache = async (cacheName) => {
  try {
    let appShellFiles = [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css",
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
      "/members.html",
      "/offline.html",
      "/signup.html",
      "/subscribe.html",
      "/upload.html",
    ];
    const cache = await caches.open(cacheName);
    await cache.addAll(appShellFiles);
  } catch (error) {
    console.log("Error occured while caching...");
    console.log(error);
  }
};

self.addEventListener("install", async function (event) {
  // Cache the core assets
  await event.waitUntil(addResourcesToCache("prjctx"));
  // Activate right away
  await self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.matchAll({ type: "window" }).then(windowClients => {
    windowClients.forEach(windowClient => {
      windowClient.navigate(windowClient.url);
    });
  });
});

self.addEventListener("fetch", (event) => {
  // Bug fix https://stackoverflow.com/a/49719964
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  ) {
    return;
  }
  // Getting the request object itself
  let request = event.request;
  // console.log(`[Service Worker] Fetched resource ${event.request.url}`);
  // HTML files
  // Network-first
  if (request.headers.get("accept").includes("text/html")) {
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
          return caches.match(request, { ignoreSearch: true }).then(function (response) {
            console.log(error);
            return response || caches.match("/offline.html", { ignoreSearch: true });
          });
        })
    );
  }

  // CSS & JavaScript
  // Offline-first
  if (
    request.headers.get("accept").includes("") ||
    request.headers.get("accept").includes("") ||
    request.headers.get("accept").includes("") ||
    request.headers.get("accept").includes("") ||
    request.headers.get("accept").includes("")
  ) {
    // Check the cache first
    // If it's not found, send the request to the network
    event.respondWith(
      caches.match(request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(request).then(function (response) {
            return response;
          })
        }).catch((error) => console.log(error)));
    return;
  }

  let cacheName = "prjctx",
    mimes = [
      "text/css",
      "text/javascript",
      "module",
      "manifest+json",
      "application/json",
      "manifest",
      "image"
    ];
  mimes.forEach(mime => offlineFirst(event, request, mime, cacheName));
  // Or just everything!
  //offlineFirst(event, request, "*/*", cacheName);
  
  // General setupapplication/
  let responseContent = `
  <html>
  <head>
  <title>prjctX General Setup</title>
  </head>
  <body>
  <style>
  body {text-aligh: center; background-color: #333333; color: #eeeeee;}
  </style>
  <h1>prjctX General Setup</h1>
  <p>There seems to be a problem with your connection.</p>
  </body>
  </html>
  `;

  // event.respondWith(
  //   fetch(request).catch(function () {
  //     return new Response(
  //       responseContent,
  //       { headers: { "Content-Type": "text/html" } }
  //     );
  //   })
  // );
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

const offlineFirst = (event, request, mime, cacheName) => {
  if (request.headers.get("accept").includes(mime)) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(request).then(function (response) {
            let copy = response.clone();
            // Save a copy of it in cache
            event.waitUntil(caches.open(cacheName).then(function (cache) {
              return cache.put(request, copy);
            }).catch(error => console.log(error)));
          });
        }).catch((error) => console.log(error)));
    return console.log(`offline() didn't do anything.`);
  }
}