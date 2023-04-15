"use strict";

import Collector from "Collector";
import { cl, clCurrent, clNew, responseError } from "helpers";
import { getStatus, setStatus, clearSiteData } from "storage";

const loadMembers = async (request) => {
  try {
    let headersList = {
      accept: "*/*",
      "accept-charset": "utf-8",
      "user-agent": "prjctX (https://github.com/sabuein/prjctX)",
      Connection: "keep-alive",
    };

    return await (
      await fetch(request, {
        method: "get",
        mode: "cors",
        headers: headersList,
      })
    ).text();
  } catch (error) {
    responseError(error);
  }
};

const addMember = async (data) => {
  try {
    let request = new Request("http://localhost:8888/collectors/add");

    let headersList = {
      Accept: "*/*",
      "User-Agent": "prjctX (https://github.com/sabuein/prjctX)",
      "Accept-Charset": "utf-8",
      Connection: "keep-alive",
      "Content-Type": "application/json",
    };

    return await (
      await fetch(request, {
        method: "post",
        mode: "no-cors",
        headers: headersList,
        body: JSON.stringify(data),
      })
    ).text();
  } catch (error) {
    responseError(error);
  }
};

const updateMember = async (request, id) => {
  try {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "prjctX (https://github.com/sabuein/prjctX)",
      "Accept-Charset": "utf-8",
      Connection: "keep-alive",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      name: "Zainab Al-Abdulrahman",
      email: "zainab.alabdulrahman@example.com",
      phone: "+966561234567",
    });

    request.url = `${request.url}${id}`;

    return await (
      await fetch(request, {
        method: "put",
        mode: "cors",
        headers: headersList,
        body: bodyContent,
      })
    ).text();
  } catch (error) {
    responseError(error);
  }
};

const setCollector = (credentials) => {
  try {
    const account = new Collector(credentials);
    setStatus("account", JSON.stringify(account));
    return account;
  } catch (error) {
    responseError(error);
  }
};

const getLogin = (form = null) => {
  try {
    const account = JSON.parse(getStatus("account"));
    if (form || account) {
      clNew(`############ New account ############`);
      return getNewLogin(form);
    } else if (account) {
      clCurrent(`############ Current account ############`);
      return account.credentials;
    }
  } catch (error) {
    responseError(error);
  }
};

const getRandomString = (size) => {
  try {
    let result = "", characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < size; i++) result += characters.charAt(Math.floor(Math.random() * characters.length));
    return result;
  } catch (error) {
    responseError(error);
  }
};

const getNewLogin = async (form = null) => {
  try {
    if (window.PasswordCredential) {
      if (form) {

        const creds = new PasswordCredential(form);

        const credentials = {
            id: creds.id,
            name: creds.name,
            type: creds.type,
            iconURL: creds.iconURL,
            password: creds.password
          };

        const user = setCollector(credentials);
        setStatus("visit", JSON.stringify({ id: user.visit.id}));
        return user.credentials;
      
      } else {
        const creds = await navigator.credentials.get({ password: true });
        if (creds && creds.type === "password" /*&& u.isValidJID(creds.id)*/) {
          /*await setUserJID(creds.id);*/
          const credentials = {
            id: creds.id,
            name: creds.name,
            type: creds.type,
            iconURL: creds.iconURL,
            password: creds.password
          };

          const user = setCollector(credentials);
          setStatus("visit", JSON.stringify({ id: user.visit.id}));
          return user.credentials;

        } 
      }
    }
  } catch (error) {
    responseError(error);
  }
};

const signOut = () => {
  // First terminate the session

  // Then turn off auto sign-in for future visits
  if (navigator.credentials && navigator.credentials.preventSilentAccess) {
    navigator.credentials.preventSilentAccess();
  }
};

export {
  loadMembers,
  addMember,
  updateMember,
  setCollector,
  getLogin,
};
