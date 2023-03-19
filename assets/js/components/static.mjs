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
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="index.html" class="navbar-brand">prjctX</a>
                </div>
                <ul class="nav navbar-nav">
                    <li class="active"><a href="index.html">Homepage</a></li>
                    <li><a href="members.html">Members</a></li>
                    <li><a href="upload.html">Upload</a></li>
                    <li><a href="forums.html">Forums</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="subscribe.html"><span class="glyphicon glyphicon-subscribe"></span> Subscribe</a></li>
                    <li><a href="signup.html"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                    <li><a href="login.html"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
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
        <footer>
            <p>Copyright © 2023 prjctX. All rights reserved.</p>
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
