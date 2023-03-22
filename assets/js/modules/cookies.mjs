import { cl } from "./helpers.mjs";

const giveMeCookies = async () => {
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
    // CookieStore.delete()
    // CookieStore.get()
    // CookieStore.getAll()
    // CookieStore.set()
}

export { giveMeCookies };