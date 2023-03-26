"use strict";

import { AppHeader, AppNav, AppFooter } from "./components/static.mjs";
import { cl, id } from "./modules/helpers.mjs";
import { startPWA, notifyMe } from "./modules/pwa.mjs";
import { loadMembers, addMember, updateMember, fakeCollector } from "./modules/members.mjs";
import { renderMembers, setCustomComponent as component, handlebars } from "./modules/view.mjs";
import { checkBluetoothDevices } from "./modules/bluetooth.mjs";
import { startCookies } from "./modules/storage.mjs";
import { userAgentData } from "./modules/hints.mjs";
import { MailToForm } from "./components/communication.mjs";

window.addEventListener("load", () => {
  component(AppHeader, "app-header");
  component(AppNav, "app-nav");
  component(AppFooter, "app-footer");
  component(MailToForm, "app-communication");

  // Delay registration until after the page has loaded.
  switch (window.isSecureContext &&
  (typeof (navigator) === "object") &&
  ("serviceWorker" in navigator)) {
    case true:
      const addToHomeButton = id("appAdd"); // Home button
      const receiveNotificationsButton = id("appNotify"); // Notification button
      startPWA("/serviceWorker.js", addToHomeButton, receiveNotificationsButton);
      break;
    case false:
      cl("Service workers are not supported.");
      break;
    default:
      cl(`Thank you for visitng the prjctX code!`);
  }
});

// startCookies();
document.addEventListener("DOMContentLoaded", async () => {

  fakeCollector();

  if (typeof (meta) !== "undefined" &&
    meta.document.slug === "index") {
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

  if (window.fetch) {
    if (typeof (meta) !== "undefined") {
      let slug = meta.document.slug;
      switch (slug) {
        case "members":
          // const table = id("membersBody"), getAll = new Request("http://localhost:8888/collectors/all");
          const table = id("membersBody"), getAll = new Request("/assets/data/100.json");
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
          break;
        default:
          cl(`Document slug: ${slug}`);
      }

    } else {
      cl(`The meta object is not available`);
    }
  } else {
    cl(`We need to do something with XMLHttpRequest`);
  }
});