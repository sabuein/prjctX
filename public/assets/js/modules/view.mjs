"use strict";

import { pwaNotifyMe } from "push";
import { startPWA, pwaAddToHome } from "pwa";
import { cl, clOk, clAlert, id, responseError } from "helpers";
import { checkBluetoothDevices } from "bluetooth";
import { MailToForm } from "communication";
import { getLogin } from "members";
import { AppHeader, AppNav, AppFooter } from "static";
import {
  startCookies,
  printLocalStorage,
  printSessionStorage,
  clearLocalStorage,
  getStatus,
  setStatus,
  clearSiteData
} from "storage";

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
    if (HTMLScriptElement.supports("importmap")) {
      cl(`The importmap feature is supported.`);
    }
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
      ? startPWA()
      : clAlert("Service workers are not supported");
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
      clearLocal = id("clearLocal"),
      clearSite = id("clearSiteData");
    pwaAddToHome(appAdd);
    pwaNotifyMe(appNotify);
    printSessionStorage(printSession, outputArea);
    printLocalStorage(printLocal, outputArea);
    clearArea.addEventListener("click", () => {
      outputArea.innerHTML = "Output goes here&hellip;";
    });
    clearLocal.onclick = clearLocalStorage;
    clearSite.addEventListener("click", ()=> {
      if (confirm(`This will delete everything. Are you sure?`)) {
        clearSiteData();
        alert(`Site data has been cleared successfully.`);
      }
    });
  } catch (error) {
    responseError(error);
  }
};

const startCMS = async () => {
  try {
    const showmenu = document.getElementById("show-cms-menu"),
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
      //showmenu.style.rotate = "90deg";
      const value = { style: { showMenu: false } };
      setStatus("app", JSON.stringify(value));
    }

    hidemenu.addEventListener("click", (e) => {
      e.preventDefault();
      showmenu.style.display = "initial";
      //showmenu.style.rotate = "90deg";
      root.style.setProperty("--app-toggle-cms-menu", "none");
      const value = { style: { showMenu: false } };
      setStatus("app", JSON.stringify(value));
    });

    showmenu.addEventListener("click", (e) => {
      e.preventDefault();
      showmenu.style.display = "none";
      root.style.setProperty("--app-toggle-cms-menu", "initial");
      const value = { style: { showMenu: true } };
      setStatus("app", JSON.stringify(value));
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
  } catch (error) {
    responseError(error);
  }
};

const startRegister = async () => {
  try {
    const form = id("formSignup");

    form.addEventListener("submit", async (e) => {
      // Stop submitting form by itself
      e.preventDefault();
      clAlert(`You have started the sign-up process...`);

      let headersList = {
        accept: "*/*",
        "user-agent": "prjctX (https://github.com/sabuein/prjctX)",
        "accept-charset": "utf-8",
        connection: "keep-alive",
      };
      // Try sign-up with AJAX
      const response = await fetch("http://localhost:8888/collectors/login", {
        method: "post",
        mode: "cors",
        credentials: "include",
        body: new FormData(e.target),
        headersList,
      });

      if (!response.status == 200) {
        return Promise.reject("Sign-up failed");
      }

      // Instantiate PasswordCredential with the form
      if (window.PasswordCredential) {
        let pwd = id("pwd"),
          pwdAgain = id("pwdAgain");

        function validatePassword() {
          if (pwd.value != pwdAgain.value) {
            pwdAgain.setCustomValidity("Passwords do not match");
          } else {
            pwdAgain.setCustomValidity("");
          }
        }
        pwd.onchange = validatePassword;
        pwdAgain.onkeyup = validatePassword;

        const successfulSignup = await response.json();

        if (successfulSignup) {
          cl(`User created on the server: ${prettyJson(successfulSignup)}...`);
          let browser = await saveToBrowser(e.target);
          let processed = await getLogin(e.target);
          if (
            browser.id === processed.id &&
            browser.password === processed.password
          ) {
            clOk(`You have completed the sign-up process...`);
            cl(`You are now being redirected to your CMS...`);
            // Simulate an HTTP redirect
            return window.location.replace("cms.html");
          }
        }
      }
    });
  } catch (error) {
    responseError(error);
  }
};

const startLogin = async () => {
  try {
    const form = id("formSignin"),
      usr = id("identity"),
      pwd = id("pwd");
    //let x = navigator.credentials.store(new PasswordCredential({id: 444, type: "password", password: "332211"}));

    form.addEventListener("submit", async (e) => {
      // Stop submitting form by itself
      e.preventDefault();
      clAlert(`You have started the sign-in process...`);

      let headersList = {
        accept: "*/*",
        "user-agent": "prjctX (https://github.com/sabuein/prjctX)",
        "accept-charset": "utf-8",
        connection: "keep-alive",
      };
      // Try sign-in with AJAX
      const response = await fetch("http://localhost:8888/collectors/login", {
        method: "post",
        mode: "cors",
        credentials: "include",
        body: new FormData(e.target),
        headersList,
      });

      if (!response.status == 200) {
        return Promise.reject(`Sign-in failed`);
      }

      const successfulLogin = await response.json();

      if (successfulLogin) {
        cl(`User found on the server: ${prettyJson(successfulLogin)}...`);
        let browser = await saveToBrowser(e.target);
        let processed = await getLogin(e.target);
        if (
          browser.id === processed.id &&
          browser.password === processed.password
        ) {
          clOk(`You have completed the sign-in process...`);
          clAlert(`You are being redirected to your CMS...`);
          // Simulate an HTTP redirect
          return window.location.replace("cms.html");
        }
      }
    });

    usr.onchange = validateUser;
    usr.onkeyup = validateUser;
    pwd.onchange = validatePass;
    pwd.onkeyup = validatePass;
  } catch (error) {
    responseError(error);
  }
};

const saveToBrowser = async (form) => {
  try {
    if (window.PasswordCredential) {
      const creds = new PasswordCredential(form);

      if (
        creds.type === "password" &&
        creds.password !== "" &&
        creds.id !== ""
      ) {
        await navigator.credentials.store(creds);
        return creds;
      } else {
        throw new Error(`Saving password to the browser failed`);
      }
    } else {
      throw new Error(`Authentication error`);
    }
  } catch (error) {
    responseError(error);
  }
};

const validateUser = () => {
  try {
    const user = id("identity"),
      testing = "sabuein";
    if (user.value !== testing) {
      user.setCustomValidity("The username is incorrect");
    } else {
      user.setCustomValidity("");
    }
  } catch (error) {
    responseError(error);
  }
};

const validatePass = () => {
  try {
    const password = id("pwd"),
      testing = "123456789";
    if (password.value !== testing) {
      password.setCustomValidity("The password is incorrect");
    } else {
      password.setCustomValidity("");
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
  startRegister,
  startLogin,
};
