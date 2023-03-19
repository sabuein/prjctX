import { cl, id } from "./modules/helpers.mjs";
import { loadMembers, renderMembers } from "./modules/fetching.mjs";
import { setCustomComponent } from "./modules/customComponent.mjs";
import { AppHeading } from "./modules/components.mjs";

setCustomComponent(AppHeading, "app-heading");

document.addEventListener("DOMContentLoaded", async () => {

    const request = new Request("http://localhost:8888/collectors/all"), output = id("membersBody");

    if (window.fetch) {
        try {
            // members = await loadMembers(url);
            const members = await loadMembers(request, output);
            renderMembers(members, output);
        } catch (error) {
            console.error(error);
        }
    } else {
        cl("do something with XMLHttpRequest");
    }    
});

// const object = { a: 1, b: 2, c: 3 };

// for (const property in object) {
//   console.log(`${property}: ${object[property]}`);
// }

// <!-- Collectos API: http://localhost:8666/collectors/ -->

/*
// Uploading a file
// <input type="file" />
const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append("username", "abc123");
formData.append("avatar", fileField.files[0]);

fetch("https://example.com/profile/avatar", {
    method: "PUT",
    body: formData,
})
    .then((response) => response.json())
    .then((result) => {
        console.log("Success:", result);
    })
    .catch((error) => {
        console.error("There has been a problem with fetch operation:", error);
    });
*/

/*

// Uploading multiple files
// <input type="file" multiple />

const formData = new FormData();
const photos = document.querySelector('input[type="file"][multiple]');

formData.append("title", "My Vegas Vacation");
let i = 0;
for (const photo of photos.files) {
    formData.append(`photos_${i}`, photo);
    i++;
}

fetch("https://example.com/posts", {
    method: "POST",
    body: formData,
})
    .then((response) => response.json())
    .then((result) => {
        console.log("Success:", result);
    })
    .catch((error) => {
        console.error("There has been a problem with fetch operation:", error);
    });
*/

/*
const form = new FormData(document.getElementById("login-form"));
fetch("/login", {
  method: "POST",
  body: form,
});
*/
