// Console
const cl = (output) => console.log(output);
const cd = (object) => console.dir(object);
const cw = (error) => console.warn(error);

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

export { cl, cd, cw, id, responseError };