self.addEventListener("install", (event) => {
  let cacheName = "prjctx",
    appShell = [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css",
      "/serviceWorker.js",
      "/prjctx.json",
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
      "/assets/js/modules/view.mjs",
      "/assets/js/components/static.mjs",
      "/assets/css/main.css",
      "/assets/images/notifications/tetris.jpg",
      "/assets/images/144x144.webp",
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
      "/index.html",
    ];
  // Cache the core assets
  event.waitUntil(addResourcesToCache(cacheName, appShell));
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

  // Log request URL
  console.log(`[Service Worker] Fetched resource ${request.url}`);
/*
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
    request.headers.get("accept").includes("manifest")
  ) {
    try {
      const cached = getCachedResource(cacheName, request);
      const fetching = fetchTheResource(cacheName, request);
      event.respondWith(cached || fetching);
    } catch (error) {
      console.error(`The requested resource is not available...`);
      console.log(error);
    }
  }

  // if (request.headers.get("accept").includes("*/*")) {
  //   try {
  //     const myHeaders = new Headers();
  //     myHeaders.append("content-type", "application/javascript");
  //     const responseInIt = {
  //       headers: myHeaders,
  //       status: 200,
  //       statusText: "SuperSmashingGreat!",
  //     }, cached = getCachedResource(cacheName, request);
  //     event.respondWith(new Response(cached, responseInIt));
  //   } catch (error) {
  //     console.error(`The response resource has a problem */*...`);
  //     console.log(error);
  //   }
  // }
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

const addResourceToCache = async (request, cacheName, response) => {
  try {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  } catch (error) {
    console.error(`Error occured while caching...`);
    console.log(error);
  }
};

const addResourcesToCache = async (cacheName, appShellResources) => {
  try {
    const cache = await caches.open(cacheName);
    cache.addAll(appShellResources);
  } catch (error) {
    console.error(`Error occured while caching...`);
    console.log(error);
  }
};

const getCachedResource = async (cacheName, request) => {
  try {
    const cache = await caches.open(cacheName);
    return cache.match(request, { ignoreSearch: true });
  } catch (error) {
    console.error(`Error occured returning cached resource...`);
    console.log(error);
  }
};

const fetchTheResource = async (cacheName, request) => {
  return await fetch(request, { mode: "cors" })
    .then((response) => {
      if (response.status === 200) {
        addResourceToCache(request, cacheName, response);
        return response;
      }
    })
    .catch((error) => {
      console.error(`Error occured while fetching...`);
      console.log(error);
    });
};
