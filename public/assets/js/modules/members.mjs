import Collector from "../classes/Collector.mjs";
import { cl, responseError } from "./helpers.mjs";
import { getStatus, setStatus } from "./storage.mjs";

const loadMembers = async (request) => {
  try {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "prjctX (https://github.com/sabuein/prjctX)",
      "Accept-Charset": "utf-8",
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

const setCollector = (credentials, address, client, extra) => {
  try {
    const user = new Collector(credentials, address, client, extra);
    setStatus("user", JSON.stringify(user));
    return user;
  } catch (error) {
    responseError(error);
  }
};

const getLogin = async () => {
  const account = JSON.parse(getStatus("account"));
  if (account) {
    const creds = account.credentials;
    cl(`Welcome back, ${creds.name}`);
    return creds;
  } else {
    const account = await setLogin();
    cl(`Welcome aboard, ${account}`);
    return account;
  }
};

const setLogin = async () => {
  try {
    const creds = await navigator.credentials.get({ password: true });
    if (creds && creds.type === "password" /*&& u.isValidJID(creds.id)*/) {
      /*await setUserJID(creds.id);*/
      const account = {
        credentials: {
          id: creds.id,
          name: creds.name,
          type: creds.type,
          email: creds.email,
          password: creds.password,
          iconURL: creds.iconURL,
        },
      };
      setStatus("account", JSON.stringify(account));
      return account;
    } else {
      return getLogin();
    }
  } catch (error) {
    window.location.href = "/login.html";
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

export { loadMembers, addMember, updateMember, setCollector, getLogin };
