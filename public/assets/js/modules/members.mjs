"use strict";

import Collector from "../classes/Collector.mjs";
import { cl, responseError } from "./helpers.mjs";
import { getStatus, setStatus } from "./storage.mjs";
import {
  cookieEnabled,
  getUserAgentController,
  getUserAgentData,
  getUserLanguages,
  insertUserLocation,
} from "./hints.mjs";

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

const setCollector = (credentials, address, client, optional) => {
  try {
    const account = new Collector(credentials, address, client, optional);
    setStatus("account", JSON.stringify(account));
    return account;
  } catch (error) {
    responseError(error);
  }
};

const getLogin = async () => {
  try {
    const account = JSON.parse(getStatus("account"));
    if (account) {
      const credentials = account.credentials;
      return credentials;
    } else {
      const account = await setLogin();
      return account;
    }
  } catch (error) {
    responseError(error);
  }
};

const setLogin = async () => {
  try {
    const creds = await navigator.credentials.get({ password: true });
    if (creds && creds.type === "password" /*&& u.isValidJID(creds.id)*/) {
      /*await setUserJID(creds.id);*/
      const credentials = {
        id: creds.id,
        name: creds.name,
        type: creds.type,
        email: creds.email,
        password: creds.password,
        iconURL: creds.iconURL,
      };
      setStatus("account", JSON.stringify({ credentials: credentials }));
      return account;
    } else {
      return getLogin();
    }
  } catch (error) {
    window.location.replace = "signin.html";
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

const getClientInfo = async () => {
  return {
    cookieEnabled: await cookieEnabled(),
    clientController: getUserAgentController(),
    clientLocation: await insertUserLocation(),
    clientLanguages: await getUserLanguages(),
    clientData: await getUserAgentData(),
  };
};

export { loadMembers, addMember, updateMember, setCollector, getLogin, getClientInfo };
