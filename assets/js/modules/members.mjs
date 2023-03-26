import Collector from "../classes/Collector.mjs";
import { cl, responseError } from "./helpers.mjs";

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

const fakeCollector = () => {
  try {
    let address = {
      number: 129,
      street: "Seymour Road",
      postcode: "E10 7LZ",
      city: "London",
      country: "United Kingdom",
    },
      access = {
        username: "sabuein",
        password: "something",
      };
    cl(`[*Art Collector] Building a profile for someone...\r\n`);
    const someone = new Collector(address, access);
    cl(`[*Art Collector] Calling someone's fullAddress()...\r\n`);
    someone.fullAddress();
    cl(`[*Art Collector] Calling someone's whois()...\r\n`);
    someone.whois();
  } catch (error) {
    responseError(error);
  }
};

export { loadMembers, addMember, updateMember, fakeCollector };