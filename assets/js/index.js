"use strict";

import { cl, ce, cw, id, setCustomComponent as component} from "./modules/helpers.mjs";
import { loadMembers, renderMembers } from "./modules/members.mjs";
import { AppHeader, AppNav, AppFooter } from "./components/static.mjs";

component(AppHeader, "app-header");
component(AppNav, "app-nav");
component(AppFooter, "app-footer");

document.addEventListener("DOMContentLoaded", async () => {

    const request = new Request("http://localhost:8888/collectors/all"), output = id("membersBody");

    if (window.fetch) {
        try {
            // members = await loadMembers(url);
            const members = await loadMembers(request, output);
            renderMembers(members, output);
        } catch (error) {
            cl(error) || ce(error) || cw(error);
        }
    } else {
        cl("do something with XMLHttpRequest");
    }    
});