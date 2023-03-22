"use strict";

import {
  cl,
  ce,
  cw,
  id,
  setCustomComponent as component,
} from "./modules/helpers.mjs";

import {
  loadMembers,
  renderMembers,
  updateMember,
} from "./modules/members.mjs";

import { AppHeader, AppNav, AppFooter } from "./components/static.mjs";
import { checkDevices } from "./modules/bluetooth.mjs";
import {
  registerServiceWorker as startServiceWorker,
  startPWA,
  requestNotificationsPermission as notifyPWA,
} from "./modules/pwa.mjs";
import { giveMeCookies as startCookies } from "./modules/cookies.mjs";

// addBtn.style.display = "none";

component(AppHeader, "app-header");
component(AppNav, "app-nav");
component(AppFooter, "app-footer");

document.addEventListener("DOMContentLoaded", async () => {
  // checkDevices();
  if (meta.document.slug === "index") {
    try {
      let deferredPrompt;
      const addToHomeButton = id("appAdd");
      startPWA(deferredPrompt, addToHomeButton);
      const receiveNotificationsButton = id("appNotify");
      receiveNotificationsButton.addEventListener("click", notifyPWA);

      startCookies();
      startServiceWorker("/serviceWorker.js");
    } catch (error) {
      cl(error);
    }
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
      cl(error) || ce(error) || cw(error);
    }
  } else {
    cl("do something with XMLHttpRequest");
  }
});
