import { cd } from "./helpers.mjs";
import { pJson } from "./view.mjs";

const userAgentData = async () => {
    const keys = [
        "architecture",
        "bitness",
        "model",
        "platform",
        "platformVersion",
        "uaFullVersion",
        "fullVersionList"
    ];
    const result = await navigator.userAgentData.getHighEntropyValues(keys);
    cd(pJson(result));
    return pJson(result);
}

export { userAgentData };