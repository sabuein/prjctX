"use strict";

import {
  cl,
  ce,
  cw,
  id,
  setCustomComponent as component
} from "./modules/helpers.mjs";

import {
  loadMembers,
  renderMembers,
  updateMember,
} from "./modules/members.mjs";

import { AppHeader, AppNav, AppFooter } from "./components/static.mjs";
import { checkDevices } from "./modules/bluetooth.mjs";
import { registerServiceWorker as startWorker, startPWA } from "./modules/pwa.mjs";

let deferredPrompt;
const addBtn = document.querySelector(".add-button");
addBtn.style.display = "none";
startPWA(deferredPrompt, addBtn);
startWorker("/service-worker.js");

component(AppHeader, "app-header");
component(AppNav, "app-nav");
component(AppFooter, "app-footer");

document.addEventListener("DOMContentLoaded", async () => {
  // checkDevices();

  const request = new Request("http://localhost:8888/collectors/all");
  const updateRequest = new Request("http://localhost:8888/collectors/update/");
  const output = id("membersBody");

  if (window.fetch) {
    try {
      // members = await loadMembers(url);
      const members = await loadMembers(request, output);
      renderMembers(members, output);

      const updated = await updateMember(updateRequest);
      cl(updateMember);
    } catch (error) {
      cl(error) || ce(error) || cw(error);
    }
  } else {
    cl("do something with XMLHttpRequest");
  }
  
});