"use strict";

import { cl } from "./helpers.mjs";

// step 1 : Ask user consent to show notifications
// Ask user permission

// step 2 : Susbcribe to push notification
// this will create an endpoint that has to be sent to the push server
// Create notification subscription

// step 3 : Send the notification to the push server
// Send subscription to push server

// step 4 : Ask the push server for a notification
// in production you don't ask for notifications, The push server decide itself when to send them
// Send a push notification

// Activating push-service subscription to run every 30 seconds
const activatePush = (ms) => {
  setInterval(requestNotificationsPermission, ms);
};

const pwaNotifyMe = (pushButton) => {
  try {
    const serviceWorkerRegistration = async () =>
      await navigator.serviceWorker.ready;
    const subscription = async () =>
      await serviceWorkerRegistration.pushManager.getSubscription();
    pushButton.addEventListener("click", (e) => {
      if (!subscription) {
        cl(`Subscription to push-notification has failed.`);
        pushButton.textContent = "Enable Push Messages";
        return;
      } else {
        pushButton.disabled = false;
        // Keep your server in sync with the latest subscriptionId
        sendSubscriptionToServer(subscription);
        showCurlCommand(subscription);

        subscription.isPushEnabled = true;
        requestNotificationsPermission();
      }
    });
  } catch (error) {
    cl(`Error in notifyMe(); ${error}`);
  }
};

const sendSubscriptionToServer = (subscription) => {
  cl(subscription);
};

const showCurlCommand = (subscription) => {
  cl(subscription);
};

const requestNotificationsPermission = async () => {
  try {
    const request = await Notification.requestPermission();
    if (request === "granted") {
      const someGames = [
        {
          name: "Super Mario Bros.",
          author: "Shigeru Miyamoto",
          slug: "super-mario-bros",
        },
        {
          name: "The Legend of Zelda",
          author: "Shigeru Miyamoto",
          slug: "the-legend-of-zelda",
        },
        {
          name: "Minecraft",
          author: "Markus Persson",
          slug: "minecraft",
        },
        {
          name: "Tetris",
          author: "Alexey Pajitnov",
          slug: "tetris",
        },
      ];
      randomNotification(someGames);
    }
  } catch {
    cl(`Notifications permission has failed.`);
  }
};

const randomNotification = (input) => {
  try {
    const randomItem = Math.floor(Math.random() * input.length);
    const notifTitle = input[randomItem].name;
    const notifBody = `Created by ${input[randomItem].author}.`;
    const notifImg = `/assets/images/notifications/${input[randomItem].slug}.jpg`;
    const options = {
      body: notifBody,
      icon: notifImg,
    };
    new Notification(notifTitle, options);
  } catch (error) {
    cl(`Random notification failed: ${error}`);
  }
};

export { activatePush, pwaNotifyMe };