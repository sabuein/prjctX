import { cl } from "./helpers.mjs";

const renderMembers = (json, table) => {
    try {
        let index = 0;
        const members = JSON.parse(json);
        for (const member of members) {
            const row = document.createElement("tr");
            row.appendChild(document.createElement("th")).textContent = ++index;
            row.appendChild(document.createElement("td")).textContent = member.name;
            row.appendChild(document.createElement("td")).innerHTML = `<a href="mailto:${member.email}">${member.email}</a>`;
            row.appendChild(document.createElement("td")).innerHTML = `<a href="tel:${member.phone}">${member.phone}</a>`;
            row.firstElementChild.setAttribute("scope", "row");
            table.appendChild(row);            
        }
        const row = document.createElement("tr");
        const final = document.createElement("td");
        final.setAttribute("colspan", 4);
        final.setAttribute("scope", "row");
        final.textContent = `Our community is made up of ${table.childElementCount} members — and counting...`;
        row.appendChild(final);
        table.appendChild(row);

    } catch (error) { table.innerHTML = `<pre>${error}</pre>`; }
}

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
        console.warn(`Handlebars.js didn't load: ${reason}`);
    }
}

export { renderMembers, setCustomComponent, prettyJson as pJson, handlebars };