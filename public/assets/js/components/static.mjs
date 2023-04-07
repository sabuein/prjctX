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
        <nav class="flexy row nav-container">
            <div class="flexy row nav-item">
                <figure>
                    <a href="/" class="flexy row">
                        <img src="/favicon-32x32.png" />
                        <figcaption>prjctX</figcaption>
                    </a>
                </figure>    
            </div>
            <ul class="flexy row wrap nav-item">
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="members.html">Members</a></li>
                <li><a href="plans.html">Plans</a></li>
                <li><a href="upload.html">Upload</a></li>
                <li><a href="forums.html">Forums</a></li>
            </ul>
            <ul class="flexy row wrap nav-item">
                <li><a href="subscribe.html"><span>x</span> Subscribe</a></li>
                <li><a href="signup.html"><span>x</span> Sign Up</a></li>
                <li><a href="login.html"><span>x</span> Login</a></li>
            </ul>
        </nav>`;
    }
}

class AppFooter extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `<pre>Copyright © 2023 prjctX. All rights reserved.</pre>
        <a id="scrollTop" href="#main" class="navigation" title="Scroll Back To Top">&#8673;</a>`;
    }
}

class MembershipDashboard extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `<pre>Copyright © 2023 prjctX. All rights reserved.</pre>`;
    }
}

export { AppHeader, AppNav, AppFooter };
