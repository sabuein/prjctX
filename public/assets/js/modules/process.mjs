"use strict";

import {
    cl,
    clOk,
    clAlert,
    getJson,
    getObject,
    id,
    responseError
} from "helpers";
import { bytesToText } from "utilities";

const handleSingleInputFile = (input) => {
    try {
        input.addEventListener("change", (e) => {
            // get uploaded files
            const { files } = e.target;
            handleTextFile(files);
        });
    } catch (error) {
        responseError(error);
    }
};

const handleMultipleInputFile = (input, output) => {
    try {
        input.addEventListener("change", (e) => {
            // get uploaded files
            const { files } = e.target;
            handleUploadedImages(files, output);
        });
    } catch (error) {
        responseError(error);
    }
};

const dragAndDrop = (zone, output) => {
    try {
        zone.addEventListener("dragenter", (e) => {
            e.preventDefault();
            clAlert(`DropZone status: Active: Drag Enter...`);
        });
        
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            clAlert(`DropZone status: Active: Drag over...`);
        });
        
        zone.addEventListener("dragleave", (e) => {
            e.preventDefault();
            clAlert(`DropZone status: Inactive: Drag leave...`);
        });
        
        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            clAlert(`DropZone status: Inactive: Drag drop...`);
            // get uploaded files
            const { files } = e.dataTransfer;
            handleUploadedImages(files, output);
        });
    } catch (error) {
        responseError(error);
    }
};

const handleTextFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        cl(e.target.result);
    };
    if (file) reader.readAsText(file, "utf-8");
};

const handleUploadedImages = (files, output) => {
    const accepted = [...files].filter((file) => ["image/jpeg", "image/png"].includes(file.type));
    accepted.forEach(image => renderImage(image, output));
    //sendAcceptedImages(accepted);
    clOk(`Uploading ${accepted.length} image(s) to the server...`)
};

const renderImage = (image, output) => {
    while (output.hasChildNodes()) {
        output.firstChild.remove();
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener("load", (e) => {
        const img = document.createElement("img"),
            figure = document.createElement("figure"),
            figcaption = document.createElement("figcaption");
        img.src = e.target.result;
        img.alt = image.name;
        figcaption.innerHTML = `${image.name} - ${bytesToText(image.size)}`;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.classList.add("flexy");
        figure.classList.add("fullWidth");
        output.appendChild(figure);
    });
};

const sendAcceptedImages = async (files) => {
    try {
        const data = new FormData();
        [...files].forEach(image => {
            data.append("image[]", image, image.name);
        });
        // http://localhost:8888/collectors/upload
        const response = await fetch("/upload.php", {
            method: "post",
            body: data,
        });
        const result = await response.json();
        clAlert(result);
    } catch (error) {
        responseError(error);
    }
};

const readCountriesJson = async (request) => {
    try {
        let headersList = {
            accept: "*/*",
            "accept-charset": "utf-8",
            "user-agent": "prjctX (https://github.com/sabuein/prjctX)",
            Connection: "keep-alive",
        };
        // http://localhost:8888/collectors/upload
        return await (
            await fetch(request, {
              method: "get",
              mode: "cors",
              headers: headersList,
            })
          ).text();
    } catch (error) {
        responseError(error);
    }
};

export {
    handleSingleInputFile,
    handleMultipleInputFile,
    dragAndDrop,
    readCountriesJson
};