import { cl, id, setCustomComponent} from "./modules/helpers.mjs";
import { loadMembers, renderMembers } from "./modules/fetching.mjs";
import { AppHeading } from "./components/AppHeading.mjs";

setCustomComponent(AppHeading, "app-heading");

document.addEventListener("DOMContentLoaded", async () => {

    const request = new Request("http://localhost:8888/collectors/all"), output = id("membersBody");

    if (window.fetch) {
        try {
            // members = await loadMembers(url);
            const members = await loadMembers(request, output);
            renderMembers(members, output);
        } catch (error) {
            console.error(error);
        }
    } else {
        cl("do something with XMLHttpRequest");
    }    
});