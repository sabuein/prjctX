import { cl } from "./helpers.mjs";

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


const startSessionStorage = () => {
    cl(`TODO: Session storage`);
}


const startIndexedDb = () => {
    cl(`TODO: IndexedDB`);
}


const startWebSql = () => {
    cl(`TODO: Web SQL`);
}

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

export {
    startLocalStorage,
    startSessionStorage,
    startIndexedDb,
    startWebSql,
    startCookies
};