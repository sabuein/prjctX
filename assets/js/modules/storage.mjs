import { cl } from "./helpers.mjs";

const startLocalStorage = () => {
    cl(`TODO: Local storage`);
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