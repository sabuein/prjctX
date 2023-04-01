"use strict";

import { AppHeader, AppNav, AppFooter } from "./components/static.mjs";
import { cl, id, responseError } from "./modules/helpers.mjs";
import { startPWA, notifyMe } from "./modules/pwa.mjs";
import {
  loadMembers,
  addMember,
  updateMember,
  fakeCollector,
} from "./modules/members.mjs";
import {
  renderMembers,
  setCustomComponent as component,
  handlebars,
} from "./modules/view.mjs";
import { checkBluetoothDevices } from "./modules/bluetooth.mjs";
import { startCookies } from "./modules/storage.mjs";
import { MailToForm } from "./components/communication.mjs";

window.addEventListener("load", () => {
  component(AppHeader, "app-header");
  component(AppNav, "app-nav");
  component(AppFooter, "app-footer");
  component(MailToForm, "app-communication");

  // Delay registration until after the page has loaded.
  switch (
  window.isSecureContext &&
  typeof navigator === "object" &&
  "serviceWorker" in navigator
  ) {
    case true:
      const addToHomeButton = id("appAdd"); // Home button
      const receiveNotificationsButton = id("appNotify"); // Notification button
      startPWA(
        "/serviceWorker.js",
        addToHomeButton,
        receiveNotificationsButton
      );
      break;
    case false:
      cl("Service workers are not supported.");
      break;
    default:
      cl(`Thank you for visitng the prjctX code!`);
  }

  if ("credentials" in navigator) {

    const cred = new PasswordCredential({
      id: 54321,
      password: "123sA#1587S$",
      name: "Salaheddin AbuEin",
      iconURL: "",
    });

    navigator.credentials.create({
      password: cred
    }).then((creds) => {
      cl(`#TODO: Apply create credentials: ${creds}`);
      // return creds;
    });

    const credX = new PasswordCredential({
      id: 9876,
      password: "123sA#1587S$",
      name: "Another Guy",
      iconURL: "",
    });

    navigator.credentials.store(credX).then((creds) => {
      cl(`#TODO: Apply store credentials: ${creds}`);
    });

    navigator.credentials.get(cred).then((creds) => {
      cl(`#TODO: Apply get credentials: ${creds}`);
    });

    navigator.credentials.preventSilentAccess(cred).then((creds) => {
      cl(`#TODO: Apply preventSilentAccess credentials: ${creds}`);
    });
    
  } else {
    cl(`Handle sign-in the other way.`);
  }

});

// startCookies();
document.addEventListener("DOMContentLoaded", async () => {

  if (window.fetch) {
    if (typeof meta !== "undefined") {
      let slug = meta.document.slug;
      switch (slug) {
        case "index":
          const source = id("handle"), data = {
            name: "Salaheddin AbuEin",
            hometown: "Ramallah, occupied Palestine",
            live: "London, United Kingdom",
            age: 36,
            siblings: [
              { name: "AlMutasembellah", age: 35 },
              { name: "Hanan", age: 34 },
            ]
          };
          handlebars(source, data);
          fakeCollector();
          break;
        case "members":
          // const table = id("membersBody"), getAll = new Request("http://localhost:8888/collectors/all");
          const table = id("membersBody"),
            getAll = new Request("/assets/collectors.json");
          renderMembers(await loadMembers(getAll), table);
          // const currentLocation = "x", update = new Request("http://localhost:8888/collectors/update/:id");
          // cl(await updateMember(update), currentLocation);
          // checkBluetoothDevices();
          const newMember = {
            name: "Salaheddin AbuEin",
            email: "sabuein@gmail.com",
            phone: "+447930120661",
          };
          // const back = await addMember(newMember);
          // cl(back);
          break;
        case "login":
          //let x = navigator.credentials.store(new PasswordCredential({id: 444, type: "password", password: "332211"}));
          const form = document.querySelector("#login");
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            const login = new PasswordCredential(e.target);
            navigator.credentials.store(login).then((status) => {
              cl(`---| PWA: Save Password?`);
              cl(login);
              return status;
            }).catch(error => responseError(error));
          });
          break;
        default:
          cl(`Document slug: ${slug}`);
      }
    } else {
      cl(`The meta object is not available`);
    }
  } else {
    if (typeof meta !== "undefined") {
      let slug = meta.document.slug;
      switch (slug) {
        case "index":
          cl(`You are on ${slug}. We need to do something with XMLHttpRequest`);
          break;
        default:
          cl(`Thank you.`);
      }
    }
  }
});