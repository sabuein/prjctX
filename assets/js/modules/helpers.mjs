// Console
const cl = (output) => console.log(output);

const id = (id) => document.getElementById(id);

const setCustomComponent = (className, elementName) => {
    if (!window.customElements.get(elementName)) {
        window.customElements.define(elementName, className);
    }
};

const prettyJson = (object) => JSON.stringify(object, null, "\t");

const handlebars = (source, data) => {
    try {
        const template = Handlebars.compile(source.innerHTML);
        source.innerHTML = template(data);
    } catch (reason) {
        cl(`Handlebars.js didn't load: ${reason}`);
    }
}

export { cl, id, setCustomComponent, prettyJson as pJson, handlebars };