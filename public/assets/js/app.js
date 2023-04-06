"use strict";

import { AppHeader, AppNav, AppFooter } from "./components/static.mjs";
import { cl, id, responseError } from "./modules/helpers.mjs";
import { startPWA, pwaAddToHome } from "./modules/pwa.mjs";
import { pwaNotifyMe } from "./modules/push.mjs";
import {
  loadMembers,
  addMember,
  updateMember,
  fakeCollector,
  userLogin
} from "./modules/members.mjs";
import {
  renderMembers,
  setCustomComponent as component,
  handlebars,
} from "./modules/view.mjs";
import { checkBluetoothDevices } from "./modules/bluetooth.mjs";
import { startCookies, printLocalStorage, printSessionStorage } from "./modules/storage.mjs";
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
     startPWA("/serviceWorker.js");
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
      cl(`#TODO: Apply create credentials: ${creds.id}`);
      // return creds;
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
          userLogin();
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
            }).then(profile => cl(`Check the profile: ${profile}`))
            .catch(error => responseError(error));
          });
          break;
        case "dashboard":
          const appAdd = id("appAdd"),
            appNotify = id("appNotify"),
            printSession = id("printSession"),
            printLocal = id("printLocal"),
            outputArea = id("outputArea"),
            clearArea = id("clearOutput");
          pwaAddToHome(appAdd);
          pwaNotifyMe(appNotify);
          printSessionStorage(printSession, outputArea);
          printLocalStorage(printLocal, outputArea);
          clearArea.addEventListener("click", () => outputArea.innerHTML = "Output goes here&hellip;");
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