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
        if (cookies) {
            cl("Cookies worked!");
        } else {
            throw new Error("Cookies failed");
        }
    } catch (error) {
        responseError(error);
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
    try {
        if (typeof Storage !== "undefined") {
            return window.localStorage.clear(); // delete everything
        } else {
            throw new Error(`There is no local storage support`);
        }
    } catch (error) {
        responseError(error);
    }
}

const sizeLocalStorage = () => {
    try {
        if (typeof Storage !== "undefined") {
            return window.localStorage.length; // the number of stored items
        } else {
            throw new Error(`There is no local storage support`);
        }
    } catch (error) {
        responseError(error);
    }
}

const printLocalStorage = (trigger, output) => {
    try {
        if (typeof Storage !== "undefined") {
            trigger.addEventListener("click", () => {
                output.innerText = pJson(window.localStorage);
            });
        } else {
            throw new Error(`There is no local storage support`);
        }
    } catch (error) {
        responseError(error);
    }
}

const getStatus = (key) => {
    try {
        if (typeof Storage !== "undefined") {
            return window.localStorage.getItem(key);
        } else {
            throw new Error(`There is no local storage support`);
        }
    } catch (error) {
        responseError(error);
    }
}

const setStatus = (key, value) => {
    try {
        if (typeof Storage !== "undefined") {
            return window.localStorage.setItem(key, value);
        } else {
          throw new Error(`There is no local storage support`);
        }
    } catch (error) {
        responseError(error);
    }
}

const startSessionStorage = () => {
    cl(`TODO: Session storage`);
}

const printSessionStorage = (trigger, output) => {
    try {
        if (typeof Storage !== "undefined") {
            trigger.addEventListener("click", () => {
                output.innerText = pJson(window.sessionStorage);
            });
        } else {
            throw new Error(`There is no session storage support`);
        }
    } catch (error) {
        responseError(error);
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
    getStatus,
    setStatus,
    sizeLocalStorage,
    printLocalStorage,
    startSessionStorage,
    printSessionStorage,
    startWebSql
};