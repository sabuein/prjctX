
/*jshint esversion: 8 */

import { cl, id } from "./helpers.mjs";

const registerServiceWorker = async (url) => {
    if (window.isSecureContext && navigator && navigator.serviceWorker) {
        try {
            const registration = await navigator.serviceWorker.register(url, {
                scope: "/",
            });
            if (registration.installing) {
                cl("Service worker installing");
            } else if (registration.waiting) {
                cl("Service worker installed");
            } else if (registration.active) {
                cl("Service worker active");
            }
        } catch (error) {
            cl(`Registration failed with ${error}`);
        }
    } else {
        cl("The browser does not offer service worker registration.");
    }
};

const startPWA = async (deferredPrompt, button) => {
    window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        button.style.display = "block";

        button.addEventListener("click", (e) => {
            // hide our user interface that shows our A2HS button
            button.style.display = "none";
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                } else {
                    console.log("User dismissed the A2HS prompt");
                }
                deferredPrompt = null;
            });
        });
    });
};

const requestNotificationsPermission = () => {
    Notification.requestPermission().then((result) => {
        if (result === "granted") {
            const someGames = [
                {
                    "name": "Super Mario Bros.",
                    "author": "Shigeru Miyamoto",
                    "slug": "super-mario-bros"
                },
                {
                    "name": "The Legend of Zelda",
                    "author": "Shigeru Miyamoto",
                    "slug": "the-legend-of-zelda"
                },
                {
                    "name": "Minecraft",
                    "author": "Markus Persson",
                    "slug": "minecraft"
                },
                {
                    "name": "Tetris",
                    "author": "Alexey Pajitnov",
                    "slug": "tetris"
                }
            ];
            randomNotification(someGames);
        }
    });
}

const randomNotification = (input) => {
    const randomItem = Math.floor(Math.random() * input.length);
    const notifTitle = input[randomItem].name;
    const notifBody = `Created by ${input[randomItem].author}.`;
    const notifImg = `/assets/images/notifications/${input[randomItem].slug}.jpg`;
    const options = {
        body: notifBody,
        icon: notifImg,
    };
    new Notification(notifTitle, options);
    // setTimeout(randomNotification(input), 30000);
}

export { registerServiceWorker, startPWA, requestNotificationsPermission };