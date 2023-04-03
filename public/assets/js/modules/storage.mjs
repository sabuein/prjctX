import { cl, ce } from "./helpers.mjs";

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
    window.localStorage.getItem(key, value); // get the value by key
    window.localStorage.removeItem(key, value); // remove the key with its value
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
            output.innerText = JSON.stringify(window.localStorage, null, "\t");
        });
    } catch (error) {
        ce(`Error in printLocalStorage();`);
        cl(`${error}`);
    }
}


const startSessionStorage = () => {
    cl(`TODO: Session storage`);
}

const printSessionStorage = (trigger, output) => {
    try {
        trigger.addEventListener("click", () => {
            output.innerText = JSON.stringify(window.sessionStorage, null, "\t");
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
    sizeLocalStorage,
    printLocalStorage,
    startSessionStorage,
    printSessionStorage,
    startWebSql
};