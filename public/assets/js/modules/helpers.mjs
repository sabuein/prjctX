"use strict";

// Console
const cl = (something) => console.log(something);

const status = {
    ok: "background-color: limegreen; color: white; font-size: 12px;",
    alert: "background-color: orange; color: black; font-size: 12px;",
    warn: "background-color: red; color: white; font-size: 12px;",
    current: "background-color: silver; color: black; font-size: 12px;",
    new: "background-color: gold; color: black; font-size: 12px;",
};

const clOk = (something) => console.log(`%c${something}`, status.ok);
const clAlert = (something) => console.log(`%c${something}`, status.alert);
const clWarn = (something) => console.log(`%c${something}`, status.warn);
const clCurrent = (something) => console.log(`%c${something}`, status.current);
const clNew = (something) => console.log(`%c${something}`, status.new);

const cd = (something) => console.dir(something);
const ce = (something) => console.error(something);
const cw = (something) => console.warn(something);

const id = (id) => document.getElementById(id);

const getJson = (object) => JSON.stringify(object);
const getObject = (json) => JSON.stringify(json);

const responseError = (error) => {
    cw(error);
    return new Response(
        JSON.stringify({
            code: 400,
            message: "There has been a problem with fetch operation",
            console: `${error}`
        })
    );
}

export {
    cl,
    clOk,
    clAlert,
    clWarn,
    clCurrent,
    clNew,
    cd,
    ce,
    cw,
    id,
    getJson,
    getObject,
    responseError
};