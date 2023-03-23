import { cl, pJson } from "./helpers.mjs";

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
    cl(pJson(result));
    return pJson(result);
}

export { userAgentData };