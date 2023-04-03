import { cd, cl, responseError } from "./helpers.mjs";
import { pJson } from "./view.mjs";

const cookieEnabled = async () => {
  return navigator.cookieEnabled;
};

const getUserAgentController = async () => {
  const controller = navigator.serviceWorker.controller;
  if (controller) {
    try {
      return {
        scriptURL: controller.scriptURL,
        state: controller.state,
        onerror: controller.onerror,
        onstatechange: controller.onstatechange,
      };
    } catch (error) {
      responseError(error);
    }
  }
};

const getUserAgentData = async () => {
  const keys = [
    "architecture",
    "bitness",
    "model",
    "platform",
    "platformVersion",
    "uaFullVersion",
    "fullVersionList",
  ];
  const result = await navigator.userAgentData.getHighEntropyValues(keys);
  // cd(pJson(result));
  return result;
};

const getUserLanguages = async () => {
  const language = navigator.language,
    languages = navigator.languages;
  return {
    languages: {
      main: language,
      all: languages,
    },
  };
};

// TO-FIX
const getUserLocation = async (options) => {
  return await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const insertUserLocation = async () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  return await getUserLocation(options)
    .then((pos) => {
      const coords = pos.coords;
      return (location = {
        geo: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          metersRoughly: coords.accuracy,
        },
      });
    })
    .catch((error) => responseError(error));
};

// console.log("Platform: " + navigator.platform);
// console.log("Connection Speed: " + navigator.connectionSpeed);
// console.log("Webdriver: " + navigator.webdriver);

export {
  cookieEnabled,
  getUserAgentController,
  getUserAgentData,
  getUserLanguages,
  insertUserLocation,
};
