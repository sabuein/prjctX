import { cl, ce, clAlert, clOk, clNew, clWarn, responseError } from "helpers";
import { pJson } from "view";

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
};

const clearCookies = () => {
    clAlert(`TODO: Clearing Cookies...`);
};

const startIndexedDb = () => {
    cl(`TODO: IndexedDB`);
};

const clearIndexedDb = () => {
    clAlert(`TODO: Clearing IndexedDB...`);
};

const startLocalStorage = () => {
    window.localStorage.setItem(key, value); // store key/value pair
    window.localStorage.getItem(key); // get the value by key
    window.localStorage.removeItem(key); // remove the key with its value
    window.localStorage.key(index); // get the key on a given position
    cl(`---| Local storage started.`);
};

const clearLocalStorage = () => {
    try {
        if (typeof Storage !== "undefined") {
            window.localStorage.clear();
            clAlert(`Clearing local storage...`);
        } else {
            throw new Error(`There is no local storage support`);
        }
    } catch (error) {
        responseError(error);
    }
};

const clearSessionStorage = () => {
    try {
        if (typeof Storage !== "undefined") {
            window.sessionStorage.clear();
            clAlert(`Clearing session storage...`);
        } else {
            throw new Error(`There is no session storage support`);
        }
    } catch (error) {
        responseError(error);
    }
};

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
};

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
};

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
};

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
};

const startSessionStorage = () => {
    cl(`TODO: Session storage`);
};

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
};

const startWebSql = () => {
    cl(`TODO: Web SQL`);
};

const clearWebSql = () => {
    clAlert(`TODO: Clearing Web SQL...`);
};

const startServiceWorker = async (uri = "/serviceWorker.js") => {
    try {
        if (window.isSecureContext && "serviceWorker" in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            if (!navigator.serviceWorker.controller) {
                clWarn(`Registering service worker...`);
                const registeredWorker = await navigator.serviceWorker.register(
                    uri,
                    {
                        scope: "/",
                    }
                );
                // Start
                registeredWorker.addEventListener("updatefound", async () => {
                    const installingWorker = registeredWorker.installing;
                    switch (installingWorker.state) {
                        case "installing": // We are here!
                            cl(
                                `The service worker in this state is considered an installing worker. During this state, ExtendableEvent.waitUntil() can be called inside the install event handler to extend the life of the installing worker until the passed promise resolves successfully. This is primarily used to ensure that the service worker is not active until all of the core caches are populated.`
                            );
                            break;
                        case "installed":
                            cl(
                                `The service worker in "installed" state is considered a waiting worker.`
                            );
                            if (navigator.serviceWorker.controller) {
                                cl(`TODO: notify user: "New or updated content is available."`);
                            } else {
                                cl(`TODO: notify user: "Content is now available offline."`);
                            }
                            break;
                        case "activating":
                            cl(
                                `The service worker in this state is considered an active worker. During this state, ExtendableEvent.waitUntil() can be called inside the onactivate event handler to extend the life of the active worker until the passed promise resolves successfully. No functional events are dispatched until the state becomes activated.`
                            );
                            break;
                        case "activated":
                            cl(
                                `The service worker in this state is considered an active worker ready to handle functional events.`
                            );
                            break;
                        case "redundant":
                            cl(
                                `A new service worker is replacing the current service worker, or the current service worker is being discarded due to an install failure.`
                            );
                            break;
                        default:
                            cl(`Service worker state reporting ended.`);
                    }
                });
                // End
                clOk(`The service worker is running and active`);
            }

            logServiceWorkerState();

        } else {
            throw new Error(`The broswer does not support service workers`);
        }
    } catch (error) {
        responseError(error);
    }
};

const checkServiceWorkerState = () => {
    try {
        let controller = navigator.serviceWorker.controller || "null";
        switch(controller.state) {
            case "activated":
                clAlert(`The service worker has been activated and is running...`);
                break;
            case "null":
                clWarn(`No state found`);
                break;
        }
    } catch (error) {
        responseError(error);
    }
}

const logServiceWorkerState = () => {
    try {
        navigator.serviceWorker.addEventListener("statechange", (e) => {
            clNew(e.target.state);
        });
    } catch (error) {
        responseError(error);
    }
};
const unregisterServiceWorker = async () => {
    try {
        if (window.isSecureContext && "serviceWorker" in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (let registration of registrations) {
                let x = await registration.unregister();
                clAlert(`Unregistering service worker: ${x}...`);
            }
        } else {
            throw new Error(`The broswer does not support service workers`);
        }
    } catch (error) {
        responseError(error);
    }
};

const clearSiteData = async () => {
    try {
        // Application
        await unregisterServiceWorker();
        // Local and session storage
        clearLocalStorage();
        clearSessionStorage();
        // IndexedDB
        clearIndexedDb();
        // Web SQL
        clearWebSql();
        // Cookies
        clearCookies();
        // Done
        clOk(`Site data has been cleared successfully.`);
    } catch (error) {
        responseError(error);
    }
};

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
    startWebSql,
    clearSiteData,
    startServiceWorker,
    unregisterServiceWorker,
    checkServiceWorkerState,
    logServiceWorkerState,
};
