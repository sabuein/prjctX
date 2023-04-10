"use strict";

import { cl, id, responseError } from "./modules/helpers.mjs";
import {
  loadMembers,
  addMember,
  updateMember,
  getLogin,
} from "./modules/members.mjs";
import {
  renderMembers,
  handlebars,
  startApp,
  startAdmin,
  startCMS,
  startLogin,
  startRegister
} from "./modules/view.mjs";

window.addEventListener("load", () => {
  startApp();
  if ("credentials" in navigator) {
    const cred = new PasswordCredential({
      id: 54321,
      password: "123sA#1587S$",
      name: "Salaheddin AbuEin",
      iconURL: "",
    });

    navigator.credentials
      .create({
        password: cred,
      })
      .then((creds) => {
        cl(`#TODO: Apply create credentials: ${creds.id}`);
        // return creds;
      });
  } else {
    cl(`Handle sign-in the other way.`);
  }  
});

// startCookies();
document.addEventListener("DOMContentLoaded", async () => {
  const account = getLogin();
  if (window.fetch) {
    if (typeof meta !== "undefined") {
      let slug = meta.document.slug;
      switch (slug) {
        case "index":
          const source = id("handle"),
            data = {
              name: "Salaheddin AbuEin",
              hometown: "Ramallah, occupied Palestine",
              live: "London, United Kingdom",
              age: 36,
              siblings: [
                { name: "AlMutasembellah", age: 35 },
                { name: "Hanan", age: 34 },
              ],
            };
          handlebars(source, data);
          break;
        case "members":
          const table = id("membersBody"),
            getLocal = new Request("/assets/collectors.json"),
            getApi = new Request("http://localhost:8888/collectors/all");
          renderMembers(await loadMembers(getApi), table);
          break;
        case "signin":
          startLogin();
          break;
        case "signup":
          startRegister();
          break;
        case "cms":
          startCMS();
          break;
        case "admin":
          startAdmin();
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
          break;
        default:
          cl(`You are on ${slug}. We need to do something with XMLHttpRequest`);
      }
    }
  }
});
