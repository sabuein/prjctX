import Collector from "../classes/Collector.mjs";
import { cl, responseError } from "./helpers.mjs";
import {
  cookieEnabled,
  getUserAgentController,
  getUserAgentData,
  getUserLanguages,
  insertUserLocation
} from "./hints.mjs";

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

const fakeCollector = async () => {

  try {
    let userCredentials = {
      credentials: {
        type: "password",
        id: 4567,
        email: "sabuein@gmail.com",
        password: "123456789",
        name: "Salaheddin AbuEin",
        iconURL: null
      }
    },
      userAddress = {
        address: {
          number: 129,
          street: "Seymour Road",
          postcode: "E10 7LZ",
          city: "London",
          country: "United Kingdom"
        }
      },
      client = {
        cookieEnabled: await cookieEnabled(),
        clientController: getUserAgentController(),
        clientLocation: await insertUserLocation(),
        clientLanguages: await getUserLanguages(),
        clientData: await getUserAgentData(),
        clientX: { key: "add more information" }
      };

    // Getting some hints to use as extra information
    const user = new Collector(userCredentials, userAddress, { client: client });
    cl(`${user.constructor.name} #${user.id}: ${user.whois}`);

    window.localStorage.setItem("userCredentials", JSON.stringify(userCredentials));
    cl(JSON.parse(window.localStorage.getItem("userCredentials")));

  } catch (error) {
    responseError(error);
  }
};

const userLogin = async () => {
  const login = await window.navigator.credentials.get({password: true}).then((creds) => {
    if (creds && creds.type === "password") {
      cl(`#Credentials: ID: ${creds.id}`);
      cl(`#Credentials: Name: ${creds.name}`);
      return creds;
    } else {
      return Promise.resolve()
    }
  }).then(profile => {
    if (profile) {
      cl(`Update UI: ${profile}`);
    } else {
      window.location.href = "/login.html";
    }
  }).catch(error => {
    window.location.href = "/login.html";
    responseError(error);
  });
}

const signOut = () => {
  // First terminate the session

  // Then turn off auto sign-in for future visits
  if (navigator.credentials && navigator.credentials.preventSilentAccess) {
    navigator.credentials.preventSilentAccess();
  }
}

export { loadMembers, addMember, updateMember, fakeCollector, userLogin};