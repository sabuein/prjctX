class AppHeader extends HTMLElement {
    constructor() {
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

class AppNav extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <nav class="flexy">
            <div class="flexy-row">
                <div>
                    <a href="/">prjctX</a>
                </div>
                <ul class="flexy-row-between">
                    <li><a href="index.html">Homepage</a></li>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="members.html">Members list</a></li>
                    <li><a href="upload.html">Upload</a></li>
                    <li><a href="forums.html">Forums</a></li>
                </ul>
                <ul class="flexy-row-between">
                    <li><a href="subscribe.html"><span>x</span> Subscribe</a></li>
                    <li><a href="signup.html"><span>x</span> Sign Up</a></li>
                    <li><a href="login.html"><span>x</span> Login</a></li>
                </ul>
            </div>
        </nav>`;
    }
}

class AppFooter extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <footer class="flexy">
            <pre>Copyright © 2023 prjctX. All rights reserved.</pre>
        </footer>`;
    }
}

class MembershipDashboard extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <p>Copyright © 2023 prjctX. All rights reserved.</p>
        </footer>`;
    }
}

export { AppHeader, AppNav, AppFooter };
