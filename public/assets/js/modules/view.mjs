"use strict";

import { cl, id, responseError } from "./helpers.mjs";
import {
  startCookies,
  printLocalStorage,
  printSessionStorage,
  clearLocalStorage,
  getStatus,
  setStatus,
} from "./storage.mjs";
import { startPWA, pwaAddToHome } from "./pwa.mjs";
import { pwaNotifyMe } from "./push.mjs";
import { AppHeader, AppNav, AppFooter } from "../components/static.mjs";
import { checkBluetoothDevices } from "./bluetooth.mjs";
import { MailToForm } from "../components/communication.mjs";

const renderMembers = (json, table) => {
  try {
    let index = 0;
    const members = JSON.parse(json);
    for (const member of members) {
      const row = document.createElement("tr");
      row.appendChild(document.createElement("th")).textContent = ++index;
      row.appendChild(document.createElement("td")).textContent = member.name;
      row.appendChild(
        document.createElement("td")
      ).innerHTML = `<a href="mailto:${member.email}">${member.email}</a>`;
      row.appendChild(
        document.createElement("td")
      ).innerHTML = `<a href="tel:${member.phone}">${member.phone}</a>`;
      row.firstElementChild.setAttribute("scope", "row");
      table.appendChild(row);
    }
    const row = document.createElement("tr");
    const final = document.createElement("td");
    final.setAttribute("colspan", 4);
    final.setAttribute("scope", "row");
    final.textContent = `Our community is made up of ${table.childElementCount} members — and counting...`;
    row.appendChild(final);
    table.appendChild(row);
  } catch (error) {
    responseError(error);
  }
};

const setCustomComponent = (className, elementName) => {
  try {
    if (!window.customElements.get(elementName)) {
      window.customElements.define(elementName, className);
    }
  } catch (error) {
    responseError(error);
  }
};

const prettyJson = (object) => JSON.stringify(object, null, "\t");

const handlebars = (source, data) => {
  try {
    const template = Handlebars.compile(source.innerHTML);
    source.innerHTML = template(data);
  } catch (reason) {
    responseError(error);
  }
};

const startApp = () => {
  try {
    // checkBluetoothDevices();
    setCustomComponent(AppHeader, "app-header");
    setCustomComponent(AppNav, "app-nav");
    setCustomComponent(AppFooter, "app-footer");
    setCustomComponent(MailToForm, "app-communication");
    const pwaSupported =
      window.isSecureContext &&
      typeof navigator === "object" &&
      "serviceWorker" in navigator;
    pwaSupported
      ? startPWA("/serviceWorker.js")
      : cl("Service workers are not supported.");
  } catch (error) {
    responseError(error);
  }
};

const startAdmin = () => {
  try {
    const appAdd = id("appAdd"),
      appNotify = id("appNotify"),
      printSession = id("printSession"),
      printLocal = id("printLocal"),
      outputArea = id("outputArea"),
      clearArea = id("clearOutput"),
      clearLocal = id("clearLocal");
    pwaAddToHome(appAdd);
    pwaNotifyMe(appNotify);
    printSessionStorage(printSession, outputArea);
    printLocalStorage(printLocal, outputArea);
    clearArea.addEventListener("click", () => {
      outputArea.innerHTML = "Output goes here&hellip;";
    });
    clearLocal.addEventListener("click", () => {
      clearLocalStorage();
    });
  } catch (error) {
    responseError(error);
  }
};

const startCMS = () => {
  try {
    if (typeof Storage !== "undefined") {
      let showmenu = document.getElementById("show-cms-menu"),
        hidemenu = document.getElementById("hide-cms-menu"),
        root = document.querySelector(":root"),
        app = JSON.parse(getStatus("app")),
        details = document.querySelectorAll("details");
      if (app && app.style.showMenu) {
        root.style.setProperty("--app-toggle-cms-menu", "initial");
        showmenu.style.display = "none";
      } else {
        root.style.setProperty("--app-toggle-cms-menu", "none");
        showmenu.style.display = "initial";
        const value = { style: { showMenu: false } };
        setStatus("app", JSON.stringify(value));
      }
      const status = JSON.parse(getStatus("app"));
      cl(`appMenu: ${status.style.showMenu}`);
      hidemenu.addEventListener("click", (e) => {
        e.preventDefault();
        showmenu.style.display = "initial";
        root.style.setProperty("--app-toggle-cms-menu", "none");
        const status = { style: { showMenu: false } };
        setStatus("app", JSON.stringify(status));
      });
      showmenu.addEventListener("click", (e) => {
        e.preventDefault();
        showmenu.style.display = "none";
        root.style.setProperty("--app-toggle-cms-menu", "initial");
        const status = { style: { showMenu: true } };
        setStatus("app", JSON.stringify(status));
      });
      for (let i = 0; i < details.length; i++) {
        details[i].addEventListener("click", (e) => {
          if (e.currentTarget.open) {
            setStatus(`detailNo${i}`, "false");
          } else {
            setStatus(`detailNo${i}`, "true");
          }
        });
        let x = getStatus(`detailNo${i}`);
        if (x === "false") {
          details[i].toggleAttribute("open");
        }
      }
    } else {
      cl(`There is no web storage support`);
    }
  } catch (error) {
    responseError(error);
  }
};

export {
  renderMembers,
  setCustomComponent,
  prettyJson as pJson,
  handlebars,
  startApp,
  startAdmin,
  startCMS,
};
