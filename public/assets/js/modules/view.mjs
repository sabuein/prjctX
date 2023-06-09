"use strict";

import { pwaNotifyMe } from "push";
import { startPWA, pwaAddToHome } from "pwa";
import { cl, clOk, clAlert, clWarn, id, responseError } from "helpers";
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
import { readCountriesJson } from "process";

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

const setImportMap = () => {
  try {
    if (HTMLScriptElement.supports && HTMLScriptElement.supports("importmap")) {
      clAlert(`Creating the import map...`);
    
      const importMap = {
        imports: {
          Collector: "./assets/js/classes/Collector.mjs",
          User: "./assets/js/classes/User.mjs",
          communication: "./assets/js/components/communication.mjs",
          static: "./assets/js/components/static.mjs",
          bluetooth: "./assets/js/modules/bluetooth.mjs",
          cache: "./assets/js/modules/cache.mjs",
          helpers: "./assets/js/modules/helpers.mjs",
          hints: "./assets/js/modules/hints.mjs",
          members: "./assets/js/modules/members.mjs",
          posts: "./assets/js/modules/posts.mjs",
          process: "./assets/js/modules/process.mjs",
          push: "./assets/js/modules/push.mjs",
          pwa: "./assets/js/modules/pwa.mjs",
          storage: "./assets/js/modules/storage.mjs",
          testing: "./assets/js/modules/testing.mjs",
          utilities: "./assets/js/modules/utilities.mjs",
          view: "./assets/js/modules/view.mjs",
        }
      }, script = document.createElement("script");
      script.type = "importmap";
      script.textContent = JSON.stringify(importMap);
      document.currentScript.after(script);
    } else {
      throw new Error(`The browser does not support Import maps`);
    }
  } catch (error) { responseError(error); }
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
    checkActivePage();
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

const startSubscribe = (select, api) => {
  renderCountries(api, select);
}

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
      users = [
        "sabuein",
        "sabuein@gmail.com",
        "salah@abuein.com",
        "zanani",
        "zanani@gmail.com"
      ];
    if (!users.includes(user.value)) {
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
      passwords = [
        "12345678",
        "123456789",
        "01234567",
        "012345678",
        "0123456789"
      ];
    if (!passwords.includes(password.value)) {
      password.setCustomValidity("The password is incorrect");
    } else {
      password.setCustomValidity("");
    }
  } catch (error) {
    responseError(error);
  }
};

const renderCountries = async (input, output) => {
  const json = await readCountriesJson(input);
  const countries = JSON.parse(json);
  let options = [];
  clOk(`You got ${countries.length} countries`);
  for (const country of countries) {
    options.push({
      name: country.name,
      id: country.alpha3Code.toLowerCase(),
    });
  }
  clOk(`You got ${options.length} countries`);
  options.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  for (const option of options) {
    let opt = document.createElement("option");
    opt.innerHTML = option.name;
    opt.value = option.id;
    output.appendChild(opt);
  }

}

const checkActivePage = () => {
  try {
    if (typeof meta !== "undefined") {
      const slug = meta.document.slug,
        items = document.querySelectorAll("ul.nav-item li");
      for (let item of items) {
        if (item.dataset.pageSlug === slug) item.classList.toggle("active-nav-item");
      }
    } else {
      throw new Error(`There is no slug attached to this page`);
    }
  } catch (error) { responseError(error); }
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
  startSubscribe,
  startLogin
};
