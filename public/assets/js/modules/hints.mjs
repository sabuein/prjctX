import { cd } from "./helpers.mjs";
import { pJson } from "./view.mjs";

const getUserLanguages = async () => {
    return navigator.languages;
}

const getUserAgentData = async () => {
    const keys = [
        "architecture",
        "bitness",
        "model",
        "platform",
        "platformVersion",
        "uaFullVersion",
        "fullVersionList"
    ];
    const result = await navigator.userAgentData.getHighEntropyValues(keys);
    // cd(pJson(result));
    return result;
}

// console.log("Cookies: " + navigator.cookieEnabled);
// console.log("Browser Language: " + navigator.browserLanguage);
// console.log("Language: " + navigator.language);
// console.log("Platform: " + navigator.platform);
// console.log("Connection Speed: " + navigator.connectionSpeed);
// console.log("User Agent: " + navigator.userAgent);
// console.log("Webdriver: " + navigator.webdriver);
// console.log("Geolocation: " + navigator.geolocation);



export { getUserLanguages, getUserAgentData };