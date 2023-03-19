const setCustomComponent = (className, elementName) => {
    if (!window.customElements.get(elementName)) {
        window.customElements.define(elementName, className);
    }
}

export { setCustomComponent };