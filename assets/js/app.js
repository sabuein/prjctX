"use strict";

import { AppHeader, AppNav, AppFooter } from "./components/static.mjs";
import { cl, id } from "./modules/helpers.mjs";
import { startPWA, notifyPWA } from "./modules/pwa.mjs";
import { loadMembers, addMember, updateMember } from "./modules/members.mjs";
import { renderMembers, setCustomComponent as component, handlebars } from "./modules/view.mjs";
import { checkBluetoothDevices } from "./modules/bluetooth.mjs";
import { startCookies } from "./modules/storage.mjs";
import { userAgentData } from "./modules/hints.mjs";

(() => { // Just do this
  component(AppHeader, "app-header");
  component(AppNav, "app-nav");
  component(AppFooter, "app-footer");
})();

// startCookies();
document.addEventListener("DOMContentLoaded", async () => {
  switch (window.isSecureContext && (typeof (navigator) === "object") && (typeof (navigator.serviceWorker) === "object")) {
    case true:
      let deferredPrompt;
      const addToHomeButton = id("appAdd"); // Home button
      addToHomeButton.style.display = "none";
      startPWA(deferredPrompt, addToHomeButton, "/serviceWorker.js");
      const receiveNotificationsButton = id("appNotify"); // Notification button
      receiveNotificationsButton.addEventListener("click", notifyPWA);
      break;
    case false:
      cl("The browser does not offer service worker registration.");
      break;
    default:
      cl(`Thank you for visitng the prjctX code!`);
      break;
  }

  if (typeof (meta) !== "undefined" && meta.document.slug === "index") {
    const source = id("handle"), data = {
      "name": "Salaheddin AbuEin",
      "hometown": "Ramallah, occupied Palestine",
      "live": "London, United Kingdom",
      "age": 36,
      "siblings": [
        { "name": "AlMutasembellah", "age": 35 },
        { "name": "Hanan", "age": 34 }
      ]
    }; handlebars(source, data);
  }

  if (window.fetch && (typeof (meta) !== "undefined" && meta.document.slug === "members")) {
    const table = id("membersBody"), getAll = new Request("http://localhost:8888/collectors/all");
    renderMembers(await loadMembers(getAll), table);

    // const currentLocation = "x", update = new Request("http://localhost:8888/collectors/update/:id");
    // cl(await updateMember(update), currentLocation);

    // Some info
    await userAgentData();
    // checkBluetoothDevices();

    const newMember = {
      name: "Salaheddin AbuEin",
      email: "sabuein@gmail.com",
      phone: "+447930120661"
    };
    // const back = await addMember(newMember);
    // cl(back);
  } else {
    cl("do something with XMLHttpRequest");
  }
});
