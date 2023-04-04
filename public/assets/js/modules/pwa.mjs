"use strict";

import { cl } from "./helpers.mjs";
import { activatePush } from "./push.mjs";

const registerServiceWorker = async (workerURL) => {
  try {
    const registration = await navigator.serviceWorker.register(workerURL, {
      scope: "/public/",
    });
    registration.addEventListener("updatefound", async () => {
      const installingWorker = registration.installing;
      cl(`------------------ Start ------------------`);
      switch (installingWorker.state) {
        case "installing": // We are here!
          cl(
            `The service worker in this state is considered an installing worker. During this state, ExtendableEvent.waitUntil() can be called inside the install event handler to extend the life of the installing worker until the passed promise resolves successfully. This is primarily used to ensure that the service worker is not active until all of the core caches are populated.`
          );
          break;
        case "installed":
          cl(
            `The service worker in "installed" state is considered a waiting worker.`
          );
          if (navigator.serviceWorker.controller) {
            cl(`TODO: notify user: "New or updated content is available."`);
          } else {
            cl(`TODO: notify user: "Content is now available offline."`);
          }
          break;
        case "activating":
          cl(
            `The service worker in this state is considered an active worker. During this state, ExtendableEvent.waitUntil() can be called inside the onactivate event handler to extend the life of the active worker until the passed promise resolves successfully. No functional events are dispatched until the state becomes activated.`
          );
          break;
        case "activated":
          cl(
            `The service worker in this state is considered an active worker ready to handle functional events.`
          );
          break;
        case "redundant":
          cl(
            `A new service worker is replacing the current service worker, or the current service worker is being discarded due to an install failure.`
          );
          break;
        default:
          cl(`Service worker state reporting ended.`);
      }
      cl(`------------------ End ------------------`);
    });
  } catch (error) {
    cl(`Service worker registration failed: ${error}`);
  }
};

const pwaAddToHome = (homeButton) => {
  homeButton.style.display = "none";
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    let deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    homeButton.style.display = "block";

    homeButton.addEventListener("click", async (e) => {
      // hide our user interface that shows our A2HS button
      homeButton.style.display = "none";
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        cl(`---| PWA: User accepted the A2HS prompt`);
      } else {
        cl(`---| PWA: User dismissed the A2HS prompt`);
      }
      deferredPrompt = null;
    });
  });
};

const startPWA = (serviceWorkerURL) => {
  try {
    registerServiceWorker(serviceWorkerURL);
    // https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=sabuein@gmail.com
    // registerProtocolHandler("mailto", "https://mail.google.com/mail/?extsrc=mailto&url=%s", "Gmail");

    // unescape("http://127.0.0.1:5500/members.html?name=web%2Bname%3A%2F%2FSalaheddin");
    // 'http://127.0.0.1:5500/members.html?name=web+name://Salaheddin'
    registerProtocolHandler("web+name", "/members.html?name=%s", "PrjctX");

    // unescape("http://127.0.0.1:5500/members.html?country=web%2Bcountry%3A%2F%2Fpalestine");
    // 'http://127.0.0.1:5500/members.html?country=web+country://palestine'
    registerProtocolHandler(
      "web+country",
      "/members.html?country=%s",
      "PrjctX"
    );

    
    cl(`---| PWA: App started successfully.`);
    activatePush(30000);
  } catch (error) {
    cl(`---| PWA: App failed to start: ${error}`);
  }
};

const registerProtocolHandler = (
  scheme = `web+art`,
  url = `art?type=%s`,
  appName = "PrjctX"
) => {
  /**
    Let installed PWAs handle links that use a specific protocol for a more integrated experience.
    
    URL protocol handler registration for PWAs is part of the capabilities project and is available from Chrome 96.

    @scheme: A string containing the protocol the site wishes to handle.
    The scheme must either be one of the safelisted schemes (for example, mailto, bitcoin, or magnet) or begin with web+, followed by at least one or more lowercase ASCII letters after the web+ prefix, for instance, web+art.
    
    @url: A string containing the URL of the handler. This URL must include %s, as a placeholder that will be replaced with the escaped URL to be handled.
    **/
  try {
    navigator.registerProtocolHandler(scheme, url, appName);
  } catch (error) {
    cl(`Protocol handler registeration failed: ${error}`);
  }
};

export { startPWA, pwaAddToHome };
