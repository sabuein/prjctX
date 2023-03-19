const cl = (output) => console.log(output);

const id = (id) => document.getElementById(id);

const setCustomComponent = (className, elementName) => {
    if (!window.customElements.get(elementName)) {
        window.customElements.define(elementName, className);
    }
}

export { cl, id, setCustomComponent };