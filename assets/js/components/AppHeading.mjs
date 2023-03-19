class AppHeading extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }

  static get observedAttributes() {
    return ["title"];
  }

  get title() {
    if (this.hasAttribute("title")) {
      return this.title;
    }
  }

  set title(value) {
    if (value) {
      this.setAttribute("title", value);
    } else {
      this.removeAttribute("title");
    }
  }

  connectedCallback() {
    // const shadowRoot = this.attachShadow({ mode: "open" });
    // shadowRoot.appendChild(headTemplate.content);
    this.innerHTML = `
    <header>
        <h1 style="text-align: center; color: blue;">${this.getAttribute("title")}</h1>
    </header>`;
  }

  disconnectedCallback() {
    // Called every time the element is removed from the DOM. Useful for running clean up code.
    // e.g. the user calls el.remove()
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    // Note: only attributes listed in the observedAttributes property will receive this callback.
    // Reaction callbacks are synchronous.
    // If someone calls el.setAttribute() on this element, the browser will immediately call this function.
  }

  adoptedCallback() {
    // The custom element has been moved into a new document (e.g. someone called document.adoptNode(el)).
  }
}

export { AppHeading };
