"use strict";

import { AppHeader, AppNav, AppFooter } from "./components/static.mjs";
import { cl, id, setCustomComponent as component, handlebars } from "./modules/helpers.mjs";
import { registerServiceWorker as startServiceWorker, startPWA, requestNotificationsPermission as notifyPWA } from "./modules/pwa.mjs";
import { loadMembers, renderMembers, addMember, updateMember } from "./modules/members.mjs";
import { checkBluetoothDevices } from "./modules/bluetooth.mjs";
import { startCookies } from "./modules/storage.mjs";
import { userAgentData } from "./modules/hints.mjs";

(() => {
  component(AppHeader, "app-header");
  component(AppNav, "app-nav");
  component(AppFooter, "app-footer");
})();



// startCookies();
document.addEventListener("DOMContentLoaded", async () => {
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

  if (window.isSecureContext && navigator && navigator.serviceWorker) {
    let deferredPrompt;
    const addToHomeButton = id("appAdd");
    addToHomeButton.style.display = "none";
    startPWA(deferredPrompt, addToHomeButton);
    const receiveNotificationsButton = id("appNotify");
    receiveNotificationsButton.addEventListener("click", notifyPWA);
    startServiceWorker("/serviceWorker.js");
  } else {
    cl("The browser does not offer service worker registration.");
  }

  if (window.fetch && (meta.document.slug === "index")) {
    const source = id("handle");
    const data = {
      "name": "Salaheddin AbuEin", "hometown": "Ramallah, occupied Palestine",
      "kids": [{ "name": "Rowan", "age": "2" }]
    };
    handlebars(source, data);
  }

  if (window.fetch && meta.document.slug === "members") {
    try {
      const table = id("membersBody");
      const all = new Request("http://localhost:8888/collectors/all");
      const update = new Request("http://localhost:8888/collectors/update/");
      const raw = await loadMembers(all);
      renderMembers(raw, table);
      // const updated = await updateMember(update);
      // cl(updated);
    } catch (error) {
      cl(error);
    }
  } else {
    cl("do something with XMLHttpRequest");
  }
});
