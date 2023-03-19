// Console
const cl = (output) => console.log(output);
const ce = (error) => console.error(error);
const cw = (error) => console.warn(error);

const id = (id) => document.getElementById(id);

const setCustomComponent = (className, elementName) => {
    if (!window.customElements.get(elementName)) {
        window.customElements.define(elementName, className);
    }
}

export { cl, ce, cw, id, setCustomComponent };