// Console
const cl = (something) => console.log(something);
const cd = (something) => console.dir(something);
const ce = (something) => console.error(something);
const cw = (something) => console.warn(something);

const id = (id) => document.getElementById(id);

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

export { cl, cd, ce, cw, id, responseError };