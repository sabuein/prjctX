import { cd, cl, responseError } from "./helpers.mjs";
import { pJson } from "./view.mjs";

const cookieEnabled = async () => {
  return navigator.cookieEnabled;
};

const getUserAgentController = () => {
  if ("serviceWorker" in navigator) {
    try {
      const controller = navigator.serviceWorker.controller;
      if (controller) {
        return {
          scriptURL: controller.scriptURL,
          state: controller.state
        };
    }
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

  const pos = await getUserLocation(options);
  if (pos) {
    const coords = await pos.coords;
    return {
      geo: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        metersRoughly: coords.accuracy,
      },
    };
  }
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
