"use strict";

import { cl, responseError } from "./helpers.mjs";

const getPost = (id) => {
    cl(`TODO: getPost(id)`);
};

const getDate = (input) => {
    try { // "2023-04-14T20:52:29.672Z"
        const formatter = new Intl.DateTimeFormat("PS", {
            dateStyle: "full",
            timeStyle: "long"
        });
        return formatter.format(new Date(input)); // "Friday, 14 April 2023 at 21:52:29 BST"
    } catch (error) {
        responseError(error);
    }
};

export {
    getPost,
    getDate
};