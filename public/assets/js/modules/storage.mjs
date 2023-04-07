import { cl, ce } from "./helpers.mjs";
import { pJson } from "./view.mjs";

const startCookies = async () => {
    // CookieStore.delete()
    // CookieStore.get()
    // CookieStore.getAll()
    // CookieStore.set()
    try {
        const day = 24 * 60 * 60 * 1000;
        const cookies = await cookieStore.set({
            name: "prjctx",
            value: "prjctx-project",
            expires: Date.now() + day,
            domain: "localhost",
        });
        cookies ? cl("Cookies worked!") : cl("Cookies failed");
    } catch (reason) {
        console.error(`Error: ${reason}`);
    }
}

const startIndexedDb = () => {
    cl(`TODO: IndexedDB`);
}

const startLocalStorage = () => {
    window.localStorage.setItem(key, value); // store key/value pair
    window.localStorage.getItem(key); // get the value by key
    window.localStorage.removeItem(key); // remove the key with its value
    window.localStorage.key(index); // get the key on a given position
    cl(`---| Local storage started.`);
}

const clearLocalStorage = () => {
    window.localStorage.clear(); // delete everything
}

const sizeLocalStorage = () => {
    return window.localStorage.length; // the number of stored items
}

const printLocalStorage = (trigger, output) => {
    try {
        trigger.addEventListener("click", () => {
            output.innerText = pJson(window.localStorage);
        });
    } catch (error) {
        ce(`Error in printLocalStorage();`);
        cl(`${error}`);
    }
}

const checkStatus = (key) => {
    return window.localStorage.getItem(key);
}

const registerStatus = (key, value) => {
    return window.localStorage.setItem(key, value);
}

const startSessionStorage = () => {
    cl(`TODO: Session storage`);
}

const printSessionStorage = (trigger, output) => {
    try {
        trigger.addEventListener("click", () => {
            output.innerText = pJson(window.sessionStorage);
        });
    } catch (error) {
        ce(`Error in printLocalStorage();`);
        cl(`${error}`);
    }
}

const startWebSql = () => {
    cl(`TODO: Web SQL`);
}

export {
    startCookies,
    startIndexedDb,
    startLocalStorage,
    clearLocalStorage,
    checkStatus,
    registerStatus,
    sizeLocalStorage,
    printLocalStorage,
    startSessionStorage,
    printSessionStorage,
    startWebSql
};